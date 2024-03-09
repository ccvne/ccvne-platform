import { Resend } from "resend";

import { ResetPasswordEmail } from "@/components/emails/reset-password-email";
import { TwoFactorCodeEmail } from "@/components/emails/two-factor-code-email";
import { ConfirmationEmail } from '@/components/emails/confirmation-email';
import AuthorizationConfirmEmail from "@/components/emails/authorization-confirm-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Clubes Ciência Viva na Escola <no-reply@ap-pdf.club>",
    to: email,
    subject: "Your Two Factor Authentication Code",
    react: TwoFactorCodeEmail({ validationCode: token }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Clubes Ciência Viva na Escola <no-reply@ap-pdf.club>",
    to: email,
    subject: "Reset Your Password",
    react: ResetPasswordEmail({ resetLink }),
  });
};

export const sendAuthorizationConfirmEmail = async (email: string) => {
  const loginLink = `${domain}/auth/login`;

  await resend.emails.send({
    from: "Clubes Ciência Viva na Escola <no-reply@ap-pdf.club>",
    to: email,
    subject: "Happy Learning",
    react: AuthorizationConfirmEmail({ loginLink }),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Clubes Ciência Viva na Escola <no-reply@ap-pdf.club>",
    to: email,
    subject: "Email Confirmation",
    react: ConfirmationEmail({ confirmLink }),
  });
};
