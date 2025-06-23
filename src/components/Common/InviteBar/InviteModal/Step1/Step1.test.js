import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import Step1 from '.'
configure({ adapter: new Adapter() })

describe('>>> Step1 --- Shallow Render Step1 component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<Step1 />)
    tree = renderer.create(
      <Step1 />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
