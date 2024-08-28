import axios from 'axios';

const getProductsByCategoryOrBrand = async (categoryName, brandName) => {
  return await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/products?category=${categoryName}&brand=${brandName}`
  );
};

export async function loader({ request, params }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/product/${params.productId}`,
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
    const similarProds = await getProductsByCategoryOrBrand(
      '',
      response.data.product.brand.brandName
    );

    return {
      product: response.data.product,
      similarProds: similarProds.data.products.filter((product) => {
        return product._id !== response.data.product._id;
      }),
    };
  } catch (err) {
    console.log(err);
  }
}
