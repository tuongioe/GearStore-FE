import { redirect } from 'react-router-dom';
import axios from 'axios';
import getAuthToken from '../../../../../../services/getToken';
export default async function action({ params, request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const token = getAuthToken();

  await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/user/edit-info/`,
    {
      userData: data,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return redirect('/profile');
}
