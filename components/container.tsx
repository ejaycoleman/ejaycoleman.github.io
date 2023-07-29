import {
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  date: string;
  title: string;
};

const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "LLLL	d, yyyy");
};

const Container = ({ children, date, title }: Props) => {
  return (
    <Card sx={{ p: 3, m: 3, maxWidth: "90%" }}>
      <Breadcrumbs>
        <Link style={{ color: "#3E1B36", textDecoration: "none" }} href="/">
          ejayc.co.uk
        </Link>
        <Link
          style={{ color: "#3E1B36", textDecoration: "none" }}
          href="/posts"
        >
          posts
        </Link>
        <Typography>{title}</Typography>
      </Breadcrumbs>
      <CardHeader title={title} subheader={formatDate(date)} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default Container;
