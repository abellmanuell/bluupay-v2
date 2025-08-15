// src/components/onboarding/PreferencesForm.tsx

"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { step3Schema } from './VerticalStepper'; // Import schema

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Markdown from 'react-markdown';

type Step3FormData = z.infer<typeof step3Schema>;

interface PreferencesFormProps {
  control: Control<Step3FormData>;
  errors: FieldErrors<Step3FormData>;
}

// --- Sample Agreement Text ---
const AGREEMENT_TEXT = `
PLEASE READ THIS AGREEMENT CAREFULLY BEFORE USING THIS SERVICE. 

1. **Acceptance of Terms**
   By accessing or using the services provided by [Your Company Name] ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.

2. **Description of Service**
   [Your Company Name] provides a platform for [brief description of your service, e.g., business registration, financial services, etc.].

3. **User Responsibilities**
   You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must provide accurate and complete information during the registration process and keep your information updated.

4. **Use of Information**
   You agree that [Your Company Name] may collect, use, and disclose your personal information as described in our Privacy Policy, which is incorporated by reference into these Terms.

5. **Prohibited Activities**
   You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Service. You agree not to attempt to gain unauthorized access to any portion of the Service.

6. **Intellectual Property**
   The Service and its original content, features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors.

7. **Disclaimer of Warranties**
   THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. [YOUR COMPANY NAME] EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

8. **Limitation of Liability**
   IN NO EVENT SHALL [YOUR COMPANY NAME], NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER LOSSES.

9. **Termination**
   We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

10. **Governing Law**
    These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.

11. **Changes to Terms**
    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.

12. **Contact Us**
    If you have any questions about these Terms, please contact us at [contact email].
`.trim();
// --- End Sample Agreement Text ---


const PreferencesForm: React.FC<PreferencesFormProps> = ({ control, errors }) => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const cardContentRef = useRef<HTMLDivElement>(null);

  // Check scroll position initially and on scroll events
  useEffect(() => {
    const handleScroll = () => {
      const element = cardContentRef.current;
      if (element) {
        const { scrollTop, scrollHeight, clientHeight } = element;
        // Consider scrolled to bottom if within a small threshold (e.g., 5px)
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          setIsScrolledToBottom(true);
        }
      }
    };

    const element = cardContentRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      // Initial check in case content is short and already at bottom
      handleScroll();
    }

    // Cleanup listener on unmount
    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <Box>
      {/* <Typography variant="h6" gutterBottom>
        Terms and Conditions
      </Typography> */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent
          ref={cardContentRef}
          sx={{
            height: 200, // Fixed height for scrollable area
            overflowY: 'auto', // Enable vertical scrolling
            whiteSpace: 'pre-line', // Preserve line breaks in the text
          }}
        >
          <Markdown>{AGREEMENT_TEXT}</Markdown>
        </CardContent>
      </Card>

      <Controller
        name="agreeToTerms"
        control={control}
        render={({ field }) => (
          <FormControl
            error={!!errors.agreeToTerms}
            component="fieldset"
            // variant="standard"
            fullWidth
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value || false}
                    disabled={!isScrolledToBottom} // Enable checkbox only after scrolling
                  />
                }
                label={
                  <Typography variant="body2">
                    I have read and agree to the Terms and Conditions
                  </Typography>
                }
                // required
                // labelPlacement="end"
              />
            </FormGroup>
            {errors.agreeToTerms && (
              <FormHelperText>{errors.agreeToTerms.message}</FormHelperText>
            )}
             {!isScrolledToBottom && (
                <FormHelperText sx={{ color: 'text.secondary' }}>
                    Please scroll to the bottom to agree.
                </FormHelperText>
            )}
          </FormControl>
        )}
      />

      {/* Optional: Add a button to scroll to the bottom */}
      {/* <Button
        size="small"
        onClick={() => {
          if (cardContentRef.current) {
            cardContentRef.current.scrollTo({ top: cardContentRef.current.scrollHeight, behavior: 'smooth' });
          }
        }}
        disabled={isScrolledToBottom}
        sx={{ mb: 2 }}
      >
        Scroll to End
      </Button> */}
    </Box>
  );
};

export default PreferencesForm;