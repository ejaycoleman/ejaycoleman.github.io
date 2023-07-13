import { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Grid } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#041533",
      contrastText: "#fff",
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#041533",
          background:
            "radial-gradient(ellipse at right bottom, #1B4662 10%, #041533 50%, #451838 100%)",
        }}
      >
        <Component {...pageProps} />
      </Grid>
    </ThemeProvider>
  );
}
