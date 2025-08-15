// src/components/onboarding/PersonalInfoForm.tsx
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { step1Schema } from './VerticalStepper'; // Import schema

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

type Step1FormData = z.infer<typeof step1Schema>;

interface PersonalInfoFormProps {
  control: Control<Step1FormData>;
  errors: FieldErrors<Step1FormData>;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ control, errors }) => {
  return (
    <div className='flex w-full flex-col justify-center gap-4'>
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Full Name"
            fullWidth
            // margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            required
            // slotProps={{
            //   // `input` targets the underlying <input> element
            //   input: {
            //     className: "text-lg py-2", // tailwind font size + vertical padding
            //   },
            //   // You can also target the root if needed:
            //   root: {
            //     className: "text-base", // optional root-level tailwind utilities
            //   },
            // }}
          />
        )}
      />
      <Controller
        name="bvn"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="BVN"
            fullWidth
            // margin="normal"
            error={!!errors.bvn}
            helperText={errors.bvn?.message}
            required
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              fullWidth
              // margin="normal"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              required
            />
          )}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date of Birth"
              type="date"
              fullWidth
              // margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
              required
            />
          )}
        />
      </Box>
    </div>
  );
};

export default PersonalInfoForm;