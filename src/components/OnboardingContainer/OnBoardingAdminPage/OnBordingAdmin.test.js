import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import OnBoardingAdminPage from './'
configure({ adapter: new Adapter() })

describe('>>> OnBoardingAdminPage --- Shallow Render OnBoardingAdminPage component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<OnBoardingAdminPage />)
    tree = renderer.create(
      <OnBoardingAdminPage />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
