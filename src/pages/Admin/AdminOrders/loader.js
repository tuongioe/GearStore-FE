import axios from 'axios';
import { getUserService } from '../../../services/userService';
import * as ROUTES from '../../../constants/routes';
import { redirect } from 'react-router-dom';
import getAuthToken from '../../../services/getToken';
export async function loader() {
  const token = getAuthToken();
  if (!token) {
    return redirect(ROUTES.HOME);
  }
  const res = await getUserService();
  const role = res.data.user.role;
  if (role != 'admin') {
    return redirect(ROUTES.HOME);
  }
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/admin/orders`
  );

  return response.data.orders;
}
