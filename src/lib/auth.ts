"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const getIsAuthed = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem("isAuthed") === "true";
};

export const getIsPro = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem("isPro") === "true";
};

export const login = (email: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem("email", email);
  localStorage.setItem("isAuthed", "true");
};

export const upgradeToPro = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem("isPro", "true");
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("email");
  localStorage.removeItem("isAuthed");
  localStorage.removeItem("isPro");
};

export const useAuthProtection = (redirectTo: string = '/login') => {
  const router = useRouter();
  
  useEffect(() => {
    if (!getIsAuthed()) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);
};

export const useProProtection = (redirectTo: string = '/upgrade') => {
  const router = useRouter();
  
  useEffect(() => {
    if (!getIsPro()) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);
};
