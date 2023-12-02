import classNames from 'classnames';
import PropTypes from 'prop-types';

function Skeleton({ times, className }) {
  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded-xl',
    'mb-4',
    className,
  );
  const innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200',
  );

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      );
    });

  return <div>{boxes}</div>;
}

Skeleton.propTypes = {
  times: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};

export default Skeleton;
