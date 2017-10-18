import { EXIT_STRATEGY_MEMORY } from '../constants';

export default props => {
  // WILL BE REMOVED ON 4.x release
  let innerProps = { ...props };
  if (innerProps.enterStrategy) {
    if (innerProps.enterStrategy === EXIT_STRATEGY_MEMORY) {
      console.warn(
        'memory strategy is deprecated and will be removed in next major release, use memory={true} insread'
      );
      innerProps.memory = true;
    } else {
      console.warn(
        'enterStrategy prop is deprecated and will be removed in next major release, use strategy instsead'
      );
      innerProps.strategy = innerProps.enterStrategy;
    }
    delete innerProps.enterStrategy;
  }
  return innerProps;
};
