// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { clientPromise } from '@/lib/mongodb';
import User from '@/models/User';
import { validateData, signupSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection
    await clientPromise;
    
    const body = await request.json();
    
    // Validate request data
    const validation = validateData(signupSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    const { email, password, name } = validation.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'An account with this email already exists. Please sign in instead.',
          errors: { email: 'Email already registered' }
        },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = new User({
      email,
      password,
      name: name || email.split('@')[0], // Use part of email as default name
      provider: 'credentials',
      isVerified: false
    });

    const savedUser = await newUser.save();

    // Remove password from response
    const userResponse = {
      id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
      provider: savedUser.provider,
      isVerified: savedUser.isVerified,
      createdAt: savedUser.createdAt
    };

    return NextResponse.json({
      success: true,
      message: 'Account created successfully! You can now sign in.',
      user: userResponse
    }, { status: 201 });

  } catch (error: any) {
    console.error('Signup error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors 
        },
        { status: 400 }
      );
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'An account with this email already exists.',
          errors: { email: 'Email already registered' }
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}