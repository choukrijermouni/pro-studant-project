import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import LearnerHistory from '.'
import { ReduxProvider } from '../../../../test/ReduxProvider'
configure({ adapter: new Adapter() })

describe('>>> LearnerHistory --- Shallow Render LearnerHistory component', () => {
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(<ReduxProvider><LearnerHistory /></ReduxProvider>)
    tree = renderer.create(
      <ReduxProvider>
        <LearnerHistory />
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
