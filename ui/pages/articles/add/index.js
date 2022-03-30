import { Box, Button, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import { addArticle } from "../../../services/articles";

const AddPost = () => {
  const [formData, setFormData] = useState({});
  const { isLoading, mutateAsync } = useMutation(addArticle);

  const onChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };
  const onAdd = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="article-section">
    <Grid container>
      <Grid item sm={3} />
      <Grid item sm={6}>
        <h3>Add Articles</h3>

        <form onSubmit={onAdd}>
          <Grid spacing={5} container>
            <Grid item sm={12}>
              <TextField
                name='title'
                sx={{
                  width: "100%",
                }}
                label='Title'
                variant='outlined'
                onChange={onChange}
                value={formData.title}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                name='body'
                label='Body'
                variant='outlined'
                multiline
                rows={5}
                sx={{
                  width: "100%",
                }}
                onChange={onChange}
                value={formData.body}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                name='authorEmail'
                sx={{
                  width: "100%",
                }}
                type='email'
                label='Author Email'
                variant='outlined'
                onChange={onChange}
                value={formData.authorEmail}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                name='publicationDate'
                type='date'
                /* label='Date' */
                variant='outlined'
                sx={{
                  width: "100%",
                }}
                onChange={onChange}
                value={formData.publicationDate}
              />
            </Grid>
          </Grid>
          <Box sx={{ pt: 2, textAlign: "right" }}>
            <Link href='/'>
              <a>
                <Button variant='outlined' sx={{ mr: 2 }}>
                  Cancel
                </Button>
              </a>
            </Link>

            <Button variant='contained' type='submit'>
              Add
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
    </section>
  );
};

export default AddPost;
