// src/components/onboarding/VerticalStepper.tsx
"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// --- MUI Components for Steppers ---
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

// --- MUI Components for Mobile Stepper ---
import Button from '@mui/material/Button';

// --- Other MUI Components ---
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Import the individual form components
import BusinessInfoForm from './BusinessInfoForm';
import PersonalInfoForm from './PersonalInfoForm';
import PreferencesForm from './PreferencesForm';

// --- Zod Schemas ---
// Updated Step 3 Schema (only agreement)
export const step1Schema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  bvn: z.string().length(11, 'BVN must be 11 digits'), // Enforce exact length
  phoneNumber: z.string().min(1, 'Phone Number is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'), // Consider date validation
});

export const step2Schema = z.object({
  businessName: z.string().min(1, 'Business Name is required'),
  businessType: z.string().min(1, 'Business Type is required'),
  businessCategory: z.string().min(1, 'Business Category is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
});

// Updated Step 3 Schema (only agreement)
export const step3Schema = z.object({
  // businessDisplayName: z.string().min(1, 'Business Display Name is required'),
  // preferredCurrency: z.string().min(1, 'Preferred Currency is required'),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Type for combined data if needed later
type FullFormData = z.infer<typeof step1Schema> & z.infer<typeof step2Schema> & z.infer<typeof step3Schema>;

const OnboardingStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3; // Define total steps

  // --- Form Hooks ---
  const {
    control: controlStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
    trigger: triggerStep1,
    getValues: getValuesStep1,
  } = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      bvn: '',
      phoneNumber: '',
      dateOfBirth: '',
    },
  });

  const {
    control: controlStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
    trigger: triggerStep2,
    getValues: getValuesStep2,
  } = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    mode: 'onChange',
    defaultValues: {
      businessName: '',
      businessType: '',
      businessCategory: '',
      street: '',
      city: '',
      state: '',
      country: '',
    },
  });

  const {
    control: controlStep3,
    handleSubmit: handleSubmitStep3,
    formState: { errors: errorsStep3 },
    trigger: triggerStep3,
    // getValues: getValuesStep3, // Not needed as data is passed directly on submit
  } = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    mode: 'onChange',
    defaultValues: {
      // businessDisplayName: '',
      // preferredCurrency: '',
      agreeToTerms: false,
    },
  });

  // --- Navigation Logic ---
  const handleNext = async () => {
    let isStepValid = false;
    if (activeStep === 0) {
      isStepValid = await triggerStep1();
    } else if (activeStep === 1) {
      isStepValid = await triggerStep2();
    } else if (activeStep === 2) {
      isStepValid = await triggerStep3();
    }

    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0)); // Prevent going below 0
  };

  const handleReset = () => {
    setActiveStep(0);
    // Reset form data if needed (use reset function from useForm)
    // resetStep1();
    // resetStep2();
    // resetStep3();
  };

  // --- Submission Handler ---
  const onSubmitAll = (data: z.infer<typeof step3Schema>) => {
    const finalData: FullFormData = {
      ...getValuesStep1(),
      ...getValuesStep2(),
      ...data // data from step 3 (agreement)
    };
    console.log("Final Submitted Data:", finalData);
    // Handle final submission logic here (e.g., API call)
    // Example: await submitOnboardingData(finalData);
    // For now, just show completion
    setActiveStep(totalSteps); // Move to completion state
  };

  // --- Dummy submit handlers to prevent default form submission for steps 1 & 2 ---
  const onStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const onStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // --- Render Step Content ---
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfoForm control={controlStep1} errors={errorsStep1} />;
      case 1:
        return <BusinessInfoForm control={controlStep2} errors={errorsStep2} />;
      case 2:
        return <PreferencesForm control={controlStep3} errors={errorsStep3} />;
      default:
        return null;
    }
  };

  // --- Completion State ---
  if (activeStep === totalSteps) {
    return (
      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Onboarding Completed!
        </Typography>
        <Typography variant="body1">
          Thank you for completing the onboarding process.
        </Typography>
        <Button onClick={handleReset} variant="outlined" sx={{ mt: 2 }}>
          Reset
        </Button>
      </Box>
    );
  }

  return (
    <Box className="my-7">
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Personal Information</StepLabel>
          <StepContent>
            <form onSubmit={onStep1Submit}>
              <PersonalInfoForm control={controlStep1} errors={errorsStep1} />
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Continue
                </Button>
                <Button disabled sx={{ mt: 2, mr: 1 }}>
                  Back
                </Button>
              </Box>
            </form>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Business Information</StepLabel>
          <StepContent>
            <form onSubmit={onStep2Submit}>
              <BusinessInfoForm control={controlStep2} errors={errorsStep2} />
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Continue
                </Button>
                <Button onClick={handleBack} sx={{ mt: 2, mr: 1 }}>
                  Back
                </Button>
              </Box>
            </form>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Agreement</StepLabel>
          <StepContent>
            <form id="step3-form" onSubmit={handleSubmitStep3(onSubmitAll)}> {/* Add ID for potential association */}
              <PreferencesForm control={controlStep3} errors={errorsStep3} />
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  type="submit" // This triggers the final submit handler
                  sx={{ mt: 1, mr: 1 }}
                >
                  Finish
                </Button>
                <Button onClick={handleBack} sx={{ mt: 2, mr: 1 }}>
                  Back
                </Button>
              </Box>
            </form>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
};

export default OnboardingStepper;