import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const SearchDropdown = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/products/search?searchTerm=${searchTerm}`
        );

        const fetchedProducts = response.data.products;
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="p-[20px] rounded-2xl w-[300px] absolute top-[120%] right-0 bg-dropdown dark:bg-dark-dropdown-bg shadow-2xl">
      {products.length === 0 && <p>Couldn't find any products.</p>}
      {products.length > 0 && (
        <ul>
          {products.map((product) => (
            <>
              <Link key={product._id} to={`/product/${product._id}`}>
                <li className="flex items-center gap-[20px]">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-[50px] h-[50px]"
                  />
                  <p>{product.name}</p>
                </li>
              </Link>
              <div className="w-full h-[1px] bg-login-text my-[10px]"></div>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
