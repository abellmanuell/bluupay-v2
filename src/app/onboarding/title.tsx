"use client"

import Typography from "@mui/material/Typography";

export default function GetStartedPageTitle() {
	return (
		<div className="w-full">
			<img
				className="w-12"
				// src="/assets/images/logo/logo.svg"
        src={'bluu-icon.png'}
				alt="logo"
			/>

			<Typography className="mt-8 text-4xl leading-[1.25] font-extrabold tracking-tight">Business Onboarding</Typography>
			<div className="mt-0.5 flex items-baseline font-medium">
				<Typography>Let's tailor BluuPay for your business.</Typography>
				
			</div>
		</div>
	);
}