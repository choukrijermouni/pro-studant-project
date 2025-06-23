import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import Profile from './'
import { ReduxProvider } from '../../../test/ReduxProvider'

configure({ adapter: new Adapter() })

describe('>>> Profile --- Shallow Render Profile component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<ReduxProvider><Profile /></ReduxProvider>)
    tree = renderer.create(
      <ReduxProvider>
        <Profile />
      </ReduxProvider>
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
