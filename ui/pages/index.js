import { Box, Button, Grid, Paper, Skeleton, styled,Container } from "@mui/material";
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
    <section className="article-section">
      <Container>
      <div className="article-list-wrap">
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
            <article className="article-card" item key={article._id}>
              <h2>{article.title}</h2>
              <p>{article.body}</p>
              <div className="meta-info">
                <div className="post-author">{article.authorEmail}</div>
                <p className="article-date">{article.publicationDate}</p>
              </div>
            </article>
          ))
        ) : (
          <div className="w-100 p-3 text-center">
              No Articles found.
          </div>
        )}
      </div>     
      <Link href='/articles/add'>
        <div className="w-100 article-btn-wrap text-center">
          <Button variant='outlined'>Add Your Article</Button>
        </div>
        </Link>
      </Container>
    </section>
  );
}
