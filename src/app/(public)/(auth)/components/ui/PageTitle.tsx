/***
 * Page Title for Sign in and Sign Up
 * Ignore until I find a good/proper filename for it.
 * I left it because there's a component with PageTitle in @/component
 */

import Typography from "@mui/material/Typography";
import Link from "@fuse/core/Link";

interface PageTitleProps {
  title: string;
  description?: string;
  href?: string;
  linkTitle?: string;
}

function PageTitle({ title, description, href, linkTitle }: PageTitleProps) {
  return (
    <div className="w-full">
      <img className="w-12" src={"bluu-icon.png"} alt="logo" />

      <Typography className="mt-8 text-4xl leading-[1.25] font-extrabold tracking-tight">
        {title}
      </Typography>
      <div className="mt-0.5 flex items-baseline font-medium">
        <Typography>{description}</Typography>
        <Link className="ml-1 text-blue-600" to={href}>
          {linkTitle}
        </Link>
      </div>
    </div>
  );
}

export default PageTitle;
