import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ReduxProvider } from '../../../test/ReduxProvider'
import { createMemoryHistory } from 'history'
import { TeamDetailsPath } from '../../Routes'
import TeamDetails from '.'

configure({ adapter: new Adapter() })

describe('>>> TeamDetails --- Shallow Render ManagerCard component', () => {
  const history = createMemoryHistory()
  const route = '/teams/1'
  history.push(route)
  let wrapper
  let tree

  beforeEach(() => {
    wrapper = shallow(
      <ReduxProvider>
        <Router history={history}>
          <Route exact path={TeamDetailsPath}>
            <TeamDetails />
          </Route>
        </Router>
      </ReduxProvider>
    )
    tree = renderer.create(
      <ReduxProvider>
        <Router history={history}>
          <Route exact path={TeamDetailsPath}>
            <TeamDetails />
          </Route>
        </Router>
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
