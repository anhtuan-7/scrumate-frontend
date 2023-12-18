import { Input as MaterialInput } from '@material-tailwind/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Input = ({ value, setFn, ...rest }) => {
  let inputClass = '!border !border-gray-500';
  if (rest.className) {
    inputClass = classNames(inputClass, rest.className);
    delete rest.className;
  }

  return (
    <MaterialInput
      value={value}
      onChange={(event) => setFn(event.target.value)}
      labelProps={{ className: 'hidden' }}
      className={inputClass}
      {...rest}
    />
  );
};
Input.propTypes = {
  value: PropTypes.any,
  setFn: PropTypes.func,
};

export default Input;
