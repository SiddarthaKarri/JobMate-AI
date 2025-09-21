import { create } from "zustand";

interface AuthUser {
  id: string;
  username: string;
  email?: string;
}

interface AuthStore {
  isLoading: boolean;
  error: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  captchaVerified: boolean;
  
  // Auth methods
  signIn: (username: string) => Promise<void>;
  signOut: () => void;
  setCaptchaVerified: (verified: boolean) => void;
  clearError: () => void;
}

// Simple localStorage-based auth store to replace Puter
export const useAuthStore = create<AuthStore>((set, get) => ({
  isLoading: false,
  error: null,
  user: null,
  isAuthenticated: false,
  captchaVerified: false,

  signIn: async (username: string) => {
    if (!get().captchaVerified) {
      set({ error: "Please complete the captcha first" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: AuthUser = {
        id: Date.now().toString(),
        username,
        email: `${username}@example.com`,
      };

      // Store user in localStorage
      localStorage.setItem("auth_user", JSON.stringify(user));
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Authentication failed",
        isLoading: false,
      });
    }
  },

  signOut: () => {
    localStorage.removeItem("auth_user");
    set({
      user: null,
      isAuthenticated: false,
      captchaVerified: false,
      error: null,
    });
  },

  setCaptchaVerified: (verified: boolean) => {
    set({ captchaVerified: verified, error: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Initialize auth state from localStorage
if (typeof window !== "undefined") {
  const savedUser = localStorage.getItem("auth_user");
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      useAuthStore.setState({
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      localStorage.removeItem("auth_user");
    }
  }
}