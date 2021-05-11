import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart, PrintRounded } from '@material-ui/icons';

import useStyles from './styles';
import axios from 'axios';


const Product = ({ product, onAddToCart , token, setTotalItem}) => {
  const classes = useStyles();

  const handleAddToCart = () => {
    axios.post('https://back-ecommerce01.herokuapp.com/home/addToBasket', {idItem: product.id
      }, {
          headers: {
            'Authorization': token
      }}).then(res => {
        axios.get('https://back-ecommerce01.herokuapp.com/home/recommended', {
          headers: {
            'Authorization': token
          }}).then(res => {
              setTotalItem(res.data.basket)
          }).catch(function (error) {
          });
      }).catch(function (error) {
        });
  }

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.picture} title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            ${product.price}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;

