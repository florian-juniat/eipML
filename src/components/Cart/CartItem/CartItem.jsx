import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';
import axios from 'axios';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart, token , refresh, setTotalItem, totalItem}) => {
  const classes = useStyles();

  const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => {
    axios.post('https://back-ecommerce01.herokuapp.com/home/removeToBasket', {idItem: item.id
      }, {
          headers: {
            'Authorization': token
      }}).then(res => {
        setTotalItem(totalItem - 1)
        refresh()
      }).catch(function (error) {
        });
  }

  /*
  <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
          */

  return (
    <Card className="cart-item">
      <CardMedia image={item.picture} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h5">${item.price}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
