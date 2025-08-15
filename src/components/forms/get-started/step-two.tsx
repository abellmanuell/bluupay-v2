import * as z from "zod";

const stepTwoSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.enum([
    'sole',
    'llc',
    'partnership'
  ]),
  businessCategory: z.enum([
    'retail',
    'restaurant',
    'pharmacy',
    'electronics',
    'fashion',
    'salon'
  ]),
  cacNumber: z
    .string()
    .optional()
    .refine((val) => val === undefined || /^[A-Z0-9]{6,20}$/.test(val), {
      message: "Enter a valid CAC number",
    }),
  businessAddress: z.string().min(5, "Business address is required"),
  businessPhone: z.string().regex(/^0\d{10}$/, "Enter a valid 11-digit phone number"),
  businessEmail: z.email("Invalid email").optional(),
})