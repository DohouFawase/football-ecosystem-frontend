"use client";

import React from 'react';
import { useAuth } from "@/context/AuthContext";
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Grid } from '@/components/ui/Grid';
import { Badge } from '@/components/ui/Badge';
import { Hero } from '@/components/shared/Hero';

export default function Home() {
  const { isLoggedIn, login } = useAuth();

  return (
  
    <Hero/>
  );
}