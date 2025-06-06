import express from 'express';
import { reportService } from '../services/reportService';
import { ReportConfig } from '../types/reports';
import fs from 'fs';

const router = express.Router();

// Save report template
router.post('/', async (req, res) => {
  try {
    const reportConfig: ReportConfig = req.body;
    
    // Save to database (implement your database logic here)
    // For now, we'll just handle scheduling
    await reportService.scheduleReport(reportConfig);
    
    res.status(201).json(reportConfig);
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Failed to save report' });
  }
});

// Generate report
router.post('/generate', async (req, res) => {
  try {
    const { reportConfig, format } = req.body;
    
    // Get report data
    const data = await reportService.getReportData(reportConfig);
    
    // Generate report in requested format
    let filePath: string;
    if (format === 'pdf') {
      filePath = await reportService.generatePDF(reportConfig, data);
    } else if (format === 'excel') {
      filePath = await reportService.generateExcel(reportConfig, data);
    } else {
      throw new Error(`Unsupported format: ${format}`);
    }
    
    // Send file
    res.download(filePath, () => {
      // Clean up file after sending
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

export default router; 