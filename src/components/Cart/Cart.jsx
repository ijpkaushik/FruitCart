import { Container, Grid, Typography, Button } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();
    console.log(cart);

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your Shopping Cart,
            <Link to='/' className={classes.link}>  start adding some! </Link>
        </Typography>
    )
    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((cartItem) => (
                    <Grid item key={cartItem.id} xs={12} sm={6} md={4} lg={3}>
                        {<CartItem
                            item={cartItem}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />}
                    </Grid>
                ))}

            </Grid>
            <div className={classes.carDetails}>
                <Typography variant="h4" gutterBottom className={classes.subtotal}>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" color="secondary" type="button" variant="contained" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" color="primary" type="button" variant="contained">Checkout</Button>
                </div>
            </div>
        </>
    )

    if (!cart.line_items) return 'Loading...'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
