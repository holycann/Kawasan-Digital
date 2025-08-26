import { supabaseAuth, supabaseHelpers } from '@/configs/supabase';

class AuthService {
    constructor() {
        this.supabase = supabaseAuth;
    }

    async signIn(email, password) {
        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) return supabaseHelpers.handleAuthError(error, { method: 'signIn' });
            return data;
        } catch (error) {
            return supabaseHelpers.handleAuthError(error, { method: 'signIn' });
        }
    }

    async signOut() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) return supabaseHelpers.handleAuthError(error, { method: 'signOut' });
        } catch (error) {
            return supabaseHelpers.handleAuthError(error, { method: 'signOut' });
        }
    }

    async getCurrentUser() {
        try {
            const { data: { user }, error } = await this.supabase.auth.getUser();

            if (error) {
                // Don't treat missing auth session as an error
                if (error.name === 'AuthSessionMissingError') {
                    return null;
                }
                return supabaseHelpers.handleAuthError(error, { method: 'getCurrentUser' });
            }
            return user;
        } catch (error) {
            // Don't treat missing auth session as an error
            if (error.name === 'AuthSessionMissingError') {
                return null;
            }
            return supabaseHelpers.handleAuthError(error, { method: 'getCurrentUser' });
        }
    }

    onAuthStateChange(callback) {
        return this.supabase.auth.onAuthStateChange((event, session) => {
            callback(event, session);
        });
    }
}

export const authService = new AuthService();
