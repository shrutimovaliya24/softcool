import { NextRequest, NextResponse } from 'next/server';
import { addVerifiedEmail } from '@/lib/verified-emails';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const GOOGLE_REDIRECT_URI = `${BASE_URL}/api/auth/google/callback`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    // Send error message to parent window
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authentication Error</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'OAUTH_ERROR',
                error: '${error.replace(/'/g, "\\'")}'
              }, window.location.origin);
              window.close();
            }
          </script>
        </body>
      </html>
      `,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  if (code) {
    try {
      // Exchange authorization code for access token
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Get user info from Google
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userInfo = await userInfoResponse.json();

      // Add email to verified emails list (proves the account exists)
      if (userInfo.email) {
        try {
          await addVerifiedEmail(userInfo.email);
        } catch (error) {
          // Non-critical error - continue with login even if verification storage fails
          console.error('Error storing verified email:', error);
        }
      }

      // Send user info to parent window
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Authentication Success</title>
          </head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'OAUTH_SUCCESS',
                  data: {
                    provider: 'google',
                    email: '${userInfo.email?.replace(/'/g, "\\'") || ''}',
                    name: '${(userInfo.name || userInfo.email?.split('@')[0] || '').replace(/'/g, "\\'")}',
                    picture: '${userInfo.picture?.replace(/'/g, "\\'") || ''}'
                  }
                }, window.location.origin);
                window.close();
              }
            </script>
          </body>
        </html>
        `,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    } catch (error: any) {
      // Send error message to parent window
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Authentication Error</title>
          </head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'OAUTH_ERROR',
                  error: '${(error.message || 'Authentication failed').replace(/'/g, "\\'")}'
                }, window.location.origin);
                window.close();
              }
            </script>
          </body>
        </html>
        `,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }
  }

  // If no code or error, send error message to parent window
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Authentication Error</title>
      </head>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage({
              type: 'OAUTH_ERROR',
              error: 'Invalid request. Please try again.'
            }, window.location.origin);
            window.close();
          }
        </script>
      </body>
    </html>
    `,
    {
      headers: { 'Content-Type': 'text/html' },
    }
  );
}

