import React from 'react';
import { useDispatch } from 'react-redux';
import {
  incrementInCart,
  decrementInCart,
  removeFromCart,
} from '../../redux/cartSlice';
const CardItem = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <li className="flex gap-[30px] items-center mb-[10px]">
        <figure className="w-[175px] h-[175px] sm:w-[60px] sm:h-[60px] bg-[#fff] rounded-xl">
          <img
            src={product.images[0]}
            alt=""
            className="w-full h-full object-contain rounded-lg  overflow-hidden "
          />
        </figure>
        <section className="w-full flex flex-col gap-[16px]">
          <div className="flex justify-between shrink-0 sm:flex-col sm:gap-[10px] ">
            <h2 className="w-[374px] text-3xl font-medium sm:text-xl sm:w-full ">
              {product.name}
            </h2>
            <p className="text-4xl font-bold">
              $
              {(product.price - (product.sale / 100) * product.price).toFixed(
                2
              )}
            </p>
          </div>
          <div className="text-checkout-text font-medium">
            ${product.price.toFixed(2)} |{' '}
            <span className="text-[#67B044]">In Stock</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="select-none flex items-center gap-[10px] px-[20px] py-[10px] border-solid border-[1px] border-top-menu-border rounded-[10px] dark:border-dark-profile-text">
              <button
                className="w-[20px] h-[20px]"
                onClick={() => {
                  dispatch(decrementInCart(product._id));
                }}
              >
                <img
                  src="/icon/miner.svg"
                  alt=""
                  className="dark-icon w-full h-full"
                />
              </button>
              <span className="font-medium text-2xl text-center w-[20px]">
                {product.quantity}
              </span>
              <button
                className="w-[20px] h-[20px]"
                onClick={() => {
                  dispatch(incrementInCart(product._id));
                }}
              >
                <img
                  src="/icon/plus.svg"
                  alt=""
                  className="dark-icon w-full h-full"
                />
              </button>
            </div>
            <button
              className="flex gap-[10px]"
              onClick={() => {
                dispatch(removeFromCart(product._id));
              }}
            >
              <img
                src="/icon/trash-can.svg"
                alt=""
                className="dark-icon w-[20px] h-[20px]"
              />
              <p>Delete</p>
            </button>
          </div>
        </section>
      </li>
    </div>
  );
};

export default CardItem;
