export interface District {
  id: string;
  name: string;
  nameEn: string;
  latitude: number;
  longitude: number;
  region: string;
  area?: number;
}

export const PORTUGAL_DISTRICTS: District[] = [
  { id: 'AV', name: 'Aveiro', nameEn: 'Aveiro', latitude: 40.6405, longitude: -8.6538, region: 'Centro' },
  { id: 'BE', name: 'Beja', nameEn: 'Beja', latitude: 38.0151, longitude: -7.8631, region: 'Alentejo' },
  { id: 'BR', name: 'Braga', nameEn: 'Braga', latitude: 41.5518, longitude: -8.4229, region: 'Norte' },
  { id: 'BA', name: 'Bragança', nameEn: 'Bragança', latitude: 41.8071, longitude: -6.7589, region: 'Norte' },
  { id: 'CB', name: 'Castelo Branco', nameEn: 'Castelo Branco', latitude: 39.8222, longitude: -7.4908, region: 'Centro' },
  { id: 'CO', name: 'Coimbra', nameEn: 'Coimbra', latitude: 40.2033, longitude: -8.4103, region: 'Centro' },
  { id: 'EV', name: 'Évora', nameEn: 'Évora', latitude: 38.5665, longitude: -7.9070, region: 'Alentejo' },
  { id: 'FA', name: 'Faro', nameEn: 'Faro', latitude: 37.0194, longitude: -7.9322, region: 'Algarve' },
  { id: 'GU', name: 'Guarda', nameEn: 'Guarda', latitude: 40.5373, longitude: -7.2658, region: 'Centro' },
  { id: 'LE', name: 'Leiria', nameEn: 'Leiria', latitude: 39.7436, longitude: -8.8071, region: 'Centro' },
  { id: 'LI', name: 'Lisboa', nameEn: 'Lisbon', latitude: 38.7223, longitude: -9.1393, region: 'Lisboa' },
  { id: 'PT', name: 'Portalegre', nameEn: 'Portalegre', latitude: 39.2938, longitude: -7.4312, region: 'Alentejo' },
  { id: 'PO', name: 'Porto', nameEn: 'Porto', latitude: 41.1579, longitude: -8.6291, region: 'Norte' },
  { id: 'SA', name: 'Santarém', nameEn: 'Santarém', latitude: 39.2362, longitude: -8.6860, region: 'Centro' },
  { id: 'SE', name: 'Setúbal', nameEn: 'Setúbal', latitude: 38.5244, longitude: -8.8882, region: 'Lisboa' },
  { id: 'VI', name: 'Viana do Castelo', nameEn: 'Viana do Castelo', latitude: 41.6938, longitude: -8.8329, region: 'Norte' },
  { id: 'VR', name: 'Vila Real', nameEn: 'Vila Real', latitude: 41.3003, longitude: -7.7443, region: 'Norte' },
  { id: 'VC', name: 'Viseu', nameEn: 'Viseu', latitude: 40.6566, longitude: -7.9140, region: 'Centro' },
];

export interface Region {
  name: string;
  districts: string[];
}

export const REGIONS: Region[] = [
  { name: 'Norte', districts: ['BR', 'BA', 'PO', 'VI', 'VR'] },
  { name: 'Centro', districts: ['AV', 'CB', 'CO', 'GU', 'LE', 'SA', 'VC'] },
  { name: 'Lisboa', districts: ['LI', 'SE'] },
  { name: 'Alentejo', districts: ['BE', 'EV', 'PT'] },
  { name: 'Algarve', districts: ['FA'] },
];

