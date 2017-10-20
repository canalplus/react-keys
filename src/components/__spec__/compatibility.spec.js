import compatibility from '../compatibility';
import sinon from 'sinon';
import { STRATEGY_MEMORY, STRATEGY_MIRROR } from '../../constants';

describe('compatibility', () => {
  it(
    'should return props if right props',
    sinon.test(function() {
      this.mock(console)
        .expects('warn')
        .never();
      const props = { id: '2' };
      const result = compatibility(props);
      result.should.eql(props);
    })
  );
  it(
    'should warn user if mistake on enterStrategy',
    sinon.test(function() {
      this.mock(console)
        .expects('warn')
        .once()
        .withArgs(
          '[react-keys] - enterStrategy prop is deprecated and will be removed in next major release, use strategy instead'
        );
      const props = { enterStrategy: STRATEGY_MIRROR };
      const result = compatibility(props);
      result.should.eql({ strategy: STRATEGY_MIRROR });
    })
  );
  it(
    'should warn user if mistake on memory',
    sinon.test(function() {
      this.mock(console)
        .expects('warn')
        .once()
        .withArgs(
          '[react-keys] - memory strategy is deprecated and will be removed in next major release, use memory={true} instead'
        );
      const props = { enterStrategy: STRATEGY_MEMORY };
      const result = compatibility(props);
      result.should.eql({ memory: true });
    })
  );
});
