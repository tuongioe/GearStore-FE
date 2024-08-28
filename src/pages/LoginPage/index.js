import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Link, useLocation } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useSubmit, useActionData, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const LoginPage = () => {
  const submit = useSubmit();
  const [passwordIsShowed, setPasswordIsShowed] = useState(false);

  const err = useActionData();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    submit(data, {
      method: 'post',
      action: ROUTES.LOGIN,
    });
  };
  const showPassword = () => {
    setPasswordIsShowed((prevState) => !prevState);
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <main className="grid grid-cols-2 md:grid-cols-1 h-screen">
        <div className="bg-left-login dark:bg-dark-left-login md:hidden flex flex-col items-center  gap-[20px]">
          <div className="dark:bg-white rounded-full w-[300px] h-[300px] flex items-center justify-center mt-[50px]">
            <img src="/image/login-left.svg" alt="" className="" />
          </div>
          <h2 className="text-5xl font-bold">Irrelevant results again?</h2>
          <p className="text-login-text  text-2xl w-[300px] text-center mt-[20px]">
            No need to rummage through irrelevant items anymore, we got you
            covered. Habitual sends you relevant items based off of your habits
            and interests.
          </p>
        </div>
        <div className="bg-right-login dark:bg-dark-right-login w-full">
          <Form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col px-[130px] pt-[30px] gap-[50px] pb-[50px] sm:px-[10px]"
          >
            <div className="flex items-center justify-center gap-[14px]">
              <img
                src="/image/logo.png"
                alt=""
                className="w-[120px] h-[120px]"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <h1 className="text-4xl font-medium text-center">Login</h1>
              <p className="text-login-text text-2xl text-center">
                Welcome back to sign in. As a returning customer, you have
                access to your previously saved all information.
              </p>
            </div>
            {err && (
              <p className="text-2xl font-medium text-rose-900 mx-auto rounded-lg bg-[#ffdce0] border-solid border-[2px] border-[#e8cacf] w-full h-[50px] flex items-center justify-center">
                {err}
              </p>
            )}
            <div className="flex flex-col gap-[20px]">
              <div className="relative">
                <input
                  {...register('email', {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  type="text"
                  className="p-[12px] rounded-3xl text-2xl font-medium w-full border-[1px] border-solid border-login-text"
                  placeholder="Email"
                />
                <img
                  src="/icon/mail.svg"
                  alt=""
                  className="icon absolute right-[10px] top-[25%]"
                />
                {errors.email && (
                  <p className="absolute bottom-[-25px] text-2xl font-medium text-rose-900">
                    Invalid email
                  </p>
                )}
              </div>

              <div className="relative mt-[10px]">
                <input
                  {...register('password', { required: true, minLength: 6 })}
                  type={!passwordIsShowed ? 'password' : 'text'}
                  className="p-[12px] rounded-3xl text-2xl font-medium w-full border-[1px] border-solid border-login-text"
                  placeholder="Password"
                  autoComplete="off"
                />
                <img
                  src={
                    passwordIsShowed ? '/icon/closed-eye.svg' : '/icon/eye.svg'
                  }
                  alt=""
                  className="icon absolute w-[24px] h-[24px] right-[10px] top-[25%]"
                  onClick={showPassword}
                />
                {errors.password && (
                  <p className="absolute bottom-[-25px] text-2xl font-medium text-rose-900">
                    Invalid password
                  </p>
                )}
              </div>

              {/* <a href="#!" className="text-[#0071DC] text-right font-medium">
              Recovery Password
            </a> */}
            </div>

            <button
              type="submit"
              className="rounded-[10px] bg-active-sidebar text-text py-[12px] text-3xl font-medium hover:shadow-xl"
            >
              Login
            </button>

            <p className="font-normal text-2xl text-login-text text-center mt-[20px]">
              Don’t have an account yet?{' '}
              <Link to={ROUTES.SIGNUP} className="text-[#0071DC] font-medium ">
                Sign Up
              </Link>
            </p>
          </Form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
