"use client";

import React from 'react';
import { useAuth } from "@/context/AuthContext";
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Grid } from '@/components/ui/Grid';
import { Badge } from '@/components/ui/Badge';
import { Hero } from '@/components/shared/Hero';
import { CTASection } from '../_components/CTASection';
import { FAQSection } from '../_components/FAQSection';
import { FeaturesSection } from '../_components/FeaturesSection';
import { HowItWorksSection } from '../_components/Howitworkssection';
import { PricingSection } from '../_components/PricingSection';
import { TargetAudienceSection } from '../_components/TargetAudienceSection';
import { TestimonialsSection } from '../_components/TestimonialsSection';

export default function Home() {
  const { isLoggedIn, login } = useAuth();

  return (
  
    <>
    <Hero/>
    <FeaturesSection/>
    <HowItWorksSection/>
    <TargetAudienceSection/>
    <TestimonialsSection/>
    <PricingSection/>
    <FAQSection/>
    <CTASection/>
    </>
  );
}