import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import Admin from './'
import { ReduxProvider } from '../../../test/ReduxProvider'
configure({ adapter: new Adapter() })

describe('>>> Admin --- Shallow Render Admin component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<ReduxProvider><Admin /></ReduxProvider>)
    tree = renderer.create(
      <ReduxProvider><Admin /></ReduxProvider>
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
