import React, { createContext, useContext, useState } from 'react';
import { Toast, ToastBody, ToastHeader, ToastContainer } from 'reactstrap';

const ToasterContext = createContext();

export const ToasterProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, theme = 'primary') => {
    setToasts([...toasts, { message, theme }]);
  };

  const removeToast = (index) => {
    setToasts(toasts.filter((_, i) => i !== index));
  };

  return (
    <ToasterContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        {toasts.map((toast, index) => (
          <Toast key={index} className={`bg-${toast.theme}`} isOpen={true}>
            <ToastHeader toggle={() => removeToast(index)}>
              Notification
            </ToastHeader>
            <ToastBody>{toast.message}</ToastBody>
          </Toast>
        ))}
      </ToastContainer>
    </ToasterContext.Provider>
  );
};

export const useToaster = () => useContext(ToasterContext);