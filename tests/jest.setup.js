import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import sinonTest from 'sinon-test';
import sinonChai from 'sinon-chai';

sinon.test = sinonTest(sinon);

Enzyme.configure({ adapter: new Adapter() });

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);
