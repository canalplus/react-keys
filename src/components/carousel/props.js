import PropTypes from 'prop-types';
import { NAVIGATION_CENTER } from '../../constants';

export const propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  id: PropTypes.string.isRequired,
  active: PropTypes.bool,
  index: PropTypes.number,
  size: PropTypes.number,
  speed: PropTypes.number,
  priority: PropTypes.number,
  debounce: PropTypes.number,
  elWidth: PropTypes.number,
  navigation: PropTypes.string,
  memory: PropTypes.bool,
  circular: PropTypes.bool,
  triggerClick: PropTypes.bool,
  gap: PropTypes.number,
  className: PropTypes.string,
  childrenClassName: PropTypes.string,
  onChange: PropTypes.func,
  onDownExit: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onUpExit: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onEnter: PropTypes.func,
  updateIndex: PropTypes.bool,
};

export const defaultProps = {
  index: 0,
  size: 3,
  elWidth: 100,
  circular: true,
  triggerClick: true,
  memory: false,
  active: true,
  speed: 100,
  priority: 0,
  gap: 0,
  navigation: NAVIGATION_CENTER,
  debounce: 82,
  className: 'carousel',
  childrenClassName: 'carousel-child',
  updateIndex: false,
};
