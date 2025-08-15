import AuthGuardRedirect from "@/layout/AuthGuardRedirect";
import ForgotPasswordPageView from "@/app/(public)/(auth)/components/views/ForgotPasswordPageView";

function ForgotPassword() {
  return (
    <AuthGuardRedirect guestOnly>
      <ForgotPasswordPageView />
    </AuthGuardRedirect>
  );
}

export default ForgotPassword;
