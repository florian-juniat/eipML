import React, {useState} from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';
import axios from 'axios';

import { loadStripe } from "@stripe/stripe-js";


const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart , token, setTotalItem, totalItem}) => {
  const classes = useStyles();
  const history = useHistory();

  const [loadProduct, setLoadProduct] = useState(false)
  const [productt, setProduct] = useState([])


  if (token == "") {
    history.push('/ecomm/signin')
  }


  if (loadProduct == false) {
    axios.get('https://back-ecommerce01.herokuapp.com/paiement/basket', {
    headers: {
      'Authorization': token
    }}).then(res => {
        setProduct(res.data)
    }).catch(function (error) {
      console.log("=======> problem get products")
    });
    setLoadProduct(true)
  }

  const refresh = () => {
    axios.get('https://back-ecommerce01.herokuapp.com/paiement/basket', {
    headers: {
      'Authorization': token
    }}).then(res => {
        setProduct(res.data)
    }).catch(function (error) {
    });
  }

  const handleEmptyCart = () => onEmptyCart();

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">You have no items in your shopping cart, 
        <Link>
              <a className={classes.astext} onClick={() => history.push('/ecomm/')} variant="body2">
                {"start adding some"}
              </a>
        </Link>!
    </Typography>
  );

  if (!loadProduct) return 'Loading';

  const calculatePrice = () => {
    var ret = 0
    productt.map(el => {
      ret = ret + el.price
    })
    return ret
  }

  const handleCheckout = () => {

    axios.post('https://back-ecommerce01.herokuapp.com/paiement/checkout', {product: productt
    }, {
        headers: {
          'Authorization': token
    }}).then(res => {
      const stripe = window.Stripe("pk_test_51IW08HH1tQZu8g0MReJAaUbqYR30vtIS3iQOHDE6WJzbToUm4n3sdRyGM7BcFbgEDuJbIXyiJlNweKFByDt3Qs0o00SSVE8rzy")

      if (stripe) {
          stripe.redirectToCheckout({ sessionId: res.data.id })
      }
    })
  }

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {productt.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem totalItem={totalItem} setTotalItem={setTotalItem} refresh={refresh} token={token} item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: ${calculatePrice()}</Typography>
        <div>
          <Button className={classes.checkoutButton} onClick={handleCheckout} size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
      { !productt.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;
