import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ id, img, title, price, brand }) => {
  return (
    <Link to={`/product/${id}`}>
      <section className=" p-[30px] sm:p-[10px] rounded-[20px] bg-item-card dark:bg-dark-item-card shadow-[0px_20px_60px_10px_rgba(237,237,246,0.20)] dark:shadow-[0px_20px_60px_10px_rgba(0,0,0,0.20)]">
        <div className="relative mx-auto  dark:bg-white rounded-[20px] overflow-hidden">
          <img src={img} alt="" className="object-cover w-full h-full" />
        </div>
        <h2 className="text-2xl font-medium mt-[16px] line-clamp-1">{title}</h2>
        <div className="flex justify-between mt-[16px] text-2xl font-medium">
          <p className="capitalize text-2xl font-normal text-[#9E9DA8]">
            {brand}
          </p>
          <p>${price}</p>
        </div>
      </section>
    </Link>
  );
};

export default ItemCard;
