import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../../../../constants/routes';
import { useForm } from 'react-hook-form';
import { Form, useNavigation } from 'react-router-dom';
import { useSubmit } from 'react-router-dom';

const AddCard = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const text =
    navigation.state === 'submitting'
      ? 'Saving...'
      : navigation.state === 'loading'
      ? 'Saved!'
      : 'Save Address';

  const submitHandler = (data) => {
    submit(data, { method: 'post' });
  };
  return (
    <section className="col-span-8 p-[30px] bg-profile-right dark:bg-dark-profile-right rounded-[20px]">
      <div className="flex items-center gap-[10px]">
        <Link to={ROUTES.PROFILE}>
          <img src="/icon/arrow-left.svg" alt="" className="dark-icon" />
        </Link>
        <h2 className="text-3xl font-medium">Add new address</h2>
      </div>
      <Form onSubmit={handleSubmit(submitHandler)} className="mt-[30px]">
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
              placeholder="Full Name"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className="absolute bottom-[-25px] text-2xl font-medium text-rose-900">
                Please enter your full name.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-[20px] relative">
            <label htmlFor="phoneNumber" className="text-3xl font-medium">
              Phone number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
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
                Please enter your phone number.
              </p>
            )}
          </div>

          <div className="flex flex-col col-span-2 gap-[20px] relative">
            <label htmlFor="address" className="text-3xl font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="p-[12px] border-[1px] border-solid border-[#D2D1D6] rounded-[10px] placeholder:text-[#D2D1D6]"
              placeholder="Address"
              {...register('address', {
                required: true,
              })}
            />
            {errors.address && (
              <p className="absolute bottom-[-25px] text-2xl font-medium text-rose-900">
                Please enter your address.
              </p>
            )}
          </div>
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
      </Form>
    </section>
  );
};

export default AddCard;
