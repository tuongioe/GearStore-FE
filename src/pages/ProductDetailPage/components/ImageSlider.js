import React, { useState } from 'react';

const ImageSlider = ({ imagesArray }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageIsShowed, setImageIsShowed] = useState(imagesArray[0]);
  const handleSlideForward = () => {
    setCurrentSlide((prevSlide) => prevSlide + 3);
    console.log(currentSlide);
  };

  const handleSlideBackward = () => {
    setCurrentSlide((prevSlide) => prevSlide - 3);
  };

  const handleImageShow = (image) => {
    setImageIsShowed(image);
  };

  return (
    <>
      <div className="w-full h-[472px] lg:h-full">
        <div className="border-[3px] w-[full] h-[full] border-solid border-[rgb(235,235,240)] rounded-xl overflow-hidden">
          <img
            src={imageIsShowed}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="relative grid grid-cols-6 md:grid-cols-6 mx-auto gap-[8px] w-full h-[60px] sm:h-[50px] ">
        {imagesArray.length > 6 && (
          <button
            className={`w-[36px] h-[36px] flex items-center justify-center absolute left-[10px] top-[50%] translate-y-[-50%] rounded-full bg-white drop-shadow-[0px_2px_8px_rgba(0,0,0,0.2)] cursor-pointer ${
              currentSlide + 6 >= imagesArray.length ? '' : 'hidden'
            }`}
            onClick={handleSlideBackward}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0899 14.5899C11.7645 14.9153 11.2368 14.9153 10.9114 14.5899L5.91139 9.58991C5.58596 9.26447 5.58596 8.73683 5.91139 8.4114L10.9114 3.41139C11.2368 3.08596 11.7645 3.08596 12.0899 3.41139C12.4153 3.73683 12.4153 4.26447 12.0899 4.58991L7.67916 9.00065L12.0899 13.4114C12.4153 13.7368 12.4153 14.2645 12.0899 14.5899Z"
                fill="#0A68FF"
              ></path>
            </svg>
          </button>
        )}
        {imagesArray.slice(currentSlide, currentSlide + 6).map((image) => {
          return (
            <div
              key={image}
              className={`cols-span-1 w-[60px] mx-auto h-[60px] sm:w-[50px] sm:h-[50px] border-[3px] border-solid  rounded-md overflow-hidden cursor-pointer ${
                image === imageIsShowed
                  ? 'border-[#0071dc]'
                  : 'border-[rgb(235,235,240)]'
              }`}
              onClick={() => {
                handleImageShow(image);
              }}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          );
        })}

        {imagesArray.length > 6 && (
          <button
            className={`w-[36px] h-[36px] flex items-center justify-center absolute right-[10px] top-[50%] translate-y-[-50%] rounded-full bg-white drop-shadow-[0px_2px_8px_rgba(0,0,0,0.2)] cursor-pointer ${
              currentSlide + 6 >= imagesArray.length ? 'hidden' : ''
            }`}
            onClick={handleSlideForward}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.91107 3.41107C6.23651 3.08563 6.76414 3.08563 7.08958 3.41107L12.0896 8.41107C12.415 8.73651 12.415 9.26415 12.0896 9.58958L7.08958 14.5896C6.76414 14.915 6.23651 14.915 5.91107 14.5896C5.58563 14.2641 5.58563 13.7365 5.91107 13.4111L10.3218 9.00033L5.91107 4.58958C5.58563 4.26414 5.58563 3.73651 5.91107 3.41107Z"
                fill="#0A68FF"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default ImageSlider;
