import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface TwoFactorCodeEmailProps {
  validationCode?: string;
}

export const TwoFactorCodeEmail = ({
  validationCode,
}: TwoFactorCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Your two factor authentication code for Clubes Ciência Viva na Escola
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://utfs.io/f/c5330d96-2e7c-49b5-9c0f-b6a2a20481ba-1zbfv.png"
          width="180"
          height="90"
          alt="ccvne"
          style={logo}
        />
        <Heading style={heading}>
          Your code for Clubes Ciência Viva na Escola
        </Heading>
        <Text style={paragraph}>
          This code will only be valid for the next 5 minutes. If the code does
          not work, you may request a new one:
        </Text>
        <code style={code}>{validationCode}</code>
        <Text style={text}>
          If you didn&apos;t try to login, you can safely ignore this email.
        </Text>
        <Hr style={hr} />
        <Text style={text}>
          <Link href="https://ap-pdf.club" style={link}>
            Clubes Ciência Viva na Escola
          </Link>
          , R. de O Primeiro de Janeiro, 4100-367 Porto
        </Text>
      </Container>
    </Body>
  </Html>
);

TwoFactorCodeEmail.PreviewProps = {
  validationCode: "tt226-5398x",
} as TwoFactorCodeEmailProps;

export default TwoFactorCodeEmail;

const logo = {
  width: 180,
  height: 90,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const link = {
  fontSize: "14px",
  color: "#ababab",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "36px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};

const text = {
  color: "#ababab",
  marginTop: "14px",
  marginBottom: "16px",
};
