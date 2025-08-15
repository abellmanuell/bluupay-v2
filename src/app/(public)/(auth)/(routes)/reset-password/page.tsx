import AuthGuardRedirect from "@/layout/AuthGuardRedirect";
import ResetPasswordPageView from "../../components/views/ResetPasswordPageView";

function SigninPage() {
  return (
    <AuthGuardRedirect guestOnly>
      <ResetPasswordPageView />
    </AuthGuardRedirect>
  );
}

export default SigninPage;
