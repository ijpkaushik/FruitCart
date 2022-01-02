import React from 'react'
import { ShoppingCart } from '@material-ui/icons'
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core'
import logo from '../../assets/cart.png'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

const Navbar = ({ totalItems }) => {

    const classes = useStyles();
    const location = useLocation();

    return (
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h5" color="inherit" className={classes.title}>
                    <img src={logo} alt="E-Commerce" height="40px" className={classes.image} />
                    <strong>Fruit Cart</strong>
                </Typography>
                <div className={classes.grow} />
                {location.pathname === '/' && 
                    (<div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart Items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>) 
                }

            </Toolbar>
        </AppBar >
    )
}

export default Navbar
