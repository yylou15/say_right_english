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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const sendCode = async (email: string) => {
  const res = await fetch(`${API_URL}/auth/send-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to send code');
  }
};

export const verifyCode = async (email: string, code: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });
  if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to verify code');
  }
  return res.json();
};
