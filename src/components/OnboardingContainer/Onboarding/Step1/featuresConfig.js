import {
  fastActions,
  analytics,
  createTeams,
  dashboard,
  reports,
  transferLicense
} from 'assets'
import {
  red,
  yellow,
  purple,
  blue,
  magenta,
  green
} from 'constants/'
import Text from './text.json'

export default [
  {
    id: 1,
    text: Text.features.feature1,
    icon: dashboard,
    color: yellow
  },
  {
    id: 2,
    text: Text.features.feature2,
    icon: analytics,
    color: red
  },
  {
    id: 3,
    text: Text.features.feature3,
    icon: fastActions,
    color: purple
  },
  {
    id: 4,
    text: Text.features.feature4,
    icon: reports,
    color: blue
  },
  {
    id: 5,
    text: Text.features.feature5,
    icon: transferLicense,
    color: magenta
  },
  {
    id: 6,
    text: Text.features.feature6,
    icon: createTeams,
    color: green
  }
]
