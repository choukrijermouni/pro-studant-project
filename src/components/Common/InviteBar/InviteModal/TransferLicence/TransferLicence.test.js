import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import TransferLicence from '.'
configure({ adapter: new Adapter() })

describe('>>> TransferLicence --- Shallow Render TransferLicence component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<TransferLicence />)
    tree = renderer.create(
      <TransferLicence />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
