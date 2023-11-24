import className from 'classnames';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, actionBar, classes }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const modalClasses = className(
    'fixed inset-0 z-10 min-w-max overflow-y-auto rounded-none bg-white p-10 lg:inset-x-44 lg:inset-y-20 lg:rounded-xl',
    classes,
  );

  return ReactDOM.createPortal(
    <div>
      <div className="fixed inset-0 z-10 bg-gray-300 opacity-80"></div>
      <div className={modalClasses}>
        <div className="flex h-full flex-col justify-between">
          {children}
          <div className="flex justify-end">{actionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container'),
  );
};

export default Modal;
