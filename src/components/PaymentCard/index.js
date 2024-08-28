import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './components/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import getAuthToken from '../../services/getToken';

function Payment() {
  const token = getAuthToken();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/checkout/config`)
      .then(async (r) => {
        const { publishableKey } = await r.json();

        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/checkout/create-payment-intent`,
      {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (result) => {
        var { clientSecret } = await result.json();

        setClientSecret(clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
