import { Button, Divider, Typography } from '@material-ui/core'
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import Review from './Review'

const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep, timeout }) => {

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    // console.log(stripePromise);
    
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

        // console.log("payment Method: ", paymentMethod);

        if (error) {
            console.log('orderdata error:' + error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email
                },
                shipping: {
                    name: shippingData.firstName + shippingData.lastName,
                    street: shippingData.address,
                    town_city: shippingData.city,
                    country_state: shippingData.shippingSubdivision,
                    postal_zipcode: shippingData.zipcode,
                    country: shippingData.shippingCountry
                },
                fulfillment: {
                    shipping_method: shippingData.shippingOption
                },
                billing: {
                    name: shippingData.firstName + shippingData.lastName,
                    street: shippingData.address,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zipcode,
                    country: shippingData.shippingCountry
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    }
                },
            }
            // console.log('Order Data:' + orderData);
            onCaptureCheckout(checkoutToken.id, orderData);
            timeout();
            nextStep();
        }
    }

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0px' }}>Payment Method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br /> <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant='outlined' onClick={backStep}>Back</Button>
                                <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                                    Pay: {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
