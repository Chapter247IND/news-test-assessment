import * as React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  styled,
  Container,
} from "@mui/material";
import { useQuery } from "react-query";
import { getArticles } from "../services/articles";
import Link from "next/link";
import { grey } from "@mui/material/colors";
import moment from "moment";

const { useState } = React;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ReadBtn = styled("span")(({ theme }) => ({
  color: grey[500],
  cursor: "pointer",
  "&:hover": {
    color: grey[700],
  },
  marginBottom: "1rem",
}));

const LongText = ({ content, limit }) => {
  const [showAll, setShowAll] = useState(false);

  const showMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);

  if (content.length <= limit) {
    // there is nothing more to show
    return <p className="article-content">{content}</p>;
  }
  if (showAll) {
    // We show the extended text and a link to reduce it
    return (
      <p className="article-content">
        {content}
        <ReadBtn onClick={showLess}>Read less</ReadBtn>
      </p>
    );
  }
  // In the final case, we show a text with ellipsis and a `Read more` button
  const toShow = content.substring(0, limit) + "...";
  return (
    <p className="article-content">
      {toShow}
      <ReadBtn onClick={showMore}>Read more</ReadBtn>
    </p>
  );
};

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
                  <Skeleton height={25} width="100%" />
                  <Skeleton width="60%" />
                </Box>
              </Grid>
            ))}
          {!isLoading && articles.length > 0 ? (
            articles.map((article) => {
              const dateString = moment(article.publicationDate).format("MMMM D, YYYY");
              console.log(dateString);
              return (
                <article className="article-card" item key={article._id}>
                  <h2>{article.title}</h2>
                  <LongText content={article.body} limit={320} />
                  <div className="meta-info">
                    <div className="post-author">{article.authorEmail}</div>|
                    <p className="article-date">{dateString}</p>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="w-100 p-3 text-center">No Articles found.</div>
          )}
        </div>
        <Link href="/articles/add">
          <div className="w-100 article-btn-wrap text-center">
            <Button variant="outlined">Add Your Article</Button>
          </div>
        </Link>
      </Container>
    </section>
  );
}
