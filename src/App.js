import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import meLol from "./me-lol.jpg";

const App = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0093E9",
        backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
      }}
    >
      <Card style={{ padding: 30 }}>
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 30,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ width: 90, height: 90 }} src={meLol}>
              EC
            </Avatar>
            <Typography variant="h3" style={{ marginTop: 20 }}>
              {"I'm Elliott "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </Typography>
            <Typography sx={{ mt: 1.5 }} color="text.secondary">
              Software Engineer
            </Typography>
          </div>
          <Typography sx={{ mt: 1.5 }}>Node, React, TypeScript</Typography>
          <Typography sx={{ mt: 1.5 }}>
            Azure, Git, Octopus, Prisma, TeamCity,
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" href="https://github.com/ejaycoleman">
            Github
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default App;
