import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigation } from 'react-router-dom';
import { useSubmit } from 'react-router-dom';
import axios from 'axios';
import getAuthToken from '../../services/getToken';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/userSlice';

const AddressFormModal = ({ closeForm, data, setSelectedOption }) => {
  const dispatch = useDispatch();
  const token = getAuthToken();
  const submit = useSubmit();
  const navigation = useNavigation();
  const addressId = data._id;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
    },
  });

  const text =
    navigation.state === 'submitting'
      ? 'Saving...'
      : navigation.state === 'loading'
      ? 'Saved!'
      : 'Save Address';

  const submitHandler = async (data) => {
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/address/`,
      {
        address: {
          ...data,
          _id: addressId,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getUser());
    setSelectedOption(addressId);
    closeForm();
  };
  return (
    <>
      <div
        className="bg-[#000] opacity-70 fixed inset-0 z-10"
        onClick={closeForm}
      ></div>
      <section className="p-[50px] sm:p-[20px] fixed top-[50%] left-[50%] w-[50%] sm:w-[90%] lg:w-[70%] translate-y-[-50%] translate-x-[-50%] z-20 col-span-8 bg-profile-right dark:bg-dark-profile-right rounded-[20px]">
        <button className="block ml-auto select-none" onClick={closeForm}>
          <img
            src="/icon/close.svg"
            alt=""
            className="dark-icon w-[42px] h-[42px]"
          />
        </button>
        <Form onSubmit={handleSubmit(submitHandler)} className="mt-[30px]">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-[30px]">
            <div className="flex flex-col sm:col-span-2 gap-[20px] relative">
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
            <div className="flex flex-col sm:col-span-2 gap-[20px] relative">
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
            <button className="text-2xl font-medium" onClick={closeForm}>
              Cancel
            </button>
            <button
              type="submit"
              className="text-2xl font-medium py-[10px] px-[20px] rounded-[30px] bg-active-sidebar text-[#1A162E]"
            >
              {text}
            </button>
          </div>
        </Form>
      </section>
    </>
  );
};

export default AddressFormModal;
