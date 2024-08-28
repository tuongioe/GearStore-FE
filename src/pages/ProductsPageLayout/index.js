import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const ProductsPageLayout = () => {
  let { categoryName } = useParams();
  const brands = useLoaderData();
  return (
    <>
      <Helmet>
        <title>{categoryName}</title>
      </Helmet>
      <div className="container flex gap-[30px] pt-[30px] pb-[100px] md:flex-col md:gap-[20px] ">
        <Sidebar brands={brands} />
        <Outlet />
      </div>
    </>
  );
};

export default ProductsPageLayout;
