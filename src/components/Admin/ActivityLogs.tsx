import React, { useState, useEffect, useRef } from 'react';
import { adminService } from '../../services/adminService';

interface ActivityLogsProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const ActivityLogs: React.FC<ActivityLogsProps> = ({ 
  autoRefresh = true,
  refreshInterval = 2000 
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [autoScroll, setAutoScroll] = useState(false); // Changed default to false
  const logsEndRef = useRef<HTMLDivElement>(null);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  const updateLogs = () => {
    const latestLogs = adminService.getLogs();
    setLogs(latestLogs);
    
    // Scroll within the logs container only, not the entire page
    if (autoScroll && logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    updateLogs();

    if (autoRefresh) {
      const interval = setInterval(updateLogs, refreshInterval);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh, refreshInterval]);

  const handleClearLogs = () => {
    adminService.clearLogs();
    updateLogs();
  };

  return (
    <div style={{
      background: '#1e1e1e',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid #333'
      }}>
        <h3 style={{ 
          color: '#00ff00', 
          margin: 0,
          fontSize: '16px',
          fontWeight: 600
        }}>
          📋 Activity Logs
        </h3>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label style={{ 
            color: '#999', 
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}>
            <input 
              type="checkbox" 
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Auto-scroll
          </label>
          
          <button
            onClick={handleClearLogs}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Clear Logs
          </button>
        </div>
      </div>

      <div 
        ref={logsContainerRef}
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          padding: '12px',
          background: '#000',
          borderRadius: '8px',
          border: '1px solid #333',
          scrollBehavior: 'smooth'
        }}>
        {logs.length === 0 ? (
          <div style={{ 
            color: '#666', 
            fontStyle: 'italic',
            textAlign: 'center',
            padding: '20px'
          }}>
            No activity yet... Perform an action to see logs.
          </div>
        ) : (
          logs.map((log, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: '6px',
                fontSize: '13px',
                lineHeight: '1.6',
                color: log.includes('❌') ? '#ff6b6b' :
                       log.includes('✅') ? '#51cf66' :
                       log.includes('⚠️') ? '#ffd43b' :
                       '#00ff00',
                fontFamily: 'inherit'
              }}
            >
              {log}
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>
      
      <div style={{
        marginTop: '12px',
        color: '#666',
        fontSize: '12px',
        textAlign: 'right'
      }}>
        {logs.length} log{logs.length !== 1 ? 's' : ''} • 
        {autoRefresh ? ' Auto-refreshing' : ' Paused'}
      </div>
    </div>
  );
};

export default ActivityLogs;
