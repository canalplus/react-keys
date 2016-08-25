import chai from 'chai';
import 'sinon';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import { _init } from '../src/listener';

chai.should();
chai.use(sinonChai);
chai.use(chaiEnzyme());
_init();
