import * as React from "react";
import Head from "next/head";
import styles from "../styles/index.module.scss";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import OrderItem from "../components/OrderItem";

import { inject, observer } from "mobx-react";

function PointOfSale(props) {
  const { cart, addToCart, cartTotal } = props.cartStore;
  const { products } = props.productStore;

  return (
    <React.Fragment>
      <NavBar />
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
          <div className={styles.wFull}>
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
                  <a
                    href="#"
                    onClick={() => {
                      addToCart(product);
                    }}
                    key={index}
                  >
                    <ProductCard title={product.title} price={product.price} />
                  </a>
                ))}
              </Grid>
            </Grid>

            {/* Order List */}
            {cart.length !== 0 && (
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
                  <OrderItem product={product} key={index} />
                ))}
                <div>
                  <Divider light />
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={4}>
                      {/* <h3>Product</h3> */}
                    </Grid>
                    <Grid item xs={4}>
                      <h3>Total</h3>
                    </Grid>
                    <Grid item xs={4}>
                      <h3>$ {cartTotal}</h3>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            )}
          </Grid>
        </main>
      </div>
    </React.Fragment>
  );
}

export default inject("cartStore", "productStore")(observer(PointOfSale));
