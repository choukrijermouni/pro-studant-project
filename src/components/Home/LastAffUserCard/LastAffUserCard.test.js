import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import LastAffUserCard from '.'
configure({ adapter: new Adapter() })

describe('>>> LastAffUserCard --- Shallow Render ManagerCard component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<LastAffUserCard />)
    tree = renderer.create(
      <LastAffUserCard />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
