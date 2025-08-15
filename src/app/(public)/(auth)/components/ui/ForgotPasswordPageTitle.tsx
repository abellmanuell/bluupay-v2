import Typography from "@mui/material/Typography";
import Link from "@fuse/core/Link";

function ForgetPasswordPageTitle() {
  return (
    <div className="w-full">
      <img className="w-12" src={"bluu-icon.png"} alt="logo" />

      <Typography className="mt-8 text-4xl leading-[1.25] font-extrabold tracking-tight">
        Forgot Password
      </Typography>
      <div className="mt-0.5 flex items-baseline font-medium">
        <Typography>Remember your password?</Typography>
        <Link className="ml-1 text-blue-600" to="/sign-in">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default ForgetPasswordPageTitle;
