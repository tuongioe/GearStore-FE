import axios from 'axios';
export async function loader({ request, params }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/categories/${params.categoryName}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!response.status === 200) {
      const error = new Error('Invalid URL');
      error.code = response.status;
      error.info = response.data;
      throw error;
    }
    return response.data.brands[0];
  } catch (err) {
    console.log(err);
  }
}
