// src/components/onboarding/BusinessInfoForm.tsx
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { step2Schema } from './VerticalStepper'; // Import schema

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type Step2FormData = z.infer<typeof step2Schema>;

interface BusinessInfoFormProps {
  control: Control<Step2FormData>;
  errors: FieldErrors<Step2FormData>;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({ control, errors }) => {
  return (
    <div className='flex w-full flex-col justify-center gap-4'>
      <Controller
        name="businessName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Business Name"
            fullWidth
            // margin="normal"
            error={!!errors.businessName}
            helperText={errors.businessName?.message}
            required
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="businessType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Business Type"
              select
              fullWidth
              // margin="normal"
              error={!!errors.businessType}
              helperText={errors.businessType?.message}
              required
            >
              <MenuItem value="LLC">LLC</MenuItem>
              <MenuItem value="Corporation">Corporation</MenuItem>
              <MenuItem value="Partnership">Partnership</MenuItem>
              <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
            </TextField>
          )}
        />
        <Controller
          name="businessCategory"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Business Category"
              select
              fullWidth
              // margin="normal"
              error={!!errors.businessCategory}
              helperText={errors.businessCategory?.message}
              required
            >
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
            </TextField>
          )}
        />
      </Box>

      {/* <Typography variant="subtitle2" gutterBottom>
        Business Address
      </Typography> */}
      <Controller
        name="street"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Street"
            fullWidth
            // margin="normal"
            error={!!errors.street}
            helperText={errors.street?.message}
            required
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="City"
              fullWidth
              // margin="normal"
              error={!!errors.city}
              helperText={errors.city?.message}
              required
            />
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="State"
              fullWidth
              // margin="normal"
              error={!!errors.state}
              helperText={errors.state?.message}
              required
            />
          )}
        />
      </Box>

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Country"
            fullWidth
            // margin="normal"
            error={!!errors.country}
            helperText={errors.country?.message}
            required
          />
        )}
      />
    </div>
  );
};

export default BusinessInfoForm;