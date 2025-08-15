import Paper from "@mui/material/Paper";
import OTPPageTitle from "../ui/OTPPageTitle";
import OTPPageForm from "../forms/OTPPageForm";

/**
 * The sign in page.
 */
function OTPPageView() {
  return (
    <div className="flex min-w-0 flex-auto flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
      <Paper className="h-full w-full px-4 py-2 sm:h-auto sm:w-auto sm:rounded-xl sm:p-12 sm:shadow-sm md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-16 md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="mx-auto flex w-full flex-col gap-8 sm:mx-0">
          <OTPPageTitle />

          <OTPPageForm />
        </div>
      </Paper>

      {/* <AuthPagesMessageSection /> */}
    </div>
  );
}

export default OTPPageView;
