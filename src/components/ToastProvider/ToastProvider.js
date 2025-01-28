import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];
  const [message, setMessage] = React.useState('');
  const [activeVariant, setActiveVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);

  return (
    <ToastContext
      value={{
        VARIANT_OPTIONS,
        message,
        setMessage,
        activeVariant,
        setActiveVariant,
        toasts,
        setToasts,
      }}
    >
      {children}
    </ToastContext>
  );
}

export default ToastProvider;
