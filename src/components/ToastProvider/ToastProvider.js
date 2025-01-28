import React from 'react';

import useKeydown from '../../hooks/useKeydown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape', handleEscape);

  function createToast(message, variant) {
    const newToasts = [
      ...toasts,
      {
        id: Math.random(),
        message,
        variant,
      },
    ];
    setToasts(newToasts);
  }

  function dismissToast(id) {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  }

  return (
    <ToastContext
      value={{
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext>
  );
}

export default ToastProvider;
