import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';
import { ToastContext } from '../ToastProvider';

import styles from './ToastPlayground.module.css';

function ToastPlayground() {
  const {
    VARIANT_OPTIONS,
    message,
    setMessage,
    activeVariant,
    setActiveVariant,
    toasts,
    setToasts,
  } = React.useContext(ToastContext);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setToasts]);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} setToasts={setToasts} />

      <div className={styles.controlsWrapper}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const newToasts = [...toasts];
            newToasts.push({
              id: Math.random(),
              variant: activeVariant,
              message,
            });
            setToasts(newToasts);

            setMessage('');
            setActiveVariant(VARIANT_OPTIONS[0]);
          }}
        >
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                value={message}
                className={styles.messageInput}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((variant) => {
                return (
                  <label key={variant} htmlFor={variant}>
                    <input
                      id={variant}
                      type="radio"
                      name="variant"
                      value={variant}
                      checked={activeVariant === variant}
                      onChange={(event) => setActiveVariant(variant)}
                    />
                    {variant}
                  </label>
                );
              })}

              {/* TODO Other Variant radio buttons here */}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToastPlayground;
