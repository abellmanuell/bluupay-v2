// src/app/onboarding/page.tsx
import React from 'react';
import { Metadata } from 'next'; // For metadata
import VerticalStepperWithForms from '@/components/onboarding/VerticalStepper';
import AuthPagesMessageSection from '../(public)/(auth)/components/ui/AuthPagesMessageSection';
import Paper from '@mui/material/Paper';
import GetStartedPageTitle from './title';
import MainLayout from '@/components/MainLayout';
import AuthGuardRedirect from '@/layout/AuthGuardRedirect';

export const metadata: Metadata = {
  title: 'Onboarding | BluuPay',
  description: 'Complete your onboarding process.',
};

const OnboardingPageComponent: React.FC = () => {
  return (
    <div className="flex min-w-0 flex-auto flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
			<Paper className="h-full w-full px-4 py-2 sm:h-auto sm:w-auto sm:rounded-xl sm:p-12 sm:shadow-sm md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-16 md:shadow-none ltr:border-r-1 rtl:border-l-1">
				<div className="mx-auto flex w-full flex-col gap-8 sm:mx-0">
          <GetStartedPageTitle />
					<VerticalStepperWithForms />
				</div>
			</Paper>

			<AuthPagesMessageSection />
		</div>
  );
};

export default function OnboardingPage() {
  return (
    <MainLayout
			navbar={false}
			toolbar={false}
			leftSidePanel={false}
			rightSidePanel={false}
			footer={false}
		>
			<AuthGuardRedirect requireAuth>
        <OnboardingPageComponent />
      </AuthGuardRedirect>
		</MainLayout>
  )
}