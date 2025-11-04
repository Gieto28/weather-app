import React from 'react';
import { District } from '../types/districts';

interface FavoritesPanelProps {
  favorites: District[];
  onSelect: (district: District) => void;
  onRemove: (districtId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesPanel: React.FC<FavoritesPanelProps> = ({
  favorites,
  onSelect,
  onRemove,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '300px',
        height: '100vh',
        backgroundColor: '#ffffff',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
        padding: '24px',
        overflowY: 'auto',
        transform: 'translateX(0)',
        transition: 'transform 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.3em', color: '#333' }}>Favorites</h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5em',
            cursor: 'pointer',
            padding: '4px 8px',
            color: '#666',
          }}
        >
          ×
        </button>
      </div>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          No favorites yet. Click the ❤️ icon on districts to add them.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {favorites.map((district) => (
            <div
              key={district.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f9f9f9';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div onClick={() => onSelect(district)} style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{district.name}</div>
                  <div style={{ fontSize: '0.9em', color: '#666' }}>{district.region}</div>
                </div>
                <button
                  onClick={() => onRemove(district.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2em',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                  title="Remove from favorites"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

