import { Button, CircularProgress, CssBaseline, Divider, Link, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import useStyles from './syles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce';

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

    const [activeState, setActiveState] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState({});
    const classes = useStyles();
    const [shippingData, setShippingData] = useState({});
    const steps = ['Shipping Details', 'Payment Details'];
    const [isFinished, setIsFinished] = useState(false);

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 1500);
    }

    let Confirmation = () => order.customer
        ? (
            <>
                <div>
                    <Typography variant='="h5'>Thank You for your purchase, {order.customer.firstname} {order.customer.lastname} </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant='subtitle2'> Order Referance: {order.customer.reference}</Typography>
                    <br />
                    <Button variant='outlined' type='button'><Link href='/'>Back to Home</Link></Button>
                </div>
            </>
        ) : isFinished
            ? (
                <div>
                    <Typography variant='h5'>Thank You for your purchase.</Typography>
                    <Divider className={classes.divider} />
                    <br />
                    <Button variant='outlined' type='button'><Link href='/'>Back to Home</Link></Button>
                </div>
            )
            : (
                <div className={classes.spinner}>
                    <CircularProgress />
                </div >
            )

    if (error) {
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    }

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                setCheckoutToken(token)
                // console.log(token);
            } catch (error) {
                console.log('Generate Token Error: ' + error)
                // history.pushState('/')
            }
        }

        generateToken();
    }, [cart])

    const nextStep = () => setActiveState((previosActiveState) => previosActiveState + 1)
    const backStep = () => setActiveState((previosActiveState) => previosActiveState - 1)


    const next = (data) => {
        setShippingData(data);
        nextStep();
        // console.log(shippingData);
    }

    const Form = () => activeState === 0
        ? <AddressForm
            checkoutToken={checkoutToken}
            next={next} />
        : <PaymentForm
            shippingData={shippingData}
            checkoutToken={checkoutToken}
            backStep={backStep}
            nextStep={nextStep}
            onCaptureCheckout={onCaptureCheckout}
            timeout={timeout}
        />

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeState} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeState === steps.length ? <Confirmation /> : checkoutToken && <Form />
                    }
                </Paper>
            </main>
        </>
    )
}

export default Checkout
