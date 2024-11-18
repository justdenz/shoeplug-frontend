import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "@/components/Header";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql/", // Replace with your API URL
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
