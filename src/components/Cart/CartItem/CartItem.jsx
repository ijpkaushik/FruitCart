import { Card, CardContent, CardMedia, CardActions, Typography, Button } from '@material-ui/core';
import React from 'react'
import useStyles from './styles'

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {

    const classes = useStyles();

    return (
        <Card>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.button}>
                    <Button size="small" type="button" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                    <Typography align='center' variant='h6'>{item.quantity}</Typography>
                    <Button size="small" type="button" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                </div>
                <Button color="secondary" type="button" variant="contained" onClick={() => handleRemoveFromCart(item.id)}>REMOVE</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
