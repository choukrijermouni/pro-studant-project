import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import Step2 from '.'
configure({ adapter: new Adapter() })

describe('>>> Step2 --- Shallow Render Step2 component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<Step2 />)
    tree = renderer.create(
      <Step2 />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
