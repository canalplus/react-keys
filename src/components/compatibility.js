import { STRATEGY_MEMORY } from '../constants';

export default props => {
  // WILL BE REMOVED ON 4.x release
  let innerProps = { ...props };
  if (innerProps.enterStrategy) {
    if (innerProps.enterStrategy === STRATEGY_MEMORY) {
      console.warn(
        '[react-keys] - memory strategy is deprecated and will be removed in next major release, use memory={true} instead'
      );
      innerProps.memory = true;
    } else {
      console.warn(
        '[react-keys] - enterStrategy prop is deprecated and will be removed in next major release, use strategy instead'
      );
      innerProps.strategy = innerProps.enterStrategy;
    }
    delete innerProps.enterStrategy;
  }
  return innerProps;
};
