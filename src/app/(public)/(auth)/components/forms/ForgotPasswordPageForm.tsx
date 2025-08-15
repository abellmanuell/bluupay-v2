"use client";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@fuse/core/Link";
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
const schema = z.object({
  email: z
    .email("You must enter a valid email")
    .nonempty("You must enter an email"),
});

type FormType = z.infer<typeof schema>;

const defaultValues = {
  email: "",
};

function ForgotPasswordPageForm() {
  const { control, formState, handleSubmit } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  async function onSubmit(d) {
    const { data, error } = await authClient.forgetPassword({ email: d.email });

    if (error) {
      enqueueSnackbar({
        message: error.message,
        variant: "error",
      });
    } else {
      console.log(data);
      redirect("/onboarding");
    }
  }

  return (
    <form
      name="forgotPassowrdForm"
      noValidate
      className="flex w-full flex-col justify-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <TextField
              {...field}
              autoFocus
              type="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              required
              fullWidth
            />
          </FormControl>
        )}
      />

      <Button
        variant="contained"
        color="secondary"
        className="w-full"
        aria-label="Forgot Password"
        disabled={_.isEmpty(dirtyFields) || !isValid}
        type="submit"
        size="medium"
      >
        Forgot Password
      </Button>
    </form>
  );
}

export default ForgotPasswordPageForm;
