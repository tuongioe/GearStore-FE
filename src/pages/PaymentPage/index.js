import React from 'react';
import { useEffect, useState } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import PaymentCard from '../../components/PaymentCard';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [address, setAddress] = useState();

  useEffect(() => {
    setAddress(user.address.find((address) => address._id === cart.address));
  }, [cart, user]);

  return (
    <>
      <Helmet>
        <title>Checkout | Payment</title>
      </Helmet>
      <div className="container pt-[10px]">
        <div className="flex text-checkout-text text-2xl font-medium gap-[20px] mt-[30px] rounded-[10px] bg-white p-[20px] dark:bg-dark-sidebar">
          <Link to={ROUTES.HOME}>Home</Link>
          <img src="/icon/arrow-right.svg" alt="" />
          <Link to={ROUTES.CART}>checkout</Link>
          <img src="/icon/arrow-right.svg" alt="" />
          <Link to={ROUTES.SHIPPING}>Shipping</Link>
          <img src="/icon/arrow-right.svg" alt="" />
          <p className="text-text dark:text-dark-text">Payment method</p>
        </div>
      </div>
      <div className="container grid grid-cols-11 xl:flex xl:flex-col my-[30px] gap-[30px] dark:text-checkout-text">
        <div className="col-span-8">
          <div className="p-[30px] rounded-[20px] bg-white dark:bg-dark-sidebar">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-medium">
                1. Shipping, arrives between Mon, May 16—Tue, May 24
              </h2>
              <Link to={ROUTES.SHIPPING}>
                <button className="flex gap-[10px] mt-auto mr-[15px]">
                  <img src="/icon/edit.svg" alt="" className="dark-icon" />
                  <span>Edit</span>
                </button>
              </Link>
            </div>
            <div className="my-[30px] bg-body-bg dark:bg-dark-body-bg p-[20px] rounded-[20px] flex justify-between items-center">
              {address && (
                <div>
                  <p className="text-2xl font-medium mb-[4px]">
                    {address.name}
                  </p>
                  <p className="text-2xl font-medium">
                    Address:{' '}
                    <span className="font-normal">{address.address}</span>
                  </p>
                  <p className="text-2xl font-medium">
                    Phone Number:{' '}
                    <span className="font-normal">{address.phoneNumber}</span>
                  </p>
                </div>
              )}
              <div className="w-[31px] h-[31px]">
                <img src="/icon/check.svg" alt="" className="w-full h-full" />
              </div>
            </div>
            <div className="my-[30px] bg-body-bg dark:bg-dark-body-bg p-[20px] rounded-[20px] flex justify-between items-center">
              <div>
                <p className="text-2xl font-medium mb-[4px]">Items details</p>
                <p>{cart.products.length} items</p>
              </div>
              <Link
                to={ROUTES.SHIPPING}
                className="underline underline-offset-5"
              >
                View details
              </Link>
            </div>
          </div>
          <div className="p-[30px] rounded-[20px] bg-white dark:bg-dark-sidebar mt-[30px]">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-medium">2. Shipping method</h2>
            </div>
            <div className="w-full h-[1px] my-[30px] bg-top-menu-border dark-bg-dark-body-bg"></div>
            <h3 className="text-2xl font-medium">Available Shipping method</h3>
            <div className="my-[30px] bg-body-bg dark:bg-dark-body-bg p-[20px] rounded-[20px] flex justify-between items-center">
              <div className="flex items-center gap-[20px]">
                <div className="w-[70px] h-[54px] rounded-[10px] overflow-hidden">
                  <img
                    src="/image/fedex.png"
                    alt=""
                    className="w-full h-full object-cover "
                  />
                </div>
                <div>
                  <p className="text-2xl font-medium mb-[4px]">
                    Fedex Delivery
                  </p>
                  <p>Delivery: now</p>
                </div>
              </div>
              <div className="flex gap-[14px] items-center">
                <p>Free</p>
                <div className="w-[19px] h-[19px]">
                  <img src="/icon/check.svg" alt="" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 p-[30px] rounded-[20px] bg-white dark:bg-dark-sidebar">
          <div className="flex justify-between text-2xl font-medium lg:text-3xl  ">
            <p>
              Subtotal <span className="font-normal">(items)</span>
            </p>
            <p>{cart.products.length}</p>
          </div>
          <div className="flex justify-between text-2xl font-medium mt-[10px] lg:text-3xl  ">
            <p>
              Price <span className="font-normal">(Total)</span>
            </p>
            <p>${cart.totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-2xl font-medium mt-[10px] lg:text-3xl  ">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="h-[1px] w-full dark:bg-[#B9BABE] bg-top-menu-border my-[20px]"></div>
          <div className="flex justify-between text-2xl font-medium lg:text-3xl ">
            <p>Estimated Total</p>
            <p>${cart.totalPrice.toFixed(2)}</p>
          </div>
          <div className="mt-[30px]">
            <PaymentCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
