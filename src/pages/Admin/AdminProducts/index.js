import React, { useState, useEffect } from 'react';
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const AdminProducts = () => {
  const navigate = useNavigate();
  const productsData = useLoaderData();

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('65f59122fcf40c7182070655');
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState('keyboard');
  const [oldprice, setOldprice] = useState(0);
  const [newprice, setNewprice] = useState(0);
  const [saleoff, setSaleoff] = useState(0);
  const [description, setDescription] = useState('');

  const [images, setImages] = useState('');
  const [formIsShow, setFormIsShow] = useState(false);
  const [isEdited, setIsEdited] = useState(null);
  const [products, setProducts] = useState(productsData);
  const [toastShowing, setToastShowing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchBrands() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/categories/${category}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setBrands(response.data.brands[0]);
    }
    fetchBrands();
  }, [category]);

  useEffect(() => {
    const TimeOut = setTimeout(() => {
      setToastShowing(false);
    }, 1000);
    return () => {
      clearTimeout(TimeOut);
    };
  }, [toastShowing]);

  const submitHandler = async (e) => {
    setFormIsShow(false);
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', title);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('price', oldprice);
    formData.append('saleoff', saleoff);
    formData.append('description', description);

    Array.from(images).forEach((img) => {
      formData.append('images', img);
    });

    if (isEdited) {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/admin/product/${isEdited._id}`,
        formData
      );
      setToastShowing(true);
      setMessage('Updated the product');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/product`,
        formData
      );
      setToastShowing(true);
      setMessage('Added a new product');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    setTitle('');
    setNewprice(0);
    setBrand('65f59122fcf40c7182070655');
    setOldprice(0);
    setDescription('');
    setCategory('keyboard');
    setSaleoff(0);
    setIsEdited(null);
    setImages('');
  };

  return (
    <>
      <Helmet>
        <title>Admin | Products</title>
      </Helmet>
      <Container>
        {toastShowing && (
          <Toast>
            <div className="toast active">
              <div className="toast-content">
                <div className="message">
                  <span className="text text-1">Success</span>
                  <span className="text text-2">{message} successfully</span>
                </div>
              </div>
              <div className="progress active"></div>
            </div>
          </Toast>
        )}
        {formIsShow && (
          <Backdrop>
            <AddForm onSubmit={submitHandler} encType="multipart/form-data">
              <InputBlock>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  placeholder="Enter name..."
                  id="name"
                  name="name"
                  value={title || ''}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </InputBlock>
              <InputBlock>
                <Label htmlFor="name">Category</Label>
                <select
                  id="category"
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue={category || 'keyboard'}
                >
                  <option value="keyboard">Keyboard</option>
                  <option value="mouse">Mouse</option>
                  <option value="headphone">Headphone</option>
                </select>
              </InputBlock>
              <InputBlock>
                <Label htmlFor="brand">Brand</Label>
                <select
                  id="brand"
                  name="brand"
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                  value={brand || isEdited.brand._id}
                >
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </InputBlock>
              <InputBlock>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  placeholder="Enter price..."
                  id="price"
                  name="price"
                  value={oldprice || ''}
                  onChange={(e) => {
                    setOldprice(e.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </InputBlock>
              <InputBlock>
                <Label htmlFor="saleoff">Discount</Label>
                <Input
                  type="number"
                  placeholder="Enter discount..."
                  id="saleoff"
                  name="saleoff"
                  value={saleoff || ''}
                  onChange={(e) => {
                    setSaleoff(e.target.value);
                  }}
                  autoComplete="off"
                />
              </InputBlock>
              <InputBlock>
                <Label htmlFor="newprice">Sale price</Label>
                <Input
                  type="number"
                  id="newprice"
                  name="newprice"
                  value={oldprice - oldprice * (saleoff / 100)}
                  autoComplete="off"
                  required
                  disabled
                />
              </InputBlock>
              <InputBlock>
                <Label htmlFor="description">Description</Label>
                <TextArea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter description..."
                  value={description || ''}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  autoComplete="off"
                />
              </InputBlock>
              <InputBlock>
                <Label htmlFor="image">Images</Label>
                <input
                  type="file"
                  multiple
                  id="images"
                  name="images"
                  accept="image/png, image/jpeg"
                  onChange={(event) => {
                    console.log(event.target.files);
                    setImages(event.target.files);
                  }}
                  className="w-[200px]"
                />
                <div className="grid grid-cols-5">
                  {images &&
                    Array.from(images).map((image) => (
                      <img
                        id="frame"
                        src={URL.createObjectURL(image)}
                        width="50px"
                        height="50px"
                      />
                    ))}
                </div>
              </InputBlock>
              <FormActions>
                <CancelButton
                  onClick={() => {
                    setFormIsShow(false);
                    setTitle('');
                    setNewprice('');
                    setOldprice('');
                    setSaleoff('');
                    setCategory('keyboard');
                    setDescription('');
                    setIsEdited(null);
                    setImages('');
                    setBrand('65f59122fcf40c7182070655');
                  }}
                  type="button"
                >
                  Cancel
                </CancelButton>
                <SubmitButton>Submit</SubmitButton>
              </FormActions>
            </AddForm>
          </Backdrop>
        )}

        <NewProductBtn onClick={() => setFormIsShow(true)}>
          <div className="flex justify-center gap-[10px]">
            <img
              src="/icon/add.svg"
              alt=""
              className="icon w-[24px] h-[24px]"
            />
            <span>Add new product</span>
          </div>
        </NewProductBtn>
        {products.length === 0 && (
          <NoProducts>
            <img src="/images/no-products.svg" alt="" />
            <span>No products</span>
          </NoProducts>
        )}
        {products.length !== 0 && (
          <ProductsList>
            {products.map((product) => (
              <ProductItem key={product._id}>
                <img src={`${product.images[0]}`} alt="" />
                <div>
                  <ProductTitle>{product.name}</ProductTitle>
                  <div className="flex justify-between w-[300px] mt-[20px]">
                    <div>
                      <p className="text-2xl font-medium">
                        Category:{' '}
                        <span className="font-normal capitalize">
                          {product.category.categoryName}
                        </span>
                      </p>
                      <p className="text-2xl font-medium mt-[10px] flex gap-[10px]">
                        Brand:{' '}
                        <img
                          src={product.brand.logoImage}
                          alt=""
                          className="w-[45px] h-[45px] object-contain"
                        />
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-2xl font-medium">
                        Price:{' '}
                        <span className="font-normal">${product.price}</span>
                      </p>
                      <p className="text-2xl font-medium mt-[10px]">
                        Discount:{' '}
                        <span className="font-normal">{product.sale}%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <Actions>
                  <button
                    onClick={() => {
                      setTitle(product.name);
                      setOldprice(product.price);
                      setBrand(product.brand._id);
                      setSaleoff(product.sale);
                      setCategory(product.category.categoryName);
                      setDescription(product.description);
                      setFormIsShow(true);
                      setIsEdited(product);
                    }}
                  >
                    <img
                      src="/icon/edit.svg"
                      alt=""
                      className="icon w-[24px] h-[24px]"
                    />
                  </button>
                </Actions>
              </ProductItem>
            ))}
          </ProductsList>
        )}
      </Container>
    </>
  );
};

export default AdminProducts;

const Container = styled.div`
  grid-area: main;
  padding: 100px 20px;
  width: 80%;
  margin: 0 auto;
`;

const ProductsList = styled.ul`
  list-style: none;
  width: 100%;
  height: 500px;
  border: 5px solid rgba(0, 0, 0, 0.09);
  overflow: scroll;
  padding: 20px;
`;

const TextArea = styled.textarea`
  width: 500px;
  height: 150px;
  padding: 4px 17px;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 0.25rem;
  resize: none;
`;

const ProductItem = styled.li`
  margin-bottom: 10px;
  border-radius: 20px;
  height: 150px;
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr 6fr 1fr;
  /* align-items: center; */
  background-color: #fff;
  img {
    width: 80px;
  }
`;

const ProductInfo = styled.div`
  display: flex;

  font-size: 14px;
`;

const ProductTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

const ProductPrice = styled.span``;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    cursor: pointer;
    border: none;
    background: transparent;
  }
  button:first-child {
    width: 35px;
    height: 35px;
  }
`;

const ProductAuthor = styled.span``;

const ProductOldPrice = styled.span``;

const ProductSaleOff = styled.span``;

const NewProductBtn = styled.button`
  display: block;
  width: 200px;
  height: 40px;

  border-radius: 999px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  color: #000;
  background-color: #2dc9af;
  border: none;
  margin-left: auto;

  column-gap: 10px;
`;

const AddForm = styled.form`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 500px;
  height: 30px;
  padding: 4px 17px;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 0.25rem;
`;
const Label = styled.label`
  font-size: 14px;
  color: #333333;
  width: 150px;
  padding: 4px;
  margin-bottom: 5px;
  text-align: left;
  font-weight: 500;
`;
const InputBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 8px 0;
  margin-bottom: 10px;
  position: relative;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 40px;
  background-color: #2dc9af;
  color: #fff;
  font-weight: 600;
  border-radius: 999px;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;

const CancelButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 40px;
  background-color: #ddd;
  color: #333;
  font-weight: 600;
  border-radius: 999px;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 40px;
`;

const Toast = styled.div`
  .toast {
    position: absolute;
    top: 10px;
    right: 30px;
    border-radius: 12px;
    color: #3c763d;
    background-color: #dff0d8;
    padding: 20px 35px 20px 25px;
    box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
  }

  .toast.active {
    transform: translateX(0%);
  }

  .toast .toast-content {
    display: flex;
    align-items: center;
  }

  .toast-content .check {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    min-width: 35px;
    background-color: #4070f4;
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
  }

  .toast-content .message {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
  }

  .message .text {
    font-size: 16px;
    font-weight: 400;
    color: #666666;
  }

  .message .text.text-1 {
    font-weight: 600;
    color: #333;
  }

  .toast .close {
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
  }

  .toast .close:hover {
    opacity: 1;
  }

  .toast .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
  }

  .toast .progress:before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #3c763d;
  }

  .progress.active:before {
    animation: progress 1s linear forwards;
  }

  @keyframes progress {
    100% {
      right: 100%;
    }
  }
`;

const NoProducts = styled.div`
  margin-top: 50px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
  img {
    width: 150px;
    height: 150px;
  }
  span {
    font-size: 20px;
    font-weight: 600;
  }
`;
