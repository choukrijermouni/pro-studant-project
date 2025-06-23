import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import NotificationPopUp from './'
import { ReduxProvider } from '../../../test/ReduxProvider'

configure({ adapter: new Adapter() })

describe('>>> NotificationPopUp --- Shallow Render NotificationPopUp component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<ReduxProvider><NotificationPopUp /></ReduxProvider>)
    tree = renderer.create(
      <ReduxProvider><NotificationPopUp /></ReduxProvider>
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
