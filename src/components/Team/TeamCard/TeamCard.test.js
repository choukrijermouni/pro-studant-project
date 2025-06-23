import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import TeamCard from '.'
configure({ adapter: new Adapter() })

describe('>>> TeamCard --- Shallow Render ManagerCard component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<TeamCard />)
    tree = renderer.create(
      <TeamCard />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
