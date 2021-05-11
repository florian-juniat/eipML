import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import Product from './Product/Product';
import useStyles from './styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link, useLocation } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';




const Products = ({ products, onAddToCart, token, setTotalItem }) => {
  const classes = useStyles();
  const history = useHistory();


  const [productt, setProduct] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)

  const [reco, setReco] = useState(true)
  const [search, setSearch] = useState("")

  if (!products.length) return <p>Loading...</p>;

  if (token == "") {
    history.push('/ecomm/signin')
    
  }

  const changeReco = () => {
    if (reco == true) {
      axios.get('https://back-ecommerce01.herokuapp.com/home/courses', {
      headers: {
        'Authorization': token
      }}).then(res => {
          setProduct(res.data.product)
          setTotalItem(res.data.basket)
      }).catch(function (error) {
        console.log("=======> problem get products")
      });
      setReco(false)
    } else {
      setReco(true)
      axios.get('https://back-ecommerce01.herokuapp.com/home/recommended', {
      headers: {
        'Authorization': token
      }}).then(res => {
          setProduct(res.data.product)
          setTotalItem(res.data.basket)
      }).catch(function (error) {
        console.log("=======> problem get products")
      });
    }
  }


    if (loadProduct == false && reco == true) {
      axios.get('https://back-ecommerce01.herokuapp.com/home/recommended', {
      headers: {
        'Authorization': token
      }}).then(res => {
          setProduct(res.data.product)
          setTotalItem(res.data.basket)
      }).catch(function (error) {
        console.log("=======> problem get products")
      });
      setLoadProduct(true)
    }

    if (loadProduct == false && reco == false) {
      axios.get('https://back-ecommerce01.herokuapp.com/home/courses', {
      headers: {
        'Authorization': token
      }}).then(res => {
          setProduct(res.data.product)
          setTotalItem(res.data.basket)
      }).catch(function (error) {
        console.log("=======> problem get products")
      });
      setLoadProduct(true)
    }
  

  return (
    <main className={classes.content} justify="center">
      <div className={classes.toolbar} justify="center" />
        <div className={classes.buttonContainer}>
            <div className={classes.submit}>
              <Button
                disabled={reco}
                variant="contained"
                color="primary"
                onClick={changeReco}
              >
                Recommended Catalogue
              </Button>
            </div>
            <div className={classes.submit}>
              <Button
                disabled={!reco}
                variant="contained"
                color="primary"
                onClick={changeReco}
              >
                Whole Catalogue
              </Button>
            </div>
            
          </div>
          <div className={classes.textContainer}>
            <TextField justify="center"
              value={search} onChange={(event) => setSearch(event.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Search"
              label="Search"
              className={classes.search}
              autoComplete="current-password"
            />
          </div>
          
      <Grid container justify="center" spacing={4}>

        {productt.map((product) =>  ((product.name.toLowerCase()).includes(search.toLowerCase()) || (product.description.toLowerCase()).includes(search.toLowerCase())) ? (
          <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
            <Product setTotalItem={setTotalItem} token={token} product={product} onAddToCart={onAddToCart} />
          </Grid>) : <div></div>
        )}
      </Grid>
    </main>
  );
};

export default Products;

