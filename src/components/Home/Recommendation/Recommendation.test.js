import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import Recommendation from '.'
configure({ adapter: new Adapter() })

describe('>>> Recommendation --- Shallow Render Recommendation component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<Recommendation />)
    tree = renderer.create(
      <Recommendation />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
