import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const AdminOrders = () => {
  const [toastShowing, setToastShowing] = useState(false);
  const orderData = useLoaderData();
  const [ordersList, setOrdersList] = useState(orderData);

  useEffect(() => {
    const TimeOut = setTimeout(() => {
      setToastShowing(false);
    }, 1000);
    return () => {
      clearTimeout(TimeOut);
    };
  }, [toastShowing]);
  return (
    <>
      <Helmet>
        <title>Admin | Orders</title>
      </Helmet>
      <Container>
        {toastShowing && (
          <Toast>
            <div className="toast active">
              <div className="toast-content">
                <div className="message">
                  <span className="text text-1">Success</span>
                  <span className="text text-2">
                    Confirmed the order successfully
                  </span>
                </div>
              </div>
              <div className="progress active"></div>
            </div>
          </Toast>
        )}
        {ordersList.length === 0 && (
          <NoProducts>
            <img src="/icon/no-order.png" alt="" />
            <span>There are no new orders</span>
          </NoProducts>
        )}
        {ordersList.length !== 0 && (
          <OrdersList>
            {ordersList.map((order) => (
              <OrdersItem key={order._id}>
                <button
                  onClick={async () => {
                    const response = await axios.put(
                      `${process.env.REACT_APP_SERVER_URL}/admin/order/${order._id}`
                    );
                    setToastShowing(true);
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                >
                  ACCEPT
                </button>
                <ProductList>
                  {order.products.map((product) => (
                    <ProductItem key={product.productId._id}>
                      <img src={`${product.productId.images[0]}`} alt="" />
                      <ProductInfo>
                        <span>{product.productId.name}</span>
                        <span>Quantity: {product.quantity}</span>
                      </ProductInfo>
                      <ProductPrice>
                        $
                        {(
                          (product.productId.price -
                            (product.productId.sale / 100) *
                              product.productId.price) *
                          product.quantity
                        ).toFixed(2)}
                      </ProductPrice>
                    </ProductItem>
                  ))}
                </ProductList>
                <OrderInfo>
                  <ReceiverInfo>
                    <span>{order.shipping.name}</span>
                    <span>Address: {order.shipping.address}</span>
                    <span>Phone: {order.shipping.phoneNumber}</span>
                  </ReceiverInfo>
                  <OrderPrice>Amount: ${order.amount.toFixed(2)}</OrderPrice>
                </OrderInfo>
              </OrdersItem>
            ))}
          </OrdersList>
        )}
      </Container>
    </>
  );
};

export default AdminOrders;

const Container = styled.div`
  grid-area: main;
  padding: 100px 20px;
  width: 80%;
  margin: 0 auto;
`;

const OrdersItem = styled.div`
  width: 100%;
  background: #fff;
  margin-bottom: 20px;
  padding: 20px 20px;
  border-radius: 5px;
  button {
    cursor: pointer;
    display: block;
    border: none;
    padding: 10px;
    border-radius: 5px;
    background-color: #2dc9af;
    color: #fff;
    font-weight: 600;
    margin-left: auto;
  }
`;

const OrdersList = styled.div`
  width: 100%;
  height: auto;
  font-size: 14px;
  height: 500px;
  border: 5px solid rgba(0, 0, 0, 0.09);
  overflow: scroll;
  padding: 20px;
`;

const ProductList = styled.div``;

const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
  border-bottom: 1px solid rgb(235, 235, 240);
  padding: 20px 0;
  img {
    width: 80px;
    height: 80px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductPrice = styled.span`
  text-align: right;
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ReceiverInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  span:first-child {
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const OrderPrice = styled.div`
  font-size: 18px;
  font-weight: 500;
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
  margin-top: 90px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
  img {
    margin-bottom: 20px;
    width: 200px;
    height: 200px;
  }
  span {
    font-size: 20px;
    font-weight: 600;
  }
`;
