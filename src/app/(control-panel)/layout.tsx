import AuthGuardRedirect from "@/layout/AuthGuardRedirect";
import MainLayout from "src/components/MainLayout";

function Layout({ children }) {
  return (
    <AuthGuardRedirect requireAuth>
      <MainLayout>{children}</MainLayout>
    </AuthGuardRedirect>
  );
}

export default Layout;
