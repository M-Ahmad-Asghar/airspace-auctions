// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { clientPromise } from '@/lib/mongodb';
import User from '@/models/User';
import { validateData, loginSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection
    await clientPromise;
    
    const body = await request.json();
    
    // Validate request data
    const validation = validateData(loginSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password format',
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password',
          errors: { general: 'Invalid credentials' }
        },
        { status: 401 }
      );
    }

    // Check if user signed up with Google
    if (user.provider === 'google') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'This account was created with Google. Please sign in with Google.',
          errors: { general: 'Use Google sign-in' }
        },
        { status: 400 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password',
          errors: { general: 'Invalid credentials' }
        },
        { status: 401 }
      );
    }

    // Successful login - return user data without password
    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
      provider: user.provider,
      isVerified: user.isVerified,
      image: user.image
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}