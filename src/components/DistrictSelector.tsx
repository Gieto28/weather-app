import React, { useState, useMemo } from 'react';
import { District, REGIONS } from '../types/districts';
import { useDebounce } from '../hooks/useDebounce';

interface DistrictSelectorProps {
  districts: District[];
  selectedDistrict: District | null;
  onSelect: (district: District) => void;
  favorites?: District[];
  onToggleFavorite?: (district: District) => void;
  isFavorite?: (districtId: string) => boolean;
}

export const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  districts,
  selectedDistrict,
  onSelect,
  favorites = [],
  onToggleFavorite,
  isFavorite,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredDistricts = useMemo(() => {
    let filtered = districts;

    if (selectedRegion !== 'all') {
      const region = REGIONS.find(r => r.name === selectedRegion);
      if (region) {
        filtered = filtered.filter(d => region.districts.includes(d.id));
      }
    }

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        d =>
          d.name.toLowerCase().includes(searchLower) ||
          d.nameEn.toLowerCase().includes(searchLower) ||
          d.region.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [districts, selectedRegion, debouncedSearch]);

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search districts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1em',
          }}
        />
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1em',
            cursor: 'pointer',
          }}
        >
          <option value="all">All Regions</option>
          {REGIONS.map(region => (
            <option key={region.name} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '8px',
        }}
      >
        {filteredDistricts.map((district) => {
          const isSelected = selectedDistrict?.id === district.id;
          const isFav = isFavorite ? isFavorite(district.id) : false;

          return (
            <div
              key={district.id}
              onClick={() => onSelect(district)}
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: isSelected ? '2px solid #2196f3' : '1px solid #e0e0e0',
                backgroundColor: isSelected ? '#e3f2fd' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
              }}
            >
              {onToggleFavorite && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(district);
                  }}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2em',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                  title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFav ? '❤️' : '🤍'}
                </button>
              )}
              <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '1.1em' }}>
                {district.name}
              </div>
              <div style={{ fontSize: '0.9em', color: '#666' }}>{district.region}</div>
            </div>
          );
        })}
      </div>

      {filteredDistricts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No districts found matching your search
        </div>
      )}
    </div>
  );
};

