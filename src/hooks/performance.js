import { useState, useEffect } from 'react';
import { 
  onCLS, 
  onFCP, 
  onINP, 
  onLCP, 
  onTTFB,
  CLSThresholds,
  FCPThresholds,
  INPThresholds,
  LCPThresholds,
  TTFBThresholds
} from 'web-vitals';

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    cls: null,
    fcp: null,
    inp: null,
    lcp: null,
    ttfb: null,
  });

  useEffect(() => {
    const reportMetrics = () => {
      onCLS((metric) => {
        setMetrics((prev) => ({ 
          ...prev, 
          cls: {
            value: metric.value,
            rating: metric.value <= CLSThresholds.GOOD ? 'good' : 
                    metric.value <= CLSThresholds.NEEDS_IMPROVEMENT ? 'needs-improvement' : 'poor'
          }
        }));
      });

      onFCP((metric) => {
        setMetrics((prev) => ({ 
          ...prev, 
          fcp: {
            value: metric.value,
            rating: metric.value <= FCPThresholds.GOOD ? 'good' : 
                    metric.value <= FCPThresholds.NEEDS_IMPROVEMENT ? 'needs-improvement' : 'poor'
          }
        }));
      });

      onINP((metric) => {
        setMetrics((prev) => ({ 
          ...prev, 
          inp: {
            value: metric.value,
            rating: metric.value <= INPThresholds.GOOD ? 'good' : 
                    metric.value <= INPThresholds.NEEDS_IMPROVEMENT ? 'needs-improvement' : 'poor'
          }
        }));
      });

      onLCP((metric) => {
        setMetrics((prev) => ({ 
          ...prev, 
          lcp: {
            value: metric.value,
            rating: metric.value <= LCPThresholds.GOOD ? 'good' : 
                    metric.value <= LCPThresholds.NEEDS_IMPROVEMENT ? 'needs-improvement' : 'poor'
          }
        }));
      });

      onTTFB((metric) => {
        setMetrics((prev) => ({ 
          ...prev, 
          ttfb: {
            value: metric.value,
            rating: metric.value <= TTFBThresholds.GOOD ? 'good' : 
                    metric.value <= TTFBThresholds.NEEDS_IMPROVEMENT ? 'needs-improvement' : 'poor'
          }
        }));
      });
    };

    reportMetrics();
  }, []);

  return metrics;
}

// Optional: Function to log performance metrics
export function logPerformanceMetrics(metrics) {
  if (typeof window !== 'undefined' && window.console) {
    console.group('Performance Metrics');
    
    Object.entries(metrics).forEach(([key, metric]) => {
      if (metric) {
        console.log(`${key.toUpperCase()}:`, {
          value: metric.value,
          rating: metric.rating
        });
      }
    });
    
    console.groupEnd();
  }
} 