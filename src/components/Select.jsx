import { Select as MaterialSelect } from '@material-tailwind/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';

const Select = ({ children, ...rest }) => {
  let inputClass = '!border !border-gray-500';
  if (rest.className) {
    inputClass = classNames(inputClass, rest.className);
    delete rest.className;
  }

  return (
    <MaterialSelect
      labelProps={{ className: 'hidden' }}
      containerProps={{ className: 'max-w-fit' }}
      selected={(element) =>
        element &&
        cloneElement(element, {
          disabled: true,
          className:
            'flex items-center opacity-100 px-0 gap-2 pointer-events-none',
        })
      }
      className={inputClass}
      {...rest}
    >
      {children}
    </MaterialSelect>
  );
};
Select.propTypes = {
  children: PropTypes.any,
};

export default Select;
