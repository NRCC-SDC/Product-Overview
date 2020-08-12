import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import randomColor from 'randomcolor';
import Header from './Header.jsx';
import Announcement from './Announcement.jsx';
import Images from './Images.jsx';
import Reviews from './Reviews.jsx';
import Name from './Name.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToBag from './AddToBag.jsx';
import Share from './Share.jsx';
import Description from './Description.jsx';
import Details from './Details.jsx';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px',
    padding: '0px',
  },
  details: {
    marginLeft: '20px'
  },
  reviews: {
    marginTop: "10px",
    marginBottom: "10px"
  },
  description: {
    marginLeft: "50px",
    marginTop: "20px"
  }
}));

const App = () => {
  const classes = useStyles();
  const [productId, setProductId] = useState(3);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [styles, setStyles] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`http://52.26.193.201:3000/reviews/${productId}/meta`),
      axios.get(`http://52.26.193.201:3000/products/${productId}`),
      axios.get(`http://52.26.193.201:3000/products/${productId}/styles`)
  ])
    .then(([resReviews, resProduct, resStyles]) => {
      setRatings(resReviews.data.ratings);
      setCurrentProduct(resProduct.data);
      setStyles(resStyles.data.results);
    })
    .catch((err) => {console.log("axios get error: ", err)});
  }, [])

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Announcement />
      </Grid>
      <Grid item xs={7}>
        <Images selectedStyle={selectedStyle}/>
      </Grid>
      <Grid container className={classes.details} item xs={4}>
        <Grid item xs={12} className={classes.reviews}>
          <Reviews productId={productId} ratings={ratings}/>
        </Grid>
        <Grid item xs={12}>
          <Name currentProduct={currentProduct}/>
        </Grid>
        <Grid item xs={12}>
          <StyleSelector styles={styles} selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle}/>
        </Grid>
        <Grid item xs={12} style={{background:randomColor()}}>
          <AddToBag />
        </Grid>
        <Grid item xs={12} style={{background:randomColor()}}>
          <Share />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={7}>
          <div className={classes.description}>
            <Description currentProduct={currentProduct} />
          </div>
        </Grid>
        <Grid item xs={5}>
          <Details currentProduct={currentProduct}/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App;