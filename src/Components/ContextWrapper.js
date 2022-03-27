import React from 'react';
import AuthProvider from '../context/AuthProvider';
import ApiProvider from '../context/ApiProvider';

const ContextWrapper = ({children}) => {
  return (
    <>
      <AuthProvider>
        <ApiProvider>{children}</ApiProvider>
      </AuthProvider>
    </>
  );
};

export default ContextWrapper;