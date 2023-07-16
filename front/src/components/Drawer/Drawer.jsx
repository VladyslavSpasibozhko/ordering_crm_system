import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './index.css';

const defaultOptions = {
  size: 'small',
};

export const DrawerContainer = ({ children, options, closeDrawer }) => {
  return (
    <div className="drawer">
      <div className="drawer-overlay" onClick={closeDrawer} />
      <div className={`drawer-container ${options.size}`}>{children}</div>
    </div>
  );
};

export const Drawer = ({
  open,
  children,
  options = defaultOptions,
  closeDrawer,
}) => {
  const ref = useRef(document.getElementById('drawer'));

  const handleClose = () => {
    closeDrawer();
  };

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleClose);
    }

    return () => window.removeEventListener('keydown', handleClose);
  }, [open]);

  if (open) {
    return createPortal(
      <DrawerContainer options={options} closeDrawer={handleClose}>
        {children}
      </DrawerContainer>,
      ref.current,
    );
  }

  return null;
};
