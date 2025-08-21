'use client';

import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

const dummyTrackingData: { [key: string]: TrackingEvent[] } = {
  'JNE123456789': [
    {
      id: '1',
      status: 'Order Placed',
      description: 'Your order has been placed and confirmed',
      location: 'Jakarta, Indonesia',
      timestamp: '2024-01-15 10:30 AM',
      completed: true
    },
    {
      id: '2',
      status: 'Processing',
      description: 'Your order is being prepared for shipment',
      location: 'Jakarta, Indonesia',
      timestamp: '2024-01-15 02:15 PM',
      completed: true
    },
    {
      id: '3',
      status: 'Shipped',
      description: 'Your order has been shipped',
      location: 'Jakarta, Indonesia',
      timestamp: '2024-01-16 09:45 AM',
      completed: true
    },
    {
      id: '4',
      status: 'In Transit',
      description: 'Your order is on its way to you',
      location: 'Bandung, Indonesia',
      timestamp: '2024-01-17 11:20 AM',
      completed: false
    },
    {
      id: '5',
      status: 'Out for Delivery',
      description: 'Your order is out for delivery',
      location: 'Bandung, Indonesia',
      timestamp: '2024-01-18 08:00 AM',
      completed: false
    },
    {
      id: '6',
      status: 'Delivered',
      description: 'Your order has been delivered',
      location: 'Bandung, Indonesia',
      timestamp: '2024-01-18 02:30 PM',
      completed: false
    }
  ],
  'JNT987654321': [
    {
      id: '1',
      status: 'Order Placed',
      description: 'Your order has been placed and confirmed',
      location: 'Jakarta, Indonesia',
      timestamp: '2024-01-14 09:15 AM',
      completed: true
    },
    {
      id: '2',
      status: 'Processing',
      description: 'Your order is being prepared for shipment',
      location: 'Jakarta, Indonesia',
      timestamp: '2024-01-14 03:30 PM',
      completed: true
    },
    {
      id: '3',
      status: 'Shipped',
      description: 'Your order has been shipped',
      location: 'Jakarta, Indonesia',
      timestamp: '2024-01-15 10:00 AM',
      completed: true
    },
    {
      id: '4',
      status: 'In Transit',
      description: 'Your order is on its way to you',
      location: 'Surabaya, Indonesia',
      timestamp: '2024-01-16 01:45 PM',
      completed: true
    },
    {
      id: '5',
      status: 'Out for Delivery',
      description: 'Your order is out for delivery',
      location: 'Surabaya, Indonesia',
      timestamp: '2024-01-17 07:30 AM',
      completed: false
    },
    {
      id: '6',
      status: 'Delivered',
      description: 'Your order has been delivered',
      location: 'Surabaya, Indonesia',
      timestamp: '2024-01-17 01:15 PM',
      completed: false
    }
  ]
};

export default function TrackPage() {
  const [awbNumber, setAwbNumber] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingEvent[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!awbNumber.trim()) {
      setError('Please enter an AWB number');
      return;
    }

    setIsSearching(true);
    setError('');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data = dummyTrackingData[awbNumber.trim()];
    if (data) {
      setTrackingData(data);
    } else {
      setError('AWB number not found. Please check and try again.');
      setTrackingData(null);
    }
    
    setIsSearching(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'shipped':
      case 'in transit':
      case 'out for delivery':
        return <Truck className="h-6 w-6 text-blue-600" />;
      case 'processing':
        return <Package className="h-6 w-6 text-yellow-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-lg text-gray-600">
            Enter your AWB (Airway Bill) number to track your package
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg border shadow-sm p-8 mb-8">
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter AWB number (e.g., JNE123456789)"
                value={awbNumber}
                onChange={(e) => setAwbNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                isLoading={isSearching}
              >
                <Search className="h-4 w-4 mr-2" />
                Track
              </Button>
            </div>
            
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              Try: JNE123456789 or JNT987654321 for demo tracking
            </p>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="bg-white rounded-lg border shadow-sm p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Tracking Results for {awbNumber}
              </h2>
              <p className="text-gray-600">
                Estimated delivery: {trackingData[trackingData.length - 1].timestamp}
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {trackingData.map((event, index) => (
                <div key={event.id} className="flex items-start gap-4 mb-6 last:mb-0">
                  {/* Timeline Line */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                      event.completed 
                        ? 'border-green-600 bg-green-100' 
                        : 'border-gray-300 bg-gray-100'
                    }`}>
                      {getStatusIcon(event.status)}
                    </div>
                    {index < trackingData.length - 1 && (
                      <div className={`absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 ${
                        event.completed ? 'bg-green-600' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className={`p-4 rounded-lg border ${
                      event.completed 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <h3 className={`font-semibold mb-1 ${
                        event.completed ? 'text-green-800' : 'text-gray-800'
                      }`}>
                        {event.status}
                      </h3>
                      <p className={`text-sm mb-2 ${
                        event.completed ? 'text-green-700' : 'text-gray-700'
                      }`}>
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`${
                          event.completed ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          📍 {event.location}
                        </span>
                        <span className={`${
                          event.completed ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          🕒 {event.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
              <p className="text-blue-700 text-sm">
                If you have any questions about your shipment or need assistance, 
                please contact our customer service at support@toysstore.com or call +62-21-1234-5678
              </p>
            </div>
          </div>
        )}

        {/* How to Track */}
        <div className="bg-white rounded-lg border shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Track Your Order</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Find Your AWB</h3>
              <p className="text-sm text-gray-600">
                Look for the AWB number in your order confirmation email or shipping notification
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Enter AWB Number</h3>
              <p className="text-sm text-gray-600">
                Enter the AWB number in the search box above and click Track
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">
                View real-time updates on your package location and delivery status
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
