import React from 'react';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '8px',
        backgroundColor: '#ffebee',
        border: '1px solid #ef5350',
        color: '#c62828',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>⚠️</div>
      <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Error</div>
      <div style={{ marginBottom: '16px' }}>{error}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1em',
            fontWeight: 'bold',
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};

