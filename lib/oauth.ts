// OAuth Configuration
// Replace these with your actual OAuth credentials from Google

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

// Base URLs - adjust these to match your backend OAuth endpoints
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const GOOGLE_REDIRECT_URI = `${BASE_URL}/api/auth/google/callback`;

interface OAuthPopupOptions {
  provider: 'google';
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function openOAuthPopup({ provider, onSuccess, onError }: OAuthPopupOptions) {
  let authUrl = '';
  let popupWidth = 500;
  let popupHeight = 600;

  if (provider === 'google') {
    // Google OAuth URL
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });
    authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  // Calculate popup position (center of screen)
  const left = (window.screen.width - popupWidth) / 2;
  const top = (window.screen.height - popupHeight) / 2;

  // Open popup window
  const popup = window.open(
    authUrl,
    `${provider}Login`,
    `width=${popupWidth},height=${popupHeight},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,directories=no,status=no`
  );

  if (!popup) {
    onError?.('Popup blocked. Please allow popups for this site.');
    return;
  }

  let isResolved = false;

  // Listen for messages from the popup
  const messageListener = (event: MessageEvent) => {
    // Security: Verify origin
    if (event.origin !== window.location.origin) {
      return;
    }

    if (isResolved) return; // Prevent multiple calls

    if (event.data.type === 'OAUTH_SUCCESS') {
      isResolved = true;
      clearTimeout(timeout);
      window.removeEventListener('message', messageListener);
      try {
        popup.close();
      } catch (e) {
        // Ignore errors closing popup (may fail due to COOP)
      }
      onSuccess?.(event.data.data);
    } else if (event.data.type === 'OAUTH_ERROR') {
      isResolved = true;
      clearTimeout(timeout);
      window.removeEventListener('message', messageListener);
      try {
        popup.close();
      } catch (e) {
        // Ignore errors closing popup (may fail due to COOP)
      }
      onError?.(event.data.error || 'Authentication failed');
    }
  };

  window.addEventListener('message', messageListener);

  // Timeout to handle cases where popup is closed without completing auth
  // Note: We can't check popup.closed due to Cross-Origin-Opener-Policy
  // So we use a timeout as a fallback (user should complete auth within 10 minutes)
  const timeout = setTimeout(() => {
    if (!isResolved) {
      isResolved = true;
      window.removeEventListener('message', messageListener);
      onError?.('Authentication timed out. Please try again.');
    }
  }, 10 * 60 * 1000); // 10 minutes timeout

  return popup;
}

// Alternative: Direct OAuth URLs (if using server-side redirect)
export function getGoogleAuthUrl() {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}


