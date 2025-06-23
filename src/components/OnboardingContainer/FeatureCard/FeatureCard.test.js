import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import FeatureCard from '.'
configure({ adapter: new Adapter() })

describe('>>> FeatureCard --- Shallow Render ManagerCard component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<FeatureCard />)
    tree = renderer.create(
      <FeatureCard />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
