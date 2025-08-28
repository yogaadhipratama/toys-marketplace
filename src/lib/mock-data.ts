import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

// Mock data structure
export interface MockData {
  products: any[];
  users: any[];
  orders: any[];
}

// Default mock data
const defaultMockData: MockData = {
  products: [
    {
      id: '1',
      slug: 'airsoft-rifle-pro',
      name: 'Airsoft Rifle Pro',
      description: 'High-quality airsoft rifle for competitive play',
      category: 'airsoft',
      ageRating: '18+',
      weight: 2.5,
      price: 1500000,
      originalPrice: 1800000,
      images: ['/images/airsoft-1.jpg'],
      variants: [
        { id: '1-1', name: 'Black', sku: 'ASR-BLK-001', price: 1500000, stock: 10 },
        { id: '1-2', name: 'Tan', sku: 'ASR-TAN-001', price: 1500000, stock: 5 }
      ],
      features: ['Adjustable hop-up', 'Metal gearbox', 'High-capacity magazine'],
      isNew: true,
      status: 'active',
      createdAt: '2024-01-15T00:00:00.000Z'
    },
    {
      id: '2',
      slug: 'rc-car-racing',
      name: 'RC Racing Car',
      description: 'Fast remote control racing car for outdoor fun',
      category: 'rc',
      ageRating: '8+',
      weight: 0.8,
      price: 800000,
      originalPrice: 1000000,
      images: ['/images/rc-1.jpg'],
      variants: [
        { id: '2-1', name: 'Red', sku: 'RCC-RED-001', price: 800000, stock: 15 },
        { id: '2-2', name: 'Blue', sku: 'RCC-BLU-001', price: 800000, stock: 12 }
      ],
      features: ['2.4GHz control', 'Rechargeable battery', 'LED lights'],
      isNew: false,
      status: 'active',
      createdAt: '2024-01-10T00:00:00.000Z'
    }
  ],
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'customer',
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'customer',
      createdAt: '2024-01-05T00:00:00.000Z'
    }
  ],
  orders: [
    {
      id: 'ORD-001',
      customer: { name: 'John Doe', email: 'john@example.com' },
      items: [
        { name: 'Airsoft Rifle Pro', price: 1500000, qty: 1 }
      ],
      total: 1500000,
      status: 'completed',
      date: '2024-01-20T00:00:00.000Z'
    },
    {
      id: 'ORD-002',
      customer: { name: 'Jane Smith', email: 'jane@example.com' },
      items: [
        { name: 'RC Racing Car', price: 800000, qty: 1 }
      ],
      total: 800000,
      status: 'pending',
      date: '2024-01-22T00:00:00.000Z'
    }
  ]
};

// File path for mock data
const mockDataPath = join(process.cwd(), 'data', 'mock-data.json');

// Get mock data
export async function getMockData(): Promise<MockData> {
  try {
    const data = await readFile(mockDataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return default data
    return defaultMockData;
  }
}

// Save mock data
export async function saveMockData(data: Partial<MockData>): Promise<void> {
  try {
    const existingData = await getMockData();
    const updatedData = { ...existingData, ...data };
    
    // Ensure directory exists
    const dir = join(process.cwd(), 'data');
    await writeFile(mockDataPath, JSON.stringify(updatedData, null, 2));
  } catch (error) {
    console.error('Failed to save mock data:', error);
    throw error;
  }
}

// Initialize mock data if it doesn't exist
export async function initializeMockData(): Promise<void> {
  try {
    await saveMockData(defaultMockData);
  } catch (error) {
    console.error('Failed to initialize mock data:', error);
  }
}
