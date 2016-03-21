import chai from 'chai';
import 'sinon';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';

chai.should();
chai.use(sinonChai);
chai.use(chaiEnzyme());
