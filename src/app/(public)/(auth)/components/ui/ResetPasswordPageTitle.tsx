import Typography from "@mui/material/Typography";
import Link from "@fuse/core/Link";

function ResetPasswordPageTitle() {
  return (
    <div className="w-full">
      <img className="w-12" src={"bluu-icon.png"} alt="logo" />

      <Typography className="mt-8 text-4xl leading-[1.25] font-extrabold tracking-tight">
        New Password
      </Typography>
    </div>
  );
}

export default ResetPasswordPageTitle;
