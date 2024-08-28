import axios from 'axios';
import { redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useDispatch } from 'react-redux';
export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.status === 200) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = response.data;
      throw error;
    }

    const resData = response.data;
    localStorage.setItem('token', resData.token);
    window.location.reload();
    return redirect(ROUTES.HOME);
  } catch (error) {
    return error.response.data.message;
  }
}
