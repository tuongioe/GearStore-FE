import axios from 'axios';
import getCart from '../../services/cartService';
import { redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
export async function loader({ request, params }) {
  try {
    const response = await getCart();
    if (response.data.cart.products.length === 0) {
      return redirect(ROUTES.CART);
    }
    return response;
  } catch (err) {}
}
