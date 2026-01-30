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

export const getEmail = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem("email") || '';
};

export const setUserInfo = (email: string, isPro: boolean) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem("email", email);
  localStorage.setItem("isPro", isPro ? "true" : "false");
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/sayright';

export const sendCode = async (email: string) => {
  const res = await fetch(`${API_URL}/auth/send-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
      const errorMessage = data.error || 'Failed to send code';
      const err = new Error(errorMessage) as Error & { retryAfter?: number };
      if (typeof data.retry_after === 'number') {
        err.retryAfter = data.retry_after;
      }
      throw err;
  }
  return data;
};

export const verifyCode = async (email: string, code: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, code }),
  });
  if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to verify code');
  }
  return res.json();
};

export const fetchUserByEmail = async (email: string) => {
  if (!email) return null;
  const res = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch user');
  }
  return res.json();
};

export type TemplateSummary = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  is_pro: boolean;
  is_locked: boolean;
};

export type TemplateCategory = {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  templates: TemplateSummary[];
};

export type TemplateListResponse = {
  categories: TemplateCategory[];
};

export type TemplateDetail = {
  id: number;
  category_id: number;
  category_name: string;
  title: string;
  description: string;
  tags: string[];
  is_pro: boolean;
  reply_soft: string;
  reply_neutral: string;
  reply_firm: string;
  when_not_to_use: string;
  best_practices: string[];
};

export const fetchTemplateList = async (): Promise<TemplateListResponse> => {
  const res = await fetch(`${API_URL}/templates`, {
    method: 'GET',
    credentials: 'include',
  });
  if (res.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch templates');
  }
  return res.json();
};

export const fetchTemplateDetail = async (templateId: string): Promise<TemplateDetail> => {
  const res = await fetch(`${API_URL}/templates/${templateId}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (res.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  if (res.status === 403) {
    throw new Error('PRO_REQUIRED');
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch template detail');
  }
  return res.json();
};
