// src/app/api/auth/check-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { clientPromise } from '@/lib/mongodb';
import User from '@/models/User';
import { validateData, checkEmailSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection
    await clientPromise;
    
    const body = await request.json();
    
    // Validate request data
    const validation = validateData(checkEmailSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format',
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Check if user exists
    const existingUser = await User.findOne({ email }).select('email provider');
    
    if (existingUser) {
      // User exists
      if (existingUser.provider === 'google') {
        return NextResponse.json({
          success: true,
          userExists: true,
          provider: 'google',
          message: 'This email is associated with a Google account. Please sign in with Google.'
        });
      }
      
      return NextResponse.json({
        success: true,
        userExists: true,
        provider: 'credentials',
        message: 'User exists. Please enter your password to log in.'
      });
    }

    // User does not exist
    return NextResponse.json({
      success: true,
      userExists: false,
      message: 'New user. Please create a password to sign up.'
    });

  } catch (error) {
    console.error('Check email error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}