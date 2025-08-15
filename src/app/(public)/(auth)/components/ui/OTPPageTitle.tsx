import Typography from "@mui/material/Typography";
import Link from "@fuse/core/Link";

function OTPPageTitle() {
  return (
    <div className="w-full">
      <img className="w-12" src={"bluu-icon.png"} alt="logo" />

      <Typography className="mt-8 text-4xl leading-[1.25] font-extrabold tracking-tight">
        OTP Verification
      </Typography>

      <div className="mt-0.5 flex items-baseline font-medium">
        <Typography>
          Please check your inbox and enter the code to continue.
        </Typography>
      </div>
    </div>
  );
}

export default OTPPageTitle;
