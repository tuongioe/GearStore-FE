import React from 'react';

const MenuCard = ({ title, img }) => {
  return (
    <section className="flex items-center gap-[20px] p-[20px] pr-[26px] bg-header-bg dark:bg-dark-header-bg rounded-[16px]">
      <div className="bg-menu-card dark:bg-dark-menu-card w-[116px] h-[116px] rounded-xl">
        <img src={img} alt="" className="w-full h-full object-contain" />
      </div>
      <h2 className="text-4xl font-bold text-center">{title}</h2>
    </section>
  );
};

export default MenuCard;
