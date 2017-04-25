import chai from 'chai';
import sinonTest from 'sinon-test';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import { _init } from '../src/listener';
import { ops } from './mocks';

sinon.test = sinonTest.configureTest(sinon);

chai.should();
chai.use(sinonChai);
chai.use(chaiEnzyme());
_init(ops);
