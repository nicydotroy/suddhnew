// Simple auth utilities for admin login
// In production, use NextAuth.js or similar for secure authentication

const ADMIN_PASSWORD = 'admin123'; // Change this to a strong password in production

export interface AuthUser {
  isLoggedIn: boolean;
  role: 'admin' | 'user';
}

// Validate admin login
export function validateAdminLogin(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

// Get auth from localStorage (client-side only)
export function getAuthFromStorage(): AuthUser {
  if (typeof window === 'undefined') {
    return { isLoggedIn: false, role: 'user' };
  }
  
  const auth = localStorage.getItem('suddh_auth');
  if (auth) {
    try {
      return JSON.parse(auth);
    } catch {
      return { isLoggedIn: false, role: 'user' };
    }
  }
  return { isLoggedIn: false, role: 'user' };
}

// Set auth in localStorage (client-side only)
export function setAuthInStorage(auth: AuthUser): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('suddh_auth', JSON.stringify(auth));
  }
}

// Clear auth from localStorage (client-side only)
export function clearAuthFromStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('suddh_auth');
  }
}
