import React from 'react';
import Header from '../Layout/components/Header';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Helmet } from 'react-helmet';
const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <Header />
      <div className="my-[150px] flex flex-col items-center justify-center">
        <h1 className="text-[80px] font-bold">Oops</h1>
        <h2 className="text-5xl font-medium">You are lost</h2>
        <img src="/image/not-found.png" alt="" className="w-[500px] mx-auto" />
        <Link to={ROUTES.HOME} className="text-4xl mt-[30px] font-medium ">
          <div className="flex items-center border-black dark:border-white border-solid border-spacing-1 border-b-[1px]">
            <img
              src="/icon/back-arrow.svg"
              alt=""
              className="icon w-[35px] h-[35px] pb-3"
            />
            <p>Back home</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
