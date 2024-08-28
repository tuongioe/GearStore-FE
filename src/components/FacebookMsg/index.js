import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
  return (
    <FacebookProvider appId="399448119389075" chatSupport>
      <CustomChat pageId="254029317799297" minimized={true} />
    </FacebookProvider>
  );
};

export default FacebookMsg;
