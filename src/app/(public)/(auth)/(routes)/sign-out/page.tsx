import AuthGuardRedirect from '@/layout/AuthGuardRedirect';
import SignOutPageView from '../../components/views/SignOutPageView';

function Page() {
	return (
		<AuthGuardRedirect guestOnly>
			<SignOutPageView />
		</AuthGuardRedirect>
	);
}

export default Page;
