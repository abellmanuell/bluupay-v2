// import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const stepOneSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  // email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^0\d{10}$/, "Enter a valid 11-digit Nigerian phone number"),
  bvn: z.string().regex(/^\d{13}$/, "BVN must be 13 digits"),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Enter a valid date",
  }),
  // nin: z.string().regex(/^\d{11}$/, "NIN must be 11 digits").or(z.literal("")).optional(),
})

type StepOneFormType = z.infer<typeof stepOneSchema>;

export default function StepOne() {
  const { control, formState, handleSubmit, reset } = useForm<StepOneFormType>({
    mode: 'onChange',
    // defaultValues,
    resolver: zodResolver(stepOneSchema)
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
  }

  return (
    <form
			name="stepOneForm"
			noValidate
			className="flex w-full flex-col justify-center gap-4"
			// onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				name="fullName"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel required htmlFor="fullName">Full Names</FormLabel>
						<TextField
							{...field}
							autoFocus
							error={!!errors.fullName}
							helperText={errors?.fullName?.message}
							required
							fullWidth
						/>
					</FormControl>
				)}
			/>
      <Controller
				name="phoneNumber"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel required htmlFor="phoneNumber">Phone Number</FormLabel>
						<TextField
							{...field}
							autoFocus
							error={!!errors.phoneNumber}
							helperText={errors?.phoneNumber?.message}
							required
							fullWidth
						/>
					</FormControl>
				)}
			/>
      <Controller
				name="dateOfBirth"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel required htmlFor="dateOfBirth">Date Of Birth</FormLabel>
						<TextField
							{...field}
							autoFocus
							error={!!errors.dateOfBirth}
							helperText={errors?.dateOfBirth?.message}
							required
							fullWidth
						/>
					</FormControl>
				)}
			/>
      <Controller
				name="bvn"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel required htmlFor="bvn">BVN</FormLabel>
						<TextField
							{...field}
							autoFocus
							error={!!errors.bvn}
							helperText={errors?.bvn?.message}
							required
							fullWidth
						/>
					</FormControl>
				)}
			/>
		</form>
  )
}