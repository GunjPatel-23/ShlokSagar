import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, getAuthToken, setAuthToken as saveToken, clearAuthToken } from '../lib/api';

interface User {
    userId: string;
    email?: string;
    phone?: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    // Google OAuth (no Firebase needed!)
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for existing auth token
        const token = getAuthToken();
        if (token) {
            try {
                // Decode JWT token
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp && payload.exp > Math.floor(Date.now() / 1000)) {
                    setUser({
                        userId: payload.userId,
                        email: payload.email,
                        phone: payload.phone,
                        name: payload.name
                    });
                    setIsAuthenticated(true);
                } else {
                    clearAuthToken();
                }
            } catch {
                clearAuthToken();
            }
        }
    }, []);

    const login = (token: string, userData: User) => {
        saveToken(token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        clearAuthToken();
        setUser(null);
        setIsAuthenticated(false);
    };

    // ══════════════════════════════════════════════════════════════
    // GOOGLE OAUTH (Using backend Google OAuth - No Firebase!)
    // ══════════════════════════════════════════════════════════════

    const signInWithGoogle = async () => {
        // Use Google OAuth via backend
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
            `${import.meta.env.VITE_API_URL?.replace('/api/v1/public', '') || 'http://localhost:3000'}/auth/google`,
            'Google Sign In',
            `width=${width},height=${height},left=${left},top=${top}`
        );

        // Listen for message from popup
        return new Promise<void>((resolve, reject) => {
            const handleMessage = (event: MessageEvent) => {
                if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
                    window.removeEventListener('message', handleMessage);
                    login(event.data.token, event.data.user);
                    popup?.close();
                    resolve();
                } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
                    window.removeEventListener('message', handleMessage);
                    popup?.close();
                    reject(new Error(event.data.error || 'Google sign-in failed'));
                }
            };

            window.addEventListener('message', handleMessage);

            // Check if popup was closed
            const checkClosed = setInterval(() => {
                if (popup?.closed) {
                    clearInterval(checkClosed);
                    window.removeEventListener('message', handleMessage);
                    reject(new Error('Sign-in cancelled'));
                }
            }, 1000);
        });
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

