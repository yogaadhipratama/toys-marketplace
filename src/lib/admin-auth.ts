import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Debug: Check if JWT_SECRET is loaded
console.log('🔑 JWT_SECRET loaded:', JWT_SECRET ? 'YES' : 'NO');
console.log('🔑 JWT_SECRET length:', JWT_SECRET?.length || 0);

export interface AuthResult {
  success: boolean;
  message?: string;
  status?: number;
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export async function verifyAdminToken(request: NextRequest): Promise<AuthResult> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        message: 'No token provided',
        status: 401
      };
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // Check if user has admin role (case-insensitive)
      if (!decoded.role || !['ADMIN', 'SUPER_ADMIN'].includes(decoded.role.toUpperCase())) {
        return {
          success: false,
          message: 'Insufficient permissions',
          status: 403
        };
      }

      // Return success with user info
      return {
        success: true,
        user: {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role
        }
      };

    } catch (jwtError) {
      return {
        success: false,
        message: 'Invalid token',
        status: 401
      };
    }

  } catch (error) {
    console.error('Token verification error:', error);
    return {
      success: false,
      message: 'Internal server error',
      status: 500
    };
  }
}

export function generateAdminToken(userId: string, email: string, role: string): string {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}
