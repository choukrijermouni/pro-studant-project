import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import DownloadReport from '.'
configure({ adapter: new Adapter() })

describe('>>> DownloadReport --- Shallow Render DownloadReport component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<DownloadReport />)
    tree = renderer.create(
      <DownloadReport />
    ).toJSON()
  })

  it('+++ render correctly and match snapshot', () => {
    expect(tree).toMatchSnapshot()
  })

  it('+++ render the component', () => {
    expect(wrapper).toBeTruthy()
  })
})
