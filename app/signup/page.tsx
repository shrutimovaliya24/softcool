'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { openOAuthPopup } from '@/lib/oauth';

export default function SignupPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    // Check if user is stored in localStorage (auth state loaded)
    const storedUser = localStorage.getItem('user');
    if (storedUser && isAuthenticated && user) {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    // Validate email is Google email
    const emailLower = formData.email.toLowerCase().trim();
    const domain = emailLower.split('@')[1];
    
    if (!domain || (domain !== 'gmail.com' && domain !== 'googlemail.com')) {
      setError('Please enter a valid Google email address (gmail.com or googlemail.com)');
      return;
    }

    // Password is optional - only email verification is required

    setIsLoading(true);

    try {
      // Verify email is valid Google email
      const response = await fetch('/api/auth/verify-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsLoading(false);
        setError(data.error || 'Invalid email. Please enter a valid Google email address.');
        return;
      }

      // Email verified successfully - create account
      const userData = {
        email: formData.email,
        name: formData.name.trim(),
        provider: 'google' as const
      };
      
      // Mark that user has signed up
      localStorage.setItem('hasSignedUp', 'true');
      
      // Store in auth context
      login(userData);
      router.push('/');
    } catch (error) {
      setIsLoading(false);
      setError('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    openOAuthPopup({
      provider: 'google',
      onSuccess: (data) => {
        setIsLoading(false);
        
        // Validate email BEFORE allowing signup
        if (!data.email) {
          alert('Enter valid email. Email address is required.');
          return;
        }
        
        // Create user object from OAuth data
        const userData = {
          email: data.email,
          name: data.name || data.email.split('@')[0],
          provider: 'google' as const
        };
        
        // Mark that user has signed up
        localStorage.setItem('hasSignedUp', 'true');
        
        // Store in auth context
        login(userData);
        router.push('/');
      },
      onError: (error) => {
        setIsLoading(false);
        alert(error || 'Google signup failed. Please try again.');
      }
    });
  };

  // Show loading if checking auth state
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 font-sans">You are already logged in. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5298C1] mb-4 text-center font-sans">
            Sign Up
          </h1>

          {/* Member Prompt */}
          <p className="text-left text-[#0D031A] mb-6 font-sans">
            Already a member?{' '}
            <Link href="/login" className="text-[#5298C1] hover:text-[#FDF55A] font-semibold transition-colors">
              Log In
            </Link>
          </p>

          {/* Email/Password Signup Form */}
          <form onSubmit={handleEmailSignup} className="space-y-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#0D031A] mb-1 font-sans">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-0 py-2 border-0 border-b border-[#5298C1]/30 focus:ring-0 focus:border-[#5298C1] transition-all font-sans outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#0D031A] mb-1 font-sans">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full px-0 py-2 border-0 border-b border-[#5298C1]/30 focus:ring-0 focus:border-[#5298C1] transition-all font-sans outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#0D031A] mb-1 font-sans">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Enter your password (optional)"
                className="w-full px-0 py-2 border-0 border-b border-[#5298C1]/30 focus:ring-0 focus:border-[#5298C1] transition-all font-sans outline-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 font-sans">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FDF55A] text-[#0D031A] py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base transition-all font-sans hover:bg-[#5298C1] hover:text-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          {/* Google Signup Button */}
          <div>
            <button
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full bg-white border-2 border-[#5298C1] text-[#0D031A] py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base transition-all font-sans hover:bg-[#5298C1] hover:text-white hover:shadow-md flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="group-hover:text-white">Sign up with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
