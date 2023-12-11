import { Button as MaterialButton } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { GoSync } from 'react-icons/go';

const Button = ({ children, isLoading, ...rest }) => {
  return (
    <MaterialButton {...rest}>
      <div className="flex justify-center">
        {isLoading ? <GoSync className="animate-spin" /> : children}
      </div>
    </MaterialButton>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool.isRequired,
  rest: PropTypes.any,
};

export default Button;
