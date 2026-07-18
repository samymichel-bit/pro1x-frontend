'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Vérifie le localStorage au chargement
    const authStatus = localStorage.getItem('pro1x_auth') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const login = (email: string, password: string) => {
    // Simulation de connexion (accepte tout sauf mot de passe vide)
    if (password.length > 0) {
      localStorage.setItem('pro1x_auth', 'true');
      setIsAuthenticated(true);
      router.push('/');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('pro1x_auth');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return { isAuthenticated, login, logout };
}
