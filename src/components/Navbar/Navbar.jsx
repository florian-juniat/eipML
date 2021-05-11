import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/commerce.png';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';


const PrimarySearchAppBar = ({ totalItems, token }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const handleGoHome = () => {
    history.push('/ecomm')
  }

  const handleGoCart = () => {
    history.push('/ecomm/cart')
  }

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} onClick={handleGoCart} aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} onClick={handleGoHome} variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> e-Teaching
          </Typography>
          
          <div>
              
              </div>
          <div className={classes.grow} />
          {token != "" && (
          <div className={classes.button}>
            
            <IconButton component={Link} onClick={handleGoCart}  aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            
          </div>
          )}
          
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
