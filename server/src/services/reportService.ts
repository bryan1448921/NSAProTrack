import PDFDocument from 'pdfkit';
import * as XLSX from 'xlsx';
import nodemailer from 'nodemailer';
import * as cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { ReportConfig, ScheduleConfig } from '../types/reports';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

class ReportService {
  private scheduledJobs: Map<string, cron.ScheduledTask> = new Map();
  private reportsDir: string;

  constructor() {
    this.reportsDir = path.join(__dirname, '../../reports');
    if (!fs.existsSync(this.reportsDir)) {
      fs.mkdirSync(this.reportsDir, { recursive: true });
    }
  }

  async generatePDF(reportConfig: ReportConfig, data: any[]): Promise<string> {
    const doc = new PDFDocument();
    const filename = `${reportConfig.name}_${new Date().toISOString()}.pdf`;
    const filePath = path.join(this.reportsDir, filename);
    const stream = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
      doc.pipe(stream);

      // Add logo watermark
      const logoPath = path.join(__dirname, '../../client/src/assets/NSAProTrack-logo.svg');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, {
          fit: [300, 300],
          align: 'center',
          valign: 'center'
        });
      }

      // Add report title
      doc.fontSize(24).text(reportConfig.name, { align: 'center' });
      doc.moveDown();
      doc.fontSize(14).text(reportConfig.description || '', { align: 'center' });
      doc.moveDown();

      // Add data table
      const tableTop = 200;
      let currentTop = tableTop;

      // Add headers
      reportConfig.columns.forEach((column, i) => {
        doc.fontSize(12)
           .text(column, 50 + (i * 100), currentTop, { width: 100, align: 'left' });
      });

      currentTop += 20;

      // Add data rows
      data.forEach(row => {
        if (currentTop > 700) {
          doc.addPage();
          currentTop = 50;
        }

        reportConfig.columns.forEach((column, i) => {
          doc.fontSize(10)
             .text(String(row[column] || ''), 50 + (i * 100), currentTop, { width: 100, align: 'left' });
        });

        currentTop += 20;
      });

      doc.end();

      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    });
  }

  async generateExcel(reportConfig: ReportConfig, data: any[]): Promise<string> {
    const filename = `${reportConfig.name}_${new Date().toISOString()}.xlsx`;
    const filePath = path.join(this.reportsDir, filename);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data, {
      header: reportConfig.columns
    });

    XLSX.utils.book_append_sheet(wb, ws, 'Report Data');
    XLSX.writeFile(wb, filePath);

    return filePath;
  }

  async scheduleReport(reportConfig: ReportConfig): Promise<void> {
    if (!reportConfig.schedule?.enabled) return;

    const schedule = reportConfig.schedule;
    const cronExpression = this.getCronExpression(schedule);

    // Cancel existing job if any
    if (reportConfig.id && this.scheduledJobs.has(reportConfig.id)) {
      this.scheduledJobs.get(reportConfig.id)?.stop();
    }

    const job = cron.schedule(cronExpression, async () => {
      try {
        // Generate report data
        const data = await this.getReportData(reportConfig);

        // Generate both PDF and Excel
        const [pdfPath, excelPath] = await Promise.all([
          this.generatePDF(reportConfig, data),
          this.generateExcel(reportConfig, data)
        ]);

        // Send email with attachments
        await this.sendReportEmail(reportConfig, [pdfPath, excelPath]);

        // Clean up files
        fs.unlinkSync(pdfPath);
        fs.unlinkSync(excelPath);
      } catch (error) {
        console.error(`Error generating scheduled report ${reportConfig.name}:`, error);
      }
    });

    if (reportConfig.id) {
      this.scheduledJobs.set(reportConfig.id, job);
    }
  }

  private getCronExpression(schedule: ScheduleConfig): string {
    const [hours, minutes] = schedule.time.split(':');
    
    switch (schedule.frequency) {
      case 'daily':
        return `${minutes} ${hours} * * *`;
      case 'weekly':
        return `${minutes} ${hours} * * 1`; // Monday
      case 'monthly':
        return `${minutes} ${hours} 1 * *`; // 1st of month
      default:
        throw new Error(`Invalid schedule frequency: ${schedule.frequency}`);
    }
  }

  async getReportData(reportConfig: ReportConfig): Promise<any[]> {
    // TODO: Implement data fetching based on reportConfig.filters
    // This is a placeholder that should be replaced with actual data fetching logic
    return [];
  }

  private async sendReportEmail(reportConfig: ReportConfig, attachmentPaths: string[]): Promise<void> {
    const emailOptions = {
      from: process.env.SMTP_USER,
      to: reportConfig.schedule!.recipients.join(', '),
      subject: `NSA ProTrack Report: ${reportConfig.name}`,
      text: `Please find attached the scheduled report "${reportConfig.name}".\n\nDescription: ${reportConfig.description || 'N/A'}`,
      attachments: attachmentPaths.map(path => ({
        filename: path.split('/').pop(),
        path
      }))
    };

    await transporter.sendMail(emailOptions);
  }
}

export const reportService = new ReportService(); 