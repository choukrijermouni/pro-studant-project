import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import ReactDOM from 'react-dom'
import App from 'core/App'

ReactDOM.render(<App />, document.getElementById('root'))
if (module.hot) {
  module.hot.accept()
}
