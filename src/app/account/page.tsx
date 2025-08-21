'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
// import { User, Package, Settings, LogOut, Eye, MapPin, Calendar, CreditCard } from 'lucide-react';
import { User, Package, Settings, LogOut, Eye, MapPin, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { formatIDR } from '@/lib/format';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    name: string;
    qty: number;
    price: number;
  }>;
  shippingAddress: string;
  paymentMethod: string;
}

const dummyOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 3500000,
    items: [
      { name: 'LEGO Technic Bugatti Chiron', qty: 1, price: 3500000 }
    ],
    shippingAddress: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220',
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 1200000,
    items: [
      { name: 'Gel Blaster Pistol Compact', qty: 1, price: 1200000 }
    ],
    shippingAddress: 'Jl. Thamrin No. 45, Jakarta Pusat, DKI Jakarta 10350',
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-25',
    status: 'processing',
    total: 850000,
    items: [
      { name: 'Action Figure Marvel Legends Iron Man', qty: 1, price: 850000 }
    ],
    shippingAddress: 'Jl. Gatot Subroto No. 67, Jakarta Selatan, DKI Jakarta 12930',
    paymentMethod: 'Cash on Delivery'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'success';
    case 'shipped':
      return 'default';
    case 'processing':
      return 'secondary';
    case 'pending':
      return 'outline';
    case 'cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'Delivered';
    case 'shipped':
      return 'Shipped';
    case 'processing':
      return 'Processing';
    case 'pending':
      return 'Pending';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+62-812-3456-7890',
    address: 'Jl. Sudirman No. 123',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    postalCode: '10220'
  });

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Manage your profile and view order history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-sm text-gray-500">{profileData.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Package className="h-4 w-4" />
                  Orders
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' ? (
              /* Profile Tab */
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <Input
                      value={profileData.address}
                      onChange={(e) => handleProfileUpdate('address', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <Input
                        value={profileData.city}
                        onChange={(e) => handleProfileUpdate('city', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                      <Select
                        value={profileData.province}
                        onChange={(e) => handleProfileUpdate('province', e.target.value)}
                      >
                        <option value="DKI Jakarta">DKI Jakarta</option>
                        <option value="West Java">West Java</option>
                        <option value="Central Java">Central Java</option>
                        <option value="DI Yogyakarta">DI Yogyakarta</option>
                        <option value="East Java">East Java</option>
                        <option value="Bali">Bali</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <Input
                        value={profileData.postalCode}
                        onChange={(e) => handleProfileUpdate('postalCode', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button type="submit">Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </form>
              </div>
            ) : (
              /* Orders Tab */
              <div className="space-y-6">
                <div className="bg-white rounded-lg border shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
                  
                  {dummyOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-600">Start shopping to see your order history here.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {dummyOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-medium text-gray-900">{order.orderNumber}</h3>
                              <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                            <Badge variant={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-gray-700">{item.name} (Qty: {item.qty})</span>
                                <span className="font-medium">{formatIDR(item.price * item.qty)}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border-t pt-3">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-600">Total:</span>
                              <span className="font-semibold text-lg">{formatIDR(order.total)}</span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{order.shippingAddress}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CreditCard className="h-3 w-3" />
                                <span>{order.paymentMethod}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            {order.status === 'shipped' && (
                              <Button variant="outline" size="sm">
                                Track Order
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
