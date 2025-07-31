import chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Ensure performance-reports directory exists
const reportDir = join(process.cwd(), 'performance-reports');
if (!existsSync(reportDir)) {
  mkdirSync(reportDir);
}

async function runPerformanceTest(url) {
  try {
    // Launch Chrome
    const chrome = await chromeLauncher.launch({ 
      chromeFlags: ['--headless'] 
    });

    // Run Lighthouse
    const runnerResult = await lighthouse(url, {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance'],
      port: chrome.port
    });

    // Parse results
    const reportJson = JSON.parse(runnerResult.report);

    // Extract key metrics
    const metrics = {
      performance: reportJson.categories.performance.score * 100,
      firstContentfulPaint: reportJson.audits['first-contentful-paint'].numericValue,
      speedIndex: reportJson.audits['speed-index'].numericValue,
      largestContentfulPaint: reportJson.audits['largest-contentful-paint'].numericValue,
      interactiveTime: reportJson.audits.interactive.numericValue,
      totalBlockingTime: reportJson.audits['total-blocking-time'].numericValue,
      
      // Additional detailed metrics
      metrics: {
        ...reportJson.audits['performance-summary'].details.items[0]
      }
    };

    // Save reports
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    
    writeFileSync(
      join(reportDir, `lighthouse-report-${timestamp}.json`), 
      JSON.stringify(metrics, null, 2)
    );
    writeFileSync(
      join(reportDir, `lighthouse-report-${timestamp}.html`), 
      runnerResult.report
    );

    // Close Chrome
    await chrome.kill();

    console.log('Performance Metrics:', metrics);
    return metrics;
  } catch (error) {
    console.error('Performance test failed:', error);
    process.exit(1);
  }
}

// Run the test
runPerformanceTest('http://localhost:3000')
  .then(metrics => {
    console.log('Performance test completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Performance test failed:', error);
    process.exit(1);
  }); 