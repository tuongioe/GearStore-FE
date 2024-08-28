import { React, useState, useEffect } from 'react';
import ImageSlider from './components/ImageSlider';
import { useLoaderData } from 'react-router-dom';
import ItemCard from '../../components/ItemCard';
import { addToCart } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import getAuthToken from '../../services/getToken';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import MessagePopUp from '../../components/MessagePopUp';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ProductDetail = () => {
  const token = getAuthToken();
  const [messageIsShowed, setMessageIsShowed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { product, similarProds } = useLoaderData();

  const location = useLocation();

  const addToCartHandler = () => {
    const productData = { ...product, quantity: quantity };
    if (!token) {
      navigate(ROUTES.LOGIN);
    }
    dispatch(addToCart(productData));
    setMessageIsShowed(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessageIsShowed(false);
    }, 700);
    return () => clearTimeout(timeout);
  }, [messageIsShowed]);

  useEffect(() => {
    setQuantity(1);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className="container pt-[30px] ">
        <div className="relative grid grid-cols-12 lg:flex lg:flex-col gap-[30px]">
          <MessagePopUp
            message="Product successfully added to your shopping cart"
            isShowed={messageIsShowed}
          />
          <figure className="col-span-4 flex flex-col items-center gap-[20px] overflow-hidden">
            <ImageSlider key={product._id} imagesArray={product.images} />
          </figure>
          <section className="col-span-8 bg-white dark:bg-dark-header-bg p-[60px] md:p-[16px]">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-medium">{product.name}</h1>
              <Link
                to={`/${product.category.categoryName}/${product.brand.brandName}`}
              >
                <button className="border-solid border-[1px] border-top-menu-border w-[100px] p-[10px] rounded-xl bg-body-bg dark:bg-dark-body-bg  hover:drop-shadow-[0_0_2px_rgba(0,0,0,0.12)]">
                  <img
                    src={product.brand.logoImage}
                    alt=""
                    className="w-full"
                  />
                </button>
              </Link>
            </div>
            <div className="flex gap-[60px] mt-[30px] sm:flex-col">
              <ul className="flex flex-col gap-[27px] grow">
                <li className="flex gap-x-[20px]">
                  <img src="/icon/cart.svg" alt="" className="icon" />
                  <span>
                    <p className="text-2xl font-medium">Delivery</p>
                    <p className=" ">From $6 for 1-3 days</p>
                  </span>
                </li>
                <li className="flex gap-[20px]">
                  <img src="/icon/bag.svg" alt="" className="icon" />
                  <span>
                    <p className="text-2xl font-medium">Pickup</p>
                    <p>Out of 2 store, today</p>
                  </span>
                </li>
              </ul>
              <div className="p-[20px] border-[2px] border-solid border-[#B9BABE] rounded-md mx-auto">
                <span className="flex items-center gap-[10px]">
                  <p className="text-2xl font-medium">${product.price}</p>
                  <p className="text-2xl text-[#67B044] py-[2px] px-[8px] bg-[#e0eeda]">
                    {product.sale}%
                  </p>
                </span>
                <p className="text-4xl font-medium mt-[20px]">
                  $
                  {(
                    product.price -
                    (product.sale / 100) * product.price
                  ).toFixed(2)}
                </p>
                <div className="mt-[20px] flex sm:flex-col gap-[20px]">
                  <div
                    key={product._id}
                    className="flex justify-between items-center gap-[10px] px-[20px] py-[10px] border-solid border-[3px] border-top-menu-border rounded-[10px] dark:border-dark-profile-text"
                  >
                    <button
                      className="w-[40px] h-[40px]"
                      onClick={() => setQuantity((prev) => prev - 1)}
                    >
                      <img
                        src="/icon/miner.svg"
                        alt=""
                        className="dark-icon w-full h-full"
                      />
                    </button>
                    <span className="font-medium text-center text-4xl w-[30px]">
                      {quantity}
                    </span>
                    <button
                      className="w-[40px] h-[40px]"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      <img
                        src="/icon/plus.svg"
                        alt=""
                        className="dark-icon w-full h-full"
                      />
                    </button>
                  </div>
                  <button
                    onClick={addToCartHandler}
                    className="text-3xl font-medium rounded-md bg-active-sidebar px-[50px] py-[10px] max-w-[300px] text-white hover:shadow-2xl"
                  >
                    {token ? 'Add to cart' : 'You have to login'}
                  </button>
                  {/* <button className="border-[1px] border-solid border-[#B9BABE] p-[11px] rounded-md">
                  <img src="/icon/heart.svg" alt="" className="icon" />
                </button> */}
                </div>
              </div>
            </div>
            <div className="mt-[30px]">
              <h2 className="text-3xl font-medium">Description</h2>
              <p className="mt-[20px] text-2xl">{product.description}</p>
            </div>
          </section>
        </div>
        <h2 className="mt-[50px] text-5xl font-bold">Similar Items</h2>
        <div className="mt-[30px] mb-[100px] grid grid-cols-4 sm:grid-cols-2  gap-[20px]">
          {similarProds.map((product) => (
            <ItemCard
              key={product._id}
              id={product._id}
              isLiked={false}
              img={product.images[0]}
              title={product.name}
              price={product.price}
              stars=""
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
