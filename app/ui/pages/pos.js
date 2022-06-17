import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ProductCard from "../components/ProductCard";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

export default function PointOfSale() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Point of Sale</title>
        <meta
          name="description"
          content="Point of Sale dedicated for Pharmacy."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack spacing={2} sx={{ width: 300, mb: 2 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {top100Films.map((film, index) => (
          <ProductCard key={index} title={film.title} />
        ))}
      </Grid>
    </div>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];
