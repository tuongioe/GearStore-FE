import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const PaymentSuccess = () => {
  return (
    <div className="container mt-[200px] flex items-center">
      <div className="mx-auto">
        <div className="flex flex-col items-center justify-center gap-[20px]">
          <div className="w-[100px] h-[100px]">
            <img src="/image/success.png" alt="" />
          </div>
          <span className="text-5xl font-medium">Payment Successful</span>
        </div>
        <div className="flex gap-[20px]">
          <Link
            to={ROUTES.HOME}
            className="inline-block mt-[30px] p-[20px] rounded-[10px] text-2xl font-medium bg-[#2dc9af40] "
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile/orders"
            className="inline-block mt-[30px] p-[20px] rounded-[10px] text-2xl font-medium bg-active-sidebar"
          >
            Your orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
