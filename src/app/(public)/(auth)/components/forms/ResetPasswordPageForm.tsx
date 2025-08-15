"use client";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormLabel from "@mui/material/FormLabel";
import { authClient } from "@/lib/auth/client";
import { enqueueSnackbar } from "notistack";
import { redirect } from "next/navigation";

/**
 * Form Validation Schema
 */
const schema = z
  .object({
    password: z
      .string()
      .nonempty("Please enter your password.")
      .min(8, "Password is too short - should be 8 chars minimum."),
    passwordConfirm: z.string().nonempty("Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });

type FormType = z.infer<typeof schema>;

const defaultValues = {
  password: "",
  confirmPassword: "",
};

function ResetPasswordPageForm() {
  const { control, formState, handleSubmit } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  async function onSubmit(d) {
    /***
     * Apply token later
     *  */
    const { data, error } = await authClient.resetPassword({
      newPassword: d.password,
      token: "",
    });

    if (error) {
      enqueueSnackbar({
        message: error.message,
        variant: "error",
      });
    } else {
      // eslint-disable-next-line no-console
      console.log(data);
      redirect("/onboarding");
    }
  }

  return (
    <form
      name="loginForm"
      noValidate
      className="flex w-full flex-col justify-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-6"
            label="New Password"
            type="password"
            error={!!errors.password}
            helperText={errors?.password?.message}
            variant="outlined"
            required
            fullWidth
          />
        )}
      />
      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-6"
            label="Password (Confirm)"
            type="password"
            error={!!errors.passwordConfirm}
            helperText={errors?.passwordConfirm?.message}
            variant="outlined"
            required
            fullWidth
          />
        )}
      />

      <Button
        variant="contained"
        color="secondary"
        className="w-full"
        aria-label="Sign in"
        disabled={_.isEmpty(dirtyFields) || !isValid}
        type="submit"
        size="medium"
      >
        Reset Password
      </Button>
    </form>
  );
}

export default ResetPasswordPageForm;
