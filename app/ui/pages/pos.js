import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import pos from "../styles/pos.module.sass";
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

      <main className={styles.main}>
        <div className={pos.wFull}>
          <Stack spacing={2} sx={{ width: 300, mb: 2 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={products.map((option) => option.title)}
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
        </div>
        <Grid container spacing={2}>
          <Grid item xs>
            <Grid container spacing={2}>
              {products.map((film, index) => (
                <ProductCard key={index} title={film.title} />
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4}>
                <h3>Product</h3>
              </Grid>
              <Grid item xs={4}>
                <h3>Quantity</h3>
              </Grid>
              <Grid item xs={4}>
                <h3>Price</h3>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

const products = [
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
