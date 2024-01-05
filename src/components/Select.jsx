import { Select as MaterialSelect, Option } from '@material-tailwind/react';
import PropTypes from 'prop-types';

const Select = ({ setFn, options, className, ...rest }) => {
  let inputClass = `!border !border-gray-500 ${className || ''}`;

  const renderedOptions = options.map((option) => (
    <Option value={option.value} key={option.value}>
      {option.label}
    </Option>
  ));

  return (
    <MaterialSelect
      labelProps={{ className: 'hidden' }}
      onChange={(value) => setFn(value)}
      className={inputClass}
      {...rest} // event handler, value
    >
      {renderedOptions}
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
