import React from 'react';
import ApiProvider from '../context/ApiProvider';

const ContextWrapper = ({children}) => {
  return (
    <>
      
        <ApiProvider>{children}</ApiProvider>
    </>
  );
};

export default ContextWrapper;