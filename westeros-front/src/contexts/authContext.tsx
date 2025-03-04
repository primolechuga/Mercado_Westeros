import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormData } from '../components/login';

interface User {
  email: string;
  name: string;
  id: string;
  role: string;
  houseId: number;
  balance: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  role: string | null;
  login: (userData: AuthFormData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  balance: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Nuevo estado para evitar redirección prematura
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }
    setLoading(false); // Solo cambiar loading cuando termina el proceso
  }, []);

  const login = async (userData: AuthFormData) => {
    if (!userData.email || !userData.password) {
      throw new Error("Email y contraseña son requeridos");
    }

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const token = response.headers.get('authorization') || '';
        localStorage.setItem('token', token);

        const responseBody = await response.json();
        const user = responseBody?.user;

        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
        setUser(user);
        setRole(user.role);

        // Redirigir a la última página visitada o a una ruta según el rol
        navigate(user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error al iniciar sesión');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout, loading, balance: user?.balance || 0 }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
