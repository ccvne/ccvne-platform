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

interface AuthorizationConfirmEmailProps {
  loginLink?: string;
}

export const AuthorizationConfirmEmail = ({
  loginLink,
}: AuthorizationConfirmEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Your Authorization Confirmation for Clubes Ciência Viva na Escola
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
          Welcome to Clubes Ciência Viva na Escola
        </Heading>
        <Text style={paragraph}>
          This authorization confirm email informs you that you have
          been successfully registered in our platform. You may now try to login
          again and start learning!
        </Text>
        <Text>
          Click <Link href={loginLink}>here</Link> to login again.
        </Text>
        <Text style={text}>
          If you didn&apos;t try to get registered, you can safely ignore this email.
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

export default AuthorizationConfirmEmail;

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

const text = {
  color: "#ababab",
  marginTop: "14px",
  marginBottom: "16px",
};
