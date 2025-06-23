import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import NotificationCard from '.'
configure({ adapter: new Adapter() })

describe('>>> NotificationCard --- Shallow Render NotificationCard component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<NotificationCard />)
    tree = renderer.create(
      <NotificationCard />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
