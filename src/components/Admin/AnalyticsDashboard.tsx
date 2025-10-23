import React, { useState, useEffect } from 'react';
import ChartWidget from './ChartWidget';
import { adminService, AdminStats } from '../../services/adminService';

interface AnalyticsDashboardProps {
  stats: AdminStats | null;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ stats }) => {
  const [quotaHistory, setQuotaHistory] = useState<any[]>([]);
  const [topCategories, setTopCategories] = useState<any[]>([]);

  useEffect(() => {
    if (stats) {
      // Prepare data for charts
      prepareChartData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats]);

  const prepareChartData = () => {
    if (!stats) return;

    // Top Categories (Pie Chart)
    const categoryData = Object.entries(stats.articlesByCategory)
      .map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 categories

    setTopCategories(categoryData);

    // Quota History (Line Chart) - Simulated
    const quota = stats.quotaStatus;
    const historyData = [
      { name: '6h ago', value: Math.max(0, quota.used - 30) },
      { name: '5h ago', value: Math.max(0, quota.used - 25) },
      { name: '4h ago', value: Math.max(0, quota.used - 20) },
      { name: '3h ago', value: Math.max(0, quota.used - 15) },
      { name: '2h ago', value: Math.max(0, quota.used - 10) },
      { name: '1h ago', value: Math.max(0, quota.used - 5) },
      { name: 'Now', value: quota.used }
    ];

    setQuotaHistory(historyData);
  };

  const exportToCSV = () => {
    if (!stats) return;

    const csvContent = [
      ['Category', 'Article Count'],
      ...Object.entries(stats.articlesByCategory).map(([cat, count]) => [cat, count])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `watchman-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    adminService.addLog('Analytics data exported to CSV', 'success');
  };

  const exportToJSON = () => {
    if (!stats) return;

    const jsonData = {
      exportDate: new Date().toISOString(),
      totalArticles: stats.totalArticles,
      articlesByCategory: stats.articlesByCategory,
      quotaStatus: stats.quotaStatus,
      cacheStats: stats.cacheStats
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `watchman-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    adminService.addLog('Analytics data exported to JSON', 'success');
  };

  if (!stats) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px',
        color: '#666'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
        <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
          No Data Available
        </div>
        <div style={{ fontSize: '14px' }}>
          Fetch some news to see analytics
        </div>
      </div>
    );
  }

  // Calculate insights
  const totalArticles = stats.totalArticles;
  const categoryCount = Object.keys(stats.articlesByCategory).length;
  const avgArticlesPerCategory = categoryCount > 0 ? Math.round(totalArticles / categoryCount) : 0;
  const topCategory = Object.entries(stats.articlesByCategory).sort((a, b) => b[1] - a[1])[0];
  const quotaUsagePercent = adminService.getQuotaPercentage();

  return (
    <div>
      {/* Export Buttons */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600 }}>
            📈 Analytics & Insights
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
            Visual data analysis and export tools
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={exportToCSV}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📄 Export CSV
          </button>
          
          <button
            onClick={exportToJSON}
            style={{
              background: '#17a2b8',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📋 Export JSON
          </button>
        </div>
      </div>

      {/* Key Insights Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
        }}>
          <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>
            Top Category
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            {topCategory ? topCategory[0].charAt(0).toUpperCase() + topCategory[0].slice(1) : 'N/A'}
          </div>
          <div style={{ fontSize: '13px', opacity: 0.9 }}>
            {topCategory ? `${topCategory[1]} articles` : '0 articles'}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)'
        }}>
          <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>
            Avg Per Category
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            {avgArticlesPerCategory}
          </div>
          <div style={{ fontSize: '13px', opacity: 0.9 }}>
            articles average
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)'
        }}>
          <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>
            API Efficiency
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            {100 - quotaUsagePercent}%
          </div>
          <div style={{ fontSize: '13px', opacity: 0.9 }}>
            quota remaining
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(67, 233, 123, 0.3)'
        }}>
          <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>
            Data Sources
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            {categoryCount}
          </div>
          <div style={{ fontSize: '13px', opacity: 0.9 }}>
            active categories
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '24px',
        marginBottom: '30px'
      }}>
        {/* Articles by Category - Pie Chart */}
        <ChartWidget
          type="pie"
          data={topCategories}
          title="Articles Distribution"
          subtitle="Top categories by article count"
          height={350}
        />

        {/* Articles by Category - Bar Chart */}
        <ChartWidget
          type="bar"
          data={topCategories}
          title="Category Comparison"
          subtitle="Article count per category"
          height={350}
        />

        {/* API Quota Usage - Line Chart */}
        <ChartWidget
          type="line"
          data={quotaHistory}
          title="API Quota Trend"
          subtitle="Request usage over time"
          height={350}
          colors={['#f5576c']}
        />

        {/* Cache Performance */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            margin: '0 0 4px 0',
            fontSize: '18px',
            fontWeight: 600,
            color: '#2c3e50'
          }}>
            Cache Performance
          </h3>
          <p style={{
            margin: '0 0 20px 0',
            fontSize: '13px',
            color: '#95a5a6'
          }}>
            Cached categories status
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(stats.cacheStats).map(([category, info]) => (
              <div key={category} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    color: '#2c3e50'
                  }}>
                    {category}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {info.articles} articles • {info.age} old
                  </div>
                </div>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `conic-gradient(#667eea 0% ${(info.articles / 20) * 100}%, #e0e0e0 ${(info.articles / 20) * 100}% 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#667eea'
                  }}>
                    {Math.min(100, Math.round((info.articles / 20) * 100))}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Statistics Table */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          fontSize: '18px',
          fontWeight: 600,
          color: '#2c3e50'
        }}>
          📊 Detailed Statistics
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontSize: '13px',
                  fontWeight: 600
                }}>
                  Category
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderBottom: '2px solid #dee2e6',
                  fontSize: '13px',
                  fontWeight: 600
                }}>
                  Articles
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderBottom: '2px solid #dee2e6',
                  fontSize: '13px',
                  fontWeight: 600
                }}>
                  Percentage
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderBottom: '2px solid #dee2e6',
                  fontSize: '13px',
                  fontWeight: 600
                }}>
                  Cached
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.articlesByCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([category, count], index) => {
                  const percentage = ((count / totalArticles) * 100).toFixed(1);
                  const isCached = !!stats.cacheStats[category];
                  
                  return (
                    <tr key={category} style={{
                      borderBottom: '1px solid #e0e0e0',
                      background: index % 2 === 0 ? 'white' : '#fafafa'
                    }}>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px',
                        textTransform: 'capitalize',
                        fontWeight: 500
                      }}>
                        {category}
                      </td>
                      <td style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#667eea'
                      }}>
                        {count}
                      </td>
                      <td style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontSize: '14px'
                      }}>
                        <div style={{
                          width: '100%',
                          background: '#e0e0e0',
                          borderRadius: '10px',
                          height: '8px',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${percentage}%`,
                            background: 'linear-gradient(90deg, #667eea, #764ba2)',
                            height: '100%',
                            borderRadius: '10px'
                          }} />
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#666',
                          marginTop: '4px'
                        }}>
                          {percentage}%
                        </div>
                      </td>
                      <td style={{
                        padding: '12px',
                        textAlign: 'center'
                      }}>
                        <span style={{
                          background: isCached ? '#d4edda' : '#f8d7da',
                          color: isCached ? '#155724' : '#721c24',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 600
                        }}>
                          {isCached ? '✓ Yes' : '✗ No'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
