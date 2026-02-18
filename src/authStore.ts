import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
    login: (email: string, pass: string) => boolean;
    logout: () => void;
    signup: (name: string, email: string, pass: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            _hasHydrated: false,
            setHasHydrated: (state) => set({ _hasHydrated: state }),

            login: (email, pass) => {
                const registeredUsers = JSON.parse(localStorage.getItem('paintify_registered_users') || '[]');
                const found = registeredUsers.find((u: any) => u.email === email && u.password === pass);

                if (found) {
                    const authUser = { id: found.id, name: found.name, email: found.email };
                    set({ user: authUser, isAuthenticated: true });
                    return true;
                }
                return false;
            },

            logout: () => {
                localStorage.removeItem('auth-storage-v2');
                set({ user: null, isAuthenticated: false });
            },

            signup: (name, email, password) => {
                const registeredUsers = JSON.parse(localStorage.getItem('paintify_registered_users') || '[]');

                if (registeredUsers.find((u: any) => u.email === email)) {
                    return false;
                }

                const newUser = {
                    id: Math.random().toString(36).substr(2, 9),
                    name,
                    email,
                    password
                };

                registeredUsers.push(newUser);
                localStorage.setItem('paintify_registered_users', JSON.stringify(registeredUsers));

                const authUser = { id: newUser.id, name: newUser.name, email: newUser.email };
                set({ user: authUser, isAuthenticated: true });
                return true;
            },
        }),
        {
            name: 'auth-storage-v2',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
            onRehydrateStorage: () => () => {
                useAuthStore.getState().setHasHydrated(true);
            },
        }
    )
);
