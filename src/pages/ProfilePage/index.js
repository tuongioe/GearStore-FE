import React from 'react';
import ProfileLeft from './components/ProfileLeft';
import ProfileRight from './components/ProfileRight';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <main className="dark:text-dark-profile-text container grid grid-cols-11 pt-[30px] lg:flex lg:flex-col gap-[30px]">
        <ProfileLeft />
        <Outlet />
      </main>
    </>
  );
};

export default ProfilePage;
