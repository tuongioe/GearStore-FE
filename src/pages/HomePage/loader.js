import axios from 'axios';
const getProductsByCategoryOrBrand = async (categoryName, brandName) => {
  return await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/products?category=${categoryName}&brand=${brandName}`
  );
};
export async function loader({ request, params }) {
  try {
    const keyboardResponse = await getProductsByCategoryOrBrand('keyboard', '');
    const mouseResponse = await getProductsByCategoryOrBrand('mouse', '');
    const headphoneResponse = await getProductsByCategoryOrBrand(
      'headphone',
      ''
    );
    return {
      keyboardProds: keyboardResponse.data.products,
      mouseProds: mouseResponse.data.products,
      headphoneProds: headphoneResponse.data.products,
    };
  } catch (err) {
    console.log(err);
  }
}
