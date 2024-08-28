import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ItemCard from '../../../../components/ItemCard';
import Filter from './Filter';
import { useParams } from 'react-router-dom';

const ProductsMain = () => {
  const products = useLoaderData();
  const { categoryName } = useParams();

  const [filterIsShowed, setFilterIsShowed] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const updateMinPrice = (e) => {
    if (+e.target.value > +maxPrice) {
      return;
    }
    setMinPrice(e.target.value);
  };
  const updateMaxPrice = (e) => {
    if (+e.target.value < +minPrice) {
      return;
    }
    setMaxPrice(e.target.value);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center relative">
        <h2 className="text-4xl font-bold sm:text-3xl sm:font-medium capitalize">
          {categoryName}
        </h2>
        {/* <button
          className="flex items-center py-[6px] px-[12px] gap-[16px] rounded-[6px] bg-item-card dark:bg-dark-item-card "
          onClick={() => {
            setFilterIsShowed((prevState) => !prevState);
          }}
        >
          <span className="font-medium">Filter</span>
          <img src="/icon/filter.svg" alt="" className="icon" />
        </button> */}
        {/* {filterIsShowed && (
          <div className="absolute p-[30px] top-[66px] right-0 rounded-3xl bg-dropdown dark:bg-dark-dropdown-bg z-30 drop-shadow-xl lg:z-10 select-none">
            <h2 className="text-4xl font-medium">Filter</h2>
            <div className="grid grid-cols-2 mt-[30px] lg:grid-cols-1">
              <div className="flex flex-col pr-[30px] gap-[20px] lg:pr-0 lg:pb-[30px] border-r-solid border-r-[1px] border-[top-act-group-separate] dark:border-[dark-top-act-group-separate] lg:border-b-solid lg:border-b-[1px] lg:border-r-0">
                <h3 className="text-4xl font-medium ">Price</h3>
                <div className="flex items-center">
                  <Filter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    updateMinPrice={updateMinPrice}
                    updateMaxPrice={updateMaxPrice}
                  />
                </div>
                <div className="flex justify-between gap-[30px]">
                  <div>
                    <p>Minimum</p>
                    <p className="px-[12px] py-[8px] border-2 border-solid border-top-menu-border rounded-[6px] w-[121px]">
                      ${minPrice}
                    </p>
                  </div>
                  <div>
                    <p>Maximum</p>
                    <p className="px-[12px] py-[8px] border-2 border-solid border-top-menu-border rounded-[6px] w-[121px]">
                      ${maxPrice}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col pl-[30px] lg:p-0 gap-[30px] lg:pt-[30px] ">
                <h2 className="text-4xl font-medium">Sort</h2>
                <div className="flex flex-col gap-[30px]">
                  <div className="flex gap-[10px]">
                    <input
                      type="radio"
                      name="price"
                      id="asc"
                      value="asc"
                      className="w-[20px] h-[20px] "
                    />
                    <label
                      htmlFor="asc"
                      className="font-medium text-4xl cursor-pointer"
                    >
                      Ascending
                    </label>
                  </div>
                  <div className="flex gap-[10px]">
                    <input
                      type="radio"
                      name="price"
                      id="desc"
                      value="desc"
                      className="w-[20px] h-[20px]"
                    />
                    <label
                      htmlFor="desc"
                      className="font-medium text-4xl cursor-pointer"
                    >
                      Descending
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[18px] flex justify-end gap-[20px]">
              <button
                className="text-[#9E9DA8] cursor-pointer"
                onClick={() => {
                  setFilterIsShowed(false);
                }}
              >
                Cancel
              </button>
              <button className="px-[10px] py-[9px] bg-[#FFB700] rounded-[6px] dark:text-[#1a162e] cursor-pointer user">
                Show Result
              </button>
            </div>
          </div>
        )} */}
      </div>
      <ul className="mt-[30px] grid grid-cols-3 gap-[30px] md:grid-cols-2 sm:grid-cols-1">
        {products.map((product) => (
          <ItemCard
            key={product._id}
            id={product._id}
            img={product.images[0]}
            title={product.name}
            price={(
              product.price -
              (product.sale / 100) * product.price
            ).toFixed(2)}
            brand={product.brand.brandName}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductsMain;
