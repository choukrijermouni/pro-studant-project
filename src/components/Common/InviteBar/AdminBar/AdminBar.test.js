import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import AdminBar from './'
configure({ adapter: new Adapter() })

describe('>>> AdminBar --- Shallow Render AdminBar component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<AdminBar />)
    tree = renderer.create(
      <AdminBar />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
