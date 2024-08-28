import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import getAuthToken from '../../../services/getToken';
import { resetCart } from '../../../redux/cartSlice';

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const token = getAuthToken();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart);

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    const products = cart.products.map((product) => {
      return { productId: product._id, quantity: product.quantity };
    });
    const cartData = {
      address: cart.address,
      totalPrice: cart.totalPrice,
      products,
    };

    if (!error) {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/checkout/confirm-payment`,
        { cart: cartData },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(resetCart());
      return navigate('/checkout/complete');
    }

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      {/* Show any error or success messages */}
      {message && (
        <div
          id="payment-message"
          className="mt-[30px] text-[#df1b41] font-medium text-3xl"
        >
          {message}
        </div>
      )}
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="w-full mt-[20px] bg-active-sidebar p-[18px] rounded-[10px] text-3xl font-medium"
      >
        <span id="button-text">
          {isProcessing ? 'Processing ... ' : 'Pay now'}
        </span>
      </button>
    </form>
  );
}
