import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import pos from "../styles/pos.module.sass";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

import ProductCard from "../components/ProductCard";
import OrderItem from "../components/OrderItem";

import { inject, observer } from "mobx-react";

function PointOfSale(props) {
  const { cart, addToCart, removeFromCart, clearCart, cartTotal } = props.cartStore;

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
        {/* Search Bar */}
        <div className={pos.wFull}>
          <Stack spacing={2} sx={{ maxWidth: 300, mb: 2, pr: 2 }}>
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

        {/* Product List */}
        <Grid container spacing={2}>
          <Grid item xs>
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  title={product.title}
                  price={product.price}
                  onClick={() => addToCart(product)}
                />
              ))}
            </Grid>
          </Grid>

          {/* Order List */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
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

            {cart.map((product, index) => (
              <OrderItem product={product} key={index}/>
            ))}
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default inject("cartStore")(observer(PointOfSale));

const products = [
  { title: "Synthroid", price: 1994, quantity: 1 },
  { title: "Crestor", price: 1972, quantity: 3 },
  { title: "Ventolin", price: 1974, quantity: 5 },
  { title: "Nexium", price: 2008, quantity: 4 },
  { title: "Advair Diskus", price: 1957, quantity: 2 },
  { title: "Lantus Solostar", price: 1993, quantity: 7 },
  { title: "Vyvanse", price: 1994, quantity: 12 },
  { title: "Lyrica", price: 2003, quantity: 4 },
];
