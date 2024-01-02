import { Select as MaterialSelect, Option } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';

const Select = ({ setFn, options, className, ...rest }) => {
  let inputClass = `!border !border-gray-500 ${className || ''}`;

  const rederedOptions = options.map((option) => (
    <Option value={option.value} key={option.value}>
      {option.label}
    </Option>
  ));

  return (
    <MaterialSelect
      labelProps={{ className: 'hidden' }}
      onChange={(value) => setFn(value)}
      selected={(element) =>
        element &&
        cloneElement(element, {
          disabled: true,
          className:
            'flex items-center opacity-100 px-0 gap-2 pointer-events-none',
        })
      }
      className={inputClass}
      {...rest} // event handler
    >
      {rederedOptions}
    </MaterialSelect>
  );
};
Select.propTypes = {
  children: PropTypes.any,
  setFn: PropTypes.func,
  options: PropTypes.array,
  className: PropTypes.string,
};

export default Select;
