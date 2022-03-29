import { Container } from "@mui/material";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Container
        fixed
        sx={{
          pt: 3,
        }}>
        <Component {...pageProps} />
      </Container>
    </QueryClientProvider>
  );
}

export default MyApp;
