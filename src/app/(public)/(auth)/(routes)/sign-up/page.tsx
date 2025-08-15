import AuthGuardRedirect from '@/layout/AuthGuardRedirect';
import SignUpPageView from '../../components/views/SignUpPageView';

function SignupPage() {
	return (
		<AuthGuardRedirect guestOnly>
			<SignUpPageView />
		</AuthGuardRedirect>
	);
}

export default SignupPage;
