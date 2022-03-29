import { Container } from "@mui/material";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Container fixed>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
