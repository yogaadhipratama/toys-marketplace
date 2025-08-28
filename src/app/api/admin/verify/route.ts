import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Token verification request received');
    
    // Verify admin token
    const authResult = await verifyAdminToken(request);
    console.log('🔐 Auth result:', authResult);
    
    if (!authResult.success) {
      console.log('❌ Token verification failed:', authResult.message);
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    console.log('✅ Token verified successfully for user:', authResult.user?.email);
    
    // Return success response
    return NextResponse.json({
      message: 'Token verified successfully',
      user: authResult.user
    });

  } catch (error) {
    console.error('❌ Token verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
