import { helpLinks } from 'constants/'
import AffectLicense from './AffectLicense'
import AffectLicenses from './AffectLicenses'
import CreateLearner from './CreateLearner'
import CreateTeam from './CreateTeam'
import DownloadLearnersReport from './DownloadLearnersReport'
import DownloadReport from './DownloadReport'
import EditModal from './EditTeam'
import OrderLicenses from './OrderLicenses'
import InviteManager from './InviteManager'
import RemoveLearner from './RemoveLearner'
import RemoveTeam from './RemoveTeam'
import AssignManager from './Team/assignManager'
import RemoveManager from './Team/removeManager'
import DeleteManager from './DeleteManager'
import EditLearnerTeam from './EditLearnerTeam'
import InviteAdmin from './InviteAdmin'
import RemoveAdmin from './RemoveAdmin'
import OrderLicensesNew from './OrderLicenses/orderLicensesNew'

export const defaultWidth = 384

export default {
  editTeam: {
    component: (props) => <EditModal {...props} />,
    width: defaultWidth
  },
  assignManager: {
    component: (props) => <AssignManager {...props} />,
    width: defaultWidth
  },
  removeManager: {
    component: (props) => <RemoveManager {...props} />,
    width: defaultWidth
  },
  inviteManager: {
    component: (props) => <InviteManager {...props} />,
    width: defaultWidth,
    helpLink: helpLinks.manager
  },
  deleteManager: {
    component: (props) => <DeleteManager {...props} />,
    width: defaultWidth
  },
  removeTeam: {
    component: (props) => <RemoveTeam {...props} />,
    width: defaultWidth
  },
  affectLicense: {
    component: (props) => <AffectLicense {...props} />,
    width: defaultWidth
  },
  removeLearner: {
    component: (props) => <RemoveLearner {...props} />,
    width: defaultWidth
  },
  createTeam: {
    component: (props) => <CreateTeam {...props} />,
    width: defaultWidth
  },
  downloadReport: {
    component: (props) => <DownloadReport {...props} />,
    width: defaultWidth
  },
  affectLicenses: {
    component: (props) => <AffectLicenses {...props} />,
    width: defaultWidth
  },
  createLearner: {
    component: (props) => <CreateLearner {...props} />,
    width: defaultWidth
  },
  editLearnerTeam: {
    component: (props) => <EditLearnerTeam {...props} />,
    width: defaultWidth
  },
  orderLicenses: {
    component: (props) => <OrderLicenses {...props} />,
    width: defaultWidth
  },
  orderLicensesNew: {
    component: (props) => <OrderLicensesNew {...props} />,
    width: defaultWidth
  },
  downloadLearnersReport: {
    component: (props) => <DownloadLearnersReport {...props} />,
    width: defaultWidth
  },
  inviteAdmin: {
    component: (props) => <InviteAdmin {...props} />,
    width: defaultWidth
  },
  removeAdmin: {
    component: (props) => <RemoveAdmin {...props} />,
    width: defaultWidth
  }
}
