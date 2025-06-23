import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import ManagerCard from '.'
configure({ adapter: new Adapter() })

describe('>>> ManagerCard --- Shallow Render ManagerCard component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<ManagerCard />)
    tree = renderer.create(
      <ManagerCard />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
