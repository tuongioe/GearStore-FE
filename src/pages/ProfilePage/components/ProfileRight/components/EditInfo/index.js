import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as ROUTES from '../../../../../../constants/routes';
import { Link } from 'react-router-dom';
import {
  useSubmit,
  useNavigation,
  useActionData,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../../../../redux/userSlice';

const EditInfo = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });
  const navigation = useNavigation();
  const submit = useSubmit();
  const data = useActionData();
  const text =
    navigation.state === 'submitting'
      ? 'Saving...'
      : navigation.state === 'loading'
      ? 'Saved!'
      : 'Save';

  const submitHandler = async (data) => {
    submit(data, { method: 'post' });
  };

  return (
    <section className="col-span-8 p-[30px] bg-profile-right dark:bg-dark-profile-right rounded-[20px]">
      <div className="flex items-center gap-[10px]">
        <Link to={ROUTES.PROFILE}>
          <img src="/icon/arrow-left.svg" alt="" className="dark-icon" />
        </Link>
        <h2 className="text-3xl font-medium">Personal info</h2>
      </div>
      <form onSubmit={handleSubmit(submitHandler)} className="mt-[30px]">
        <div className="grid grid-cols-2 gap-[30px] sm:grid-cols-1">
          <div className="flex flex-col gap-[20px] relative">
            <label htmlFor="name" className="text-3xl font-medium">
              Full name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="p-[12px] border-[1px] border-solid border-[#D2D1D6] rounded-[10px] placeholder:text-[#D2D1D6]"
              placeholder="Full name"
              {...register('name', { required: true })}
            />
            {errors.fullName && (
              <p className="absolute bottom-[-25px] text-2xl font-medium text-rose-900">
                Please enter your full name.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-[20px] relative">
            <label htmlFor="email" className="text-3xl font-medium">
              Email address
            </label>
            <input
              type="text"
              id="email"
              className="p-[12px] border-[1px] border-solid border-[#D2D1D6] rounded-[10px] placeholder:text-[#D2D1D6]"
              placeholder="Email"
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && (
              <p className="absolute bottom-[-25px] text-2xl font-medium text-rose-900">
                Invalid email.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-[20px] relative">
            <label htmlFor="phone" className="text-3xl font-medium">
              Phone number
            </label>
            <input
              type="text"
              id="phone"
              className="p-[12px] border-[1px] border-solid border-[#D2D1D6] rounded-[10px] placeholder:text-[#D2D1D6]"
              placeholder="Phone number"
              {...register('phoneNumber', {
                required: true,
                pattern:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,
              })}
            />
            {errors.phoneNumber && (
              <p className="absolute bottom-[-25px] text-2xl font-medium text-rose-900">
                Invalid phone number.
              </p>
            )}
          </div>
          {/* <div className="flex flex-col gap-[20px] relative">
            <label htmlFor="password" className="text-3xl font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="p-[12px] border-[1px] border-solid border-[#D2D1D6] rounded-[10px] placeholder:text-[#D2D1D6]"
              placeholder="Password"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p className="absolute bottom-[-25px] text-2xl font-medium text-rose-900">
                Invalid password.
              </p>
            )}
          </div> */}
        </div>
        <div className="mt-[30px] flex justify-end gap-[30px] items-center">
          <Link to={ROUTES.PROFILE} className="text-2xl font-medium">
            Cancel
          </Link>
          <button
            type="submit"
            className="text-2xl font-medium py-[10px] px-[20px] rounded-[30px] bg-active-sidebar text-[#1A162E]"
          >
            {text}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditInfo;
