import AuthGuardRedirect from '@/layout/AuthGuardRedirect';
import SignInPageView from '../../components/views/SignInPageView';

function SigninPage() {
	return (
		<AuthGuardRedirect guestOnly>
			<SignInPageView />
		</AuthGuardRedirect>
	);
}

export default SigninPage;
