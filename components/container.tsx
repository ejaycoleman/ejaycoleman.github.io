import { Card, CardContent } from "@mui/material";

type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <Card sx={{ p: 3, m: 3 }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default Container;
