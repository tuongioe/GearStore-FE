import React, { useEffect } from 'react';

import ReactCreditCards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../../../redux/userSlice';

const ProfileRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <section className="col-span-8  rounded-[20px] p-[30px] bg-top-act-group dark:bg-dark-header-bg">
      <h2 className="text-4xl font-bold mt-[30px]">Account info</h2>
      <p className="text-2xl mt-[4px] ">
        Addresses, contact information and password
      </p>
      <Link
        to="./edit-info"
        className="grid grid-cols-2 sm:grid-cols-1 gap-[20px] mt-[16px] "
      >
        <div className="p-[10px] bg-profile-card dark:bg-dark-profile-card flex items-center gap-[10px] rounded-[10px]">
          <div className="p-[15px] bg-white rounded-[8px] dark:bg-dark-item-card">
            <img src="/icon/mail.svg" alt="" className="dark-icon" />
          </div>
          <div>
            <p className="text-2xl font-medium">Email Address</p>
            <p className="text-xl mt-[6px]">{user.email}</p>
          </div>
        </div>
        <Link
          to="./edit-info"
          className="p-[10px] bg-profile-card dark:bg-dark-profile-card flex items-center gap-[10px] rounded-[10px]"
        >
          <div className="p-[15px] bg-white rounded-[8px] dark:bg-dark-item-card">
            <img src="/icon/phone.svg" alt="" className="dark-icon" />
          </div>
          <div>
            <p className="text-2xl font-medium">Phone number</p>
            {user.phoneNumber && (
              <p className="text-xl mt-[6px]">{user.phoneNumber}</p>
            )}
          </div>
        </Link>
        <Link
          to="./add-address"
          className="p-[10px] bg-profile-card dark:bg-dark-profile-card flex items-center gap-[10px] rounded-[10px]"
        >
          <div className="p-[15px] bg-white rounded-[8px] dark:bg-dark-item-card">
            <img src="/icon/address.svg" alt="" className="dark-icon" />
          </div>
          <div>
            <p className="text-2xl font-medium">Add an address</p>
            {user.address.length > 0 && (
              <p className="text-xl mt-[6px]">{user.address[0].address}</p>
            )}
          </div>
        </Link>
      </Link>
    </section>
  );
};

export default ProfileRight;
