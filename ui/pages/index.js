import { Box, Button, Grid, Paper, Skeleton, styled } from "@mui/material";
import { useQuery } from "react-query";
import { getArticles } from "../services/articles";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const { isLoading, data } = useQuery(["articles"], () => getArticles());

  const articles = data?.data || [];

  return (
    <>
      <Link href='/articles/add'>
        <a>
          <Button variant='outlined'>Add Article</Button>
        </a>
      </Link>
      <Grid container spacing={2}>
        {isLoading &&
          new Array(5).fill(null).map((_, index) => (
            <Grid item xs={4} key={index}>
              <Box sx={{ pt: 0.5 }}>
                <Skeleton height={250} />
                <Skeleton height={25} width='100%' />
                <Skeleton width='60%' />
              </Box>
            </Grid>
          ))}
        {!isLoading && articles.length > 0 ? (
          articles.map((article) => (
            <Grid item xs={4} key={article._id}>
              <Box sx={{ pt: 0.5 }}>{article.title}</Box>
              <Box sx={{ pt: 0.5 }}>{article.body}</Box>
              <Box sx={{ pt: 0.5 }}>{article.authorEmail}</Box>
              <Box sx={{ pt: 0.5 }}>{article.publicationDate}</Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ pt: 0.5, textAlign: "center", fontSize: 20 }}>
              No Articles found.
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}
