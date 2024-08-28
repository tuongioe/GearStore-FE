import React from 'react';

const Dropdown = () => {
  return (
    <div className="hidden absolute lg:relative  group-hover:block container pt-[54px] left-0 top-[72px] lg:pt-0 lg:top-0 z-30">
      <div className="relative p-[30px] lg:p-0 max-h-[582px] rounded-[20px] shadow-[0px_40px_90px_20px_rgba(200,200,200,0.40)] bg-dropdown dark:bg-dark-dropdown-bg dark:shadow-[0px_40px_90px_20px_rgba(23,28,40,0.40)] lg:bg-transparent lg:shadow-none lg:dark:shadow-none lg:rounded-none">
        <img
          src="/icon/arrow-top.svg"
          alt=""
          className="dropdown-arrow absolute top-[-10px] left-[550px] lg:hidden"
        />
        <ul className="grid grid-cols-3 lg:grid-cols-1 lg:gap-10">
          <li className="flex gap-[14px]">
            <img
              src="/icon/laptop.svg"
              alt=""
              className="icon w-[30px] h-[30px] items-start"
            />

            <ul className="flex flex-col gap-[14px] text-2xl font-normal">
              <h2 className="text-[1.6rem] font-bold">
                <a href="#!">Laptop</a>
              </h2>
              <li>
                <a href="#!" className="hover:text-[#0071dc] hover:font-medium">
                  Cà Phê Máy
                </a>
              </li>
              <li>
                <a href="#!" className="hover:text-[#0071dc] hover:font-medium">
                  Cà Phê Việt Nam
                </a>
              </li>
              <li>
                <a href="#!" className="hover:text-[#0071dc] hover:font-medium">
                  Cold Brew
                </a>
              </li>
            </ul>
          </li>

          <li className="flex gap-[14px]">
            <img
              src="/icon/smartphone.svg"
              alt=""
              className="icon w-[30px] h-[30px] items-start"
            />

            <ul className="flex flex-col gap-[14px] text-2xl font-normal">
              <h2 className="text-[1.6rem] font-bold">
                <a href="#!">Phone</a>
              </h2>
              <li>
                <a href="#!" className="hover:text-[#0071dc] hover:font-medium">
                  Trà trái cây
                </a>
              </li>
              <li>
                <a href="#!" className="hover:text-[#0071dc] hover:font-medium">
                  Trà sữa Macchiato
                </a>
              </li>
            </ul>
          </li>

          <li className="flex gap-[14px]">
            <img
              src="/icon/tablet.svg"
              alt=""
              className="icon w-[30px] h-[30px] items-start"
            />

            <ul className="flex flex-col gap-[14px] text-2xl font-normal">
              <h2 className="text-[1.6rem] font-bold">
                <a href="#!">Tablet</a>
              </h2>
              <li>
                <a href="#!" className="hover:text-[#0071dc] hover:font-medium">
                  Trà trái cây
                </a>
              </li>
              <li>
                <a href="#!" className="hover:text-[#0071dc] hover:font-medium">
                  Trà sữa Macchiato
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
