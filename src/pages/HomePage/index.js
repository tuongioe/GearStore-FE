import React from 'react';
import MenuCard from './components/MenuCard';
import ItemCard from '../../components/ItemCard';
import { Link, useLoaderData } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplaySpeed: 2000,
  };
  const { keyboardProds, mouseProds, headphoneProds } = useLoaderData();

  return (
    <>
      <Helmet>
        <title>SaigonGear Store</title>
      </Helmet>
      <div className="container  py-[40px]">
        <div className="slider-container">
          <Slider {...settings}>
            <div>
              <img
                src="/image/banner-1.png"
                alt=""
                className="h-[455px] sm:h-full w-full object-fill rounded-[30px] overflow-hidden"
              />
            </div>
            <div>
              <img
                src="/image/banner-2.png"
                alt=""
                className="h-[455px] sm:h-full w-full object-fill rounded-[20px] overflow-hidden"
              />
            </div>
            <div>
              <img
                src="/image/banner-3.jpg"
                alt=""
                className="h-[455px] sm:h-full w-full object-fill rounded-[20px] overflow-hidden"
              />
            </div>
          </Slider>
        </div>
        <section className="flex flex-col gap-[40px] mt-[40px]">
          <div>
            <h2 className="text-4xl font-bold mb-[20px]">
              <a href="">Browse</a>
            </h2>
            <ul className="w-full grid grid-cols-3 gap-[51px] md:grid-cols-1 md:gap-[20px]">
              <li>
                <Link to="./keyboard">
                  <MenuCard img="/image/keyboard.png" title="Keyboard" />
                </Link>
              </li>
              <li>
                <Link to="./mouse">
                  <MenuCard img="./image/mouse.png" title="Mouse" />
                </Link>
              </li>
              <li>
                <Link to="./headphone">
                  <MenuCard img="./image/headphone.png" title="Headphone" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex justify-between items-center mb-[20px]">
              <h2 className="text-4xl font-bold ">Keyboard</h2>
              <Link
                to="./keyboard"
                className="text-[#539bea] font-medium pr-[25px]"
              >
                More...
              </Link>
            </div>
            <ul className="w-full grid grid-cols-4 gap-[30px] md:grid-cols-2 sm:grid-cols-1 md:gap-[20px] ">
              {keyboardProds.map((prod) => (
                <ItemCard
                  key={prod._id}
                  id={prod._id}
                  img={prod.images[0]}
                  title={prod.name}
                  price={(prod.price - (prod.sale / 100) * prod.price).toFixed(
                    2
                  )}
                  brand={prod.brand.brandName}
                />
              ))}
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-center mb-[20px]">
              <h2 className="text-4xl font-bold ">Mouse</h2>
              <Link
                to="./mouse"
                className="text-[#539bea] font-medium pr-[25px]"
              >
                More...
              </Link>
            </div>
            <ul className="w-full grid grid-cols-4 gap-[30px] md:grid-cols-2 sm:grid-cols-1 md:gap-[20px] ">
              {mouseProds.map((prod) => (
                <ItemCard
                  key={prod._id}
                  id={prod._id}
                  img={prod.images[0]}
                  title={prod.name}
                  price={prod.price}
                  brand={prod.brand.brandName}
                />
              ))}
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-center mb-[20px]">
              <h2 className="text-4xl font-bold ">Headphone</h2>
              <Link
                to="./headphone"
                className="text-[#539bea] font-medium pr-[25px]"
              >
                More...
              </Link>
            </div>
            <ul className="w-full grid grid-cols-4 gap-[30px] md:grid-cols-2 sm:grid-cols-1 md:gap-[20px] ">
              {headphoneProds.map((prod) => (
                <ItemCard
                  key={prod._id}
                  id={prod._id}
                  img={prod.images[0]}
                  title={prod.name}
                  price={prod.price}
                  brand={prod.brand.brandName}
                />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
