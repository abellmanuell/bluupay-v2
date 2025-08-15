import AuthGuardRedirect from "@/layout/AuthGuardRedirect";
import OTPPageView from "../../components/views/OTPPageView";

function SigninPage() {
  return (
    <AuthGuardRedirect guestOnly>
      <OTPPageView />
    </AuthGuardRedirect>
  );
}

export default SigninPage;
