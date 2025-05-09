import { useState, useEffect, useMemo, createContext, useContext, type ReactNode } from "react"

type Props = {
    children: ReactNode
}

type AuthContextType = {
    user: string | null;
    token: string | null;
    isAuthenticated: boolean;
    signIn: (userData: string, token: string) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string | null>(() => 
        localStorage.getItem("token")
    );

    const [user, setUser] = useState<string | null>(() => {
        const saved = localStorage.getItem("user");
        return saved;
    });

    useEffect(() => {
        localStorage.setItem("token", token ?? "");
        if(user) {
            localStorage.setItem("user", user);
        } else {
            localStorage.removeItem("user");
        }
    }, [token, user]);

    const signIn = (userData: string, token: string) => {
        setUser(userData);
        setToken(token);
    }

    const signOut = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    const value = useMemo(() => ({
        user,
        token,
        isAuthenticated: !!token,
        signIn,
        signOut
    }), [token, user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};