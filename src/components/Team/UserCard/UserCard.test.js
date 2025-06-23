import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import UserCard from '.'
configure({ adapter: new Adapter() })

describe('>>> UserCard --- Shallow Render ManagerCard component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<UserCard />)
    tree = renderer.create(
      <UserCard />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
