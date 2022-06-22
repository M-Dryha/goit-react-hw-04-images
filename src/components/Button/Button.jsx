import s from './Button.module.css';
import PropTypes from 'prop-types';
const Button = ({ onClick }) => {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
