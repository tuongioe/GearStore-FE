import axios from 'axios';

const getProductsByCategory = async (categoryName, brandName) => {
  return await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/products/${categoryName}?brand=${
      brandName ? brandName : ''
    }`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
export async function loader({ request, params }) {
  try {
    const response = await getProductsByCategory(
      params.categoryName,
      params.brandName
    );

    if (!response.status === 200) {
      const error = new Error('Invalid URL');
      error.code = response.status;
      error.info = response.data;
      throw error;
    }
    return response.data.products;
  } catch (err) {
    console.log(err);
  }
}
