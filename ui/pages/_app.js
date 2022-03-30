import { Container } from "@mui/material";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Header from "../Component/Header"
import Footer from "../Component/Footer"

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer/>
    </QueryClientProvider>
  );
}

export default MyApp;
