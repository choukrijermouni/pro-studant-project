import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import Step3 from '.'
configure({ adapter: new Adapter() })

describe('>>> Step3 --- Shallow Render Step3 component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<Step3 />)
    tree = renderer.create(
      <Step3 />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
