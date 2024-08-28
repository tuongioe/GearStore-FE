import getAuthToken from '../../../../../../services/getToken';
import axios from 'axios';
export const loader = async ({ request, params }) => {
  const token = getAuthToken();
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/orders`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.status === 200) {
      const error = new Error('Invalid URL');
      error.code = response.status;
      error.info = response.data;
      throw error;
    }
    console.log(response.data.orders);

    return {
      orders: response.data.orders,
    };
  } catch (e) {
    console.log(e);
  }
};
