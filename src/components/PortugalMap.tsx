import React, { useMemo, useState, useCallback } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import { District } from '../types/districts';

interface PortugalMapProps {
  districts: District[];
  selectedDistrict: District | null;
  onDistrictSelect: (district: District) => void;
  className?: string;
  userLocation?: { latitude: number; longitude: number } | null;
}

// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const PortugalMap: React.FC<PortugalMapProps> = ({
  districts,
  selectedDistrict,
  onDistrictSelect,
  className,
  userLocation,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);
  
  // Center of Portugal
  const [center, setCenter] = useState<[number, number]>([39.5, -8.0]);
  const [zoom, setZoom] = useState(7);

  // Handle centering on user location
  const handleCenterOnUserLocation = useCallback(() => {
    if (userLocation) {
      setCenter([userLocation.latitude, userLocation.longitude]);
      setZoom(11);
    }
  }, [userLocation]);

  // Handle marker click
  const handleMarkerClick = useCallback((district: District) => {
    console.log('Selecting district:', district.name);
    onDistrictSelect(district);
    // Center map on selected district
    setCenter([district.latitude, district.longitude]);
    setZoom(9);
  }, [onDistrictSelect]);

  // Handle map click - find nearest district
  const handleMapClick = useCallback(({ latLng }: { latLng: [number, number] }) => {
    const [clickLat, clickLon] = latLng;
    
    // Find the nearest district within a reasonable distance (50km)
    let nearestDistrict: District | null = null;
    let minDistance = Infinity;
    
    districts.forEach((district) => {
      const distance = calculateDistance(clickLat, clickLon, district.latitude, district.longitude);
      if (distance < minDistance && distance < 50) {
        minDistance = distance;
        nearestDistrict = district;
      }
    });
    
    if (nearestDistrict) {
      console.log('Map clicked, nearest district:', nearestDistrict.name, 'distance:', minDistance.toFixed(2), 'km');
      handleMarkerClick(nearestDistrict);
    }
  }, [districts, handleMarkerClick]);

  // Create markers for all districts
  const districtMarkers = useMemo(() => {
    return districts.map((district) => {
      const isSelected = selectedDistrict?.id === district.id;
      const isHovered = hoveredDistrict?.id === district.id;
      
      return (
        <React.Fragment key={district.id}>
          <Marker
            width={isSelected ? 45 : 35}
            anchor={[district.latitude, district.longitude]}
            onClick={({ event, anchor, payload }: any) => {
              event?.stopPropagation?.();
              console.log('Marker clicked:', district.name);
              handleMarkerClick(district);
            }}
            style={{
              cursor: 'pointer',
              filter: isSelected 
                ? 'drop-shadow(0 0 12px #2196f3)' 
                : isHovered 
                  ? 'drop-shadow(0 0 8px #ff9800)' 
                  : 'none',
              transition: 'all 0.2s ease',
              zIndex: isSelected ? 1000 : isHovered ? 500 : 100,
              pointerEvents: 'auto',
            }}
            onMouseOver={() => setHoveredDistrict(district)}
            onMouseOut={() => setHoveredDistrict(null)}
          />
          <Overlay anchor={[district.latitude, district.longitude]}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                console.log('Overlay clicked:', district.name);
                handleMarkerClick(district);
              }}
              onMouseOver={() => setHoveredDistrict(district)}
              onMouseOut={() => setHoveredDistrict(null)}
              style={{
                backgroundColor: isSelected ? '#2196f3' : isHovered ? '#ff9800' : 'transparent',
                color: (isHovered || isSelected) ? 'white' : 'transparent',
                padding: (isHovered || isSelected) ? '6px 12px' : '0',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                boxShadow: (isHovered || isSelected) ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                transform: 'translate(-50%, -100%)',
                marginTop: '-8px',
                cursor: 'pointer',
                pointerEvents: 'auto',
                minWidth: '80px',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {(isHovered || isSelected) && district.name}
            </div>
          </Overlay>
        </React.Fragment>
      );
    });
  }, [districts, selectedDistrict, hoveredDistrict, handleMarkerClick]);

  return (
    <div 
      className={className} 
      style={{ 
        height: '100%', 
        width: '100%', 
        borderRadius: '8px', 
        overflow: 'hidden', 
        position: 'relative',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Map
        height={500}
        minZoom={6}
        maxZoom={12}
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center as [number, number]);
          setZoom(zoom);
        }}
        provider={(x, y, z) => {
          const s = String.fromCharCode(97 + ((x + y + z) % 3));
          return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
        }}
        metaWheelZoom={true}
        twoFingerDrag={true}
        mouseEvents={true}
        touchEvents={true}
        onClick={handleMapClick}
      >
        {districtMarkers}
        {userLocation && (
          <Marker
            width={40}
            anchor={[userLocation.latitude, userLocation.longitude]}
            style={{
              cursor: 'pointer',
              filter: 'drop-shadow(0 0 8px #4caf50)',
              zIndex: 2000,
            }}
          />
        )}
        {userLocation && (
          <Overlay anchor={[userLocation.latitude, userLocation.longitude]}>
            <div
              style={{
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                transform: 'translate(-50%, -100%)',
                marginTop: '-8px',
                pointerEvents: 'none',
              }}
            >
              Your Location
            </div>
          </Overlay>
        )}
      </Map>
      {userLocation && (
        <button
          onClick={handleCenterOnUserLocation}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '10px 12px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            zIndex: 1000,
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#45a049';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#4caf50';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Center on my location"
        >
          📍
        </button>
      )}
    </div>
  );
};
