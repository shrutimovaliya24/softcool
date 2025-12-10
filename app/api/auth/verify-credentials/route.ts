import { NextRequest, NextResponse } from 'next/server';

/**
 * Verify Google email address
 * Validates that the email is a valid Google email format (gmail.com or googlemail.com)
 * Allows login for any valid Google email format
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email is Google email
    const emailLower = email.toLowerCase().trim();
    const domain = emailLower.split('@')[1];

    if (!domain || (domain !== 'gmail.com' && domain !== 'googlemail.com')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email. Only Google email addresses (gmail.com or googlemail.com) are allowed.' },
        { status: 400 }
      );
    }

    // Validate email format more strictly
    const emailRegex = /^[a-zA-Z0-9._-]+@(gmail|googlemail)\.com$/;
    if (!emailRegex.test(emailLower)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format. Please enter a valid Google email address.' },
        { status: 400 }
      );
    }

    // Email format is valid - allow login/signup
    return NextResponse.json(
      { 
        success: true,
        message: 'Email verified successfully'
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Email verification failed. Please try again.' },
      { status: 500 }
    );
  }
}


