import moment from 'moment'
import Text from './text.json'
import {
  neutral,
  yellow as pro_boaYellow,
  red as pro_boaRed,
  green as pro_boaGreen
} from '@pro_boa/ui'

export const amazonBucket = {
  link: 'https://help.pro_boa.com/fr/',
  avatar: 'https://help.pro_boa.com/fr/',
  bucketBaseUrl: 'https://help.pro_boa.com/fr/',
  OrganizationTeamImagePath: 'https://help.pro_boa.com/fr/',
  categoriesUrl: 'https://help.pro_boa.com/fr/'
}

export const helpLinks = {
  help: 'https://help.pro_boa.com/fr/ ',
  manager: 'https://help.pro_boa.com/fr/articles/6744307-creer-et-affecter-vos-managers-d-equipe',
  report: 'https://help.pro_boa.com/fr/articles/6744367-etat-des-licences',
  giveLicenseToLearner: 'https://help.pro_boa.com/fr/articles/6741959-affecter-vos-licences',
  learners: 'https://help.pro_boa.com/fr/articles/6741949-inviter-vos-apprenants',
  homePage: 'https://help.pro_boa.com/fr/articles/6744327-suivez-votre-reussite',
  learnerProfile: 'https://help.pro_boa.com/fr/articles/6744272-gerer-vos-utilisateurs',
  teamProfile: 'https://help.pro_boa.com/fr/articles/6744327-suivez-votre-reussite',
  affectationHistory: 'https://help.pro_boa.com/fr/articles/6744370-historique-des-affectations',
  admins: 'https://help.pro_boa.com/fr/collections/3724380-planifier-votre-reussite-guide-de-l-administrateur',
  faq: 'https://help.pro_boa.com/fr/collections/3724385-questions-et-reponses-faq',
  start: 'https://help.pro_boa.com/fr/collections/3724370-bien-commencer-avec-pro_boa',
  undestand: 'https://help.pro_boa.com/fr/collections/3724383-comprendre-les-rapports',
  news: 'https://help.pro_boa.com/fr/collections/2044052-nouveautes-pro_boa',
  managerGuid: 'https://help.pro_boa.com/fr/collections/3724381-guide-du-manager-d-equipe'
}

const ApiUrl = 'https://help.pro_boa.com/fr/'

export const frontUrl = 'https://help.pro_boa.com/fr/'

export const BASE_URL_WEB = `${ApiUrl}/pro/web`

export const AdminRole = '4'
export const ManagerRole = '5'
export const LearnerUserRole = '6'

export const yearDatePart = 1
export const monthDatePart = 2
export const dayDatePart = 3

export const annualLicenseType = 1
export const monthlyLicenseType = 2
export const trialLicenseType = 3
export const partitionLicenseType = 4
 export const pro_boaPlayerScript = 'https://help.pro_boa.com/fr/'
export const {
  LinkAppAndroid,
  LinkAppIOS,
  FacebookLink,
  TwitterLink,
  InstagramLink,
  FacebookShareLink,
  TwitterShareLink,
  LinkdinShareLink,
  CertificatLink
} = window.pro_boaConfiguration

export const ProfileTypes = {
  Default: 'Default',
  FreeSubscriber: 'FreeSubscriber',
  Buyer: 'Buyer',
  BasicSubscriber: 'BasicSubscriber',
  PremiumSubscriber: 'PremiumSubscriber'
}

export const OnBoardingStateEnum = {
  Start: 'Start',
  Completed: 'Completed'
}

export const steps = {
  onboardingNewAdmin: 4,
  onboardingOldClient: 2,
  onboardingNewManager: 5
}

export const onboardingSteps = {
  newTraining: 0,
  changePassword: 1,
  success: 2
}

export const adminOnboardingSteps = {
  firstStep: 1,
  secondStep: 2,
  successStep: 3
}

export const Avatars = {
  anonymous: window.pro_boaConfiguration.Avatars.Anonymous,
  female: window.pro_boaConfiguration.Avatars.Female,
  male: window.pro_boaConfiguration.Avatars.Male
}

export const billingCycleId = {
  without: 4,
  trial: 3,
  annual: 1,
  monthly: 2
}

export const osTypes = {
  android: 'AndroidOS',
  ios: 'iOS'
}

export const notification = {
  success: 'success',
  failed: 'error'
}

export const categoriesColor = {
  'e930ec21-08e6-4b42-a530-02f550265083': {
    backgroundColor: '#FAD1DB',
    primaryColor: 'rgba(233,27,75,0.99)'
  },
  'd7305f3f-ab63-4f23-abe2-3662fff390f2': {
    backgroundColor: 'rgba(250,100,0,0.2)',
    primaryColor: '#FA6400'
  },
  'ba45ab70-968f-4add-8756-35de31f325c0': {
    backgroundColor: 'rgba(2,197,140,0.2)',
    primaryColor: '#02C58C'
  },
  'a809f91b-244d-4183-8793-6faf329e7693': {
    backgroundColor: '#E0D7FF',
    primaryColor: '#6236FF'
  },
  '9d797625-4d1c-4a24-afa4-73b94eddeca3': {
    backgroundColor: 'rgba(250,100,0,0.2)',
    primaryColor: '#FA6400'
  },
  '977a26d2-89f2-41d5-be90-6a84365aabb3': {
    backgroundColor: 'rgba(0,145,255,0.2)',
    primaryColor: '#0091FF'
  },
  '19bb7b7a-f80c-46ba-93d1-c52ea9d8f26e': {
    backgroundColor: '#FDF0CC',
    primaryColor: '#F7B500'
  },
  '0df9e561-41d4-4e5f-8bff-2c92ddfa9903': {
    backgroundColor: 'rgba(55,9,216,0.2)',
    primaryColor: '#3709D8'
  }
}

export const LearningColor = {
  recommended: '#3767DA',
  certificats: '#0091FF',
  courses: '#4FB771',
  favorits: '#F7B500',
  history: '#6236FF',
  recommendedBackground: 'rgba(55,103,218,0.09)',
  certificatsBackground: 'rgba(0,145,255,0.09)',
  coursesBackground: 'rgba(79,183,113,0.09)',
  favoritsBackground: 'rgba(247,181,0,0.09)',
  historyBackground: 'rgba(98,54,255,0.09)'
}

export const CourseProgressionState = {
  NA: 'NA',
  Start: 'Start',
  Continue: 'Continue',
  Done: 'Done'
}
export const drawerWidth = 354
export const drawerWidthClosed = 75
export const red = '#FD0046'
export const yellow = '#FCC01D'
export const purple = '#6933FF'
export const blue = '#0094FF'
export const magenta = '#C038CF'
export const green = '#00C987'

export const OrganizationTeamImages = {
  TeamIconPath: window?.pro_boaConfiguration?.OrganizationAssets?.TeamIconPath,
  Virtualization: window?.pro_boaConfiguration?.OrganizationAssets?.TeamIcons?.Virtualization,
  Design: window?.pro_boaConfiguration?.OrganizationAssets?.TeamIcons?.Design,
  DataBase: window?.pro_boaConfiguration?.OrganizationAssets?.TeamIcons?.DataBase,
  Development: window?.pro_boaConfiguration?.OrganizationAssets?.TeamIcons?.Development,
  Security: window?.pro_boaConfiguration?.OrganizationAssets?.TeamIcons?.Security
}

export const teams = [
  `${amazonBucket?.bucketBaseUrl}${OrganizationTeamImages?.TeamIconPath}${OrganizationTeamImages?.Development}`,
  `${amazonBucket?.bucketBaseUrl}${OrganizationTeamImages?.TeamIconPath}${OrganizationTeamImages?.Virtualization}`,
  `${amazonBucket?.bucketBaseUrl}${OrganizationTeamImages?.TeamIconPath}${OrganizationTeamImages?.Design}`,
  `${amazonBucket?.bucketBaseUrl}${OrganizationTeamImages?.TeamIconPath}${OrganizationTeamImages?.DataBase}`,
  `${amazonBucket?.bucketBaseUrl}${OrganizationTeamImages?.TeamIconPath}${OrganizationTeamImages?.Security}`
]

export const mockOrganizationId = '2d85990d-aa15-4d79-a46d-66f6b551ef09'

export const DMYDateFormat = 'DD/MM/YYYY'
export const MDYDateFormat = 'MM/DD/YYYY'
export const HourlyDateFormat = 'DD/MM/yyyy HH:mm'

export const todayDate = moment().format(MDYDateFormat)
export const yesterdayDate = moment().subtract(1, 'days').format(MDYDateFormat)
export const startOfCurrentWeek = moment().startOf('week').format(MDYDateFormat)
export const endOfCurrentWeek = moment().endOf('week').format(MDYDateFormat)
export const startOfLastWeek = moment().startOf('week').subtract(1, 'weeks').format(MDYDateFormat)
export const endOfLastWeek = moment().endOf('week').subtract(1, 'weeks').format(MDYDateFormat)
export const startOfCurrentMonth = moment().startOf('month').format(MDYDateFormat)
export const endOfCurrentMonth = moment().endOf('month').format(MDYDateFormat)
export const startOfLastMonth = moment().startOf('month').subtract(1, 'month').format(MDYDateFormat)
export const endOfLastMonth = moment().endOf('month').subtract(1, 'month').format(MDYDateFormat)
export const startOfThisYear = moment().startOf('year').format(MDYDateFormat)
export const endOfThisYear = moment().endOf('year').format(MDYDateFormat)
export const startOfLastYear = moment().startOf('year').subtract(1, 'year').format(MDYDateFormat)
export const endOfLastYear = moment().endOf('year').subtract(1, 'year').format(MDYDateFormat)

export const learnerDateType = 2

export const dayRanges = [
  { Id: 1, Name: Text.today },
  { Id: 2, Name: Text.yesterday },
  { Id: 3, Name: Text.thisWeek },
  { Id: 4, Name: Text.lastWeek },
  { Id: 5, Name: Text.thisMonth },
  { Id: 6, Name: Text.lastMonth },
  { Id: 7, Name: Text.thisYear },
  { Id: 8, Name: Text.lastYear }
]

export const orange = ['#F9A37F', '#F6692F']
export const violet = ['#B18CE7', '#7F37DA']

export const typographyClass = {
  color: neutral[6]
}

export const dateTypesConstenants = {
  oneDay: 1,
  week: 2,
  month: 3,
  year: 4,
  moreThanYear: 5
}

export const totalViewQueryFields = {
  team: 'TeamId',
  organization: '',
  user: 'UserId'
}

export const OrganizationLicenseTypeEnum = {
  Annual: 'Annual',
  Monthly: 'Monthly',
  Trial: 'Trial',
  None: 'None'
}

export const takeAll = 0
export const defaultSkip = 0
export const defaultTake = 10
export const defaultField = 'CreationDate'
export const defaultLearnersField = 'CreationDate'
export const defaultFieldReport = 'OperationDate'
export const defaultManagerSortField = 'FirstName'
export const defaultOrderAsc = true
export const defaultLearnersOrderAsc = false
export const defaultAdminsOrderAsc = true
export const emptySearch = ''

export const INTERCOM_APP_ID = window.pro_boaConfiguration.OrganizationAssets.IntercomAppId

export const oldCostumer = 'OLD_SYSTEM'

export const OnboardingVideos = {
  OldB2BCustomers: 'https://static.pro_boa.com/onboarding/OldB2BCustomers.mp4',
  NewB2BAdmin: 'https://static.pro_boa.com/onboarding/NewB2BAdmin.mp4',
  NewB2BManager: 'https://static.pro_boa.com/onboarding/NewB2BManager.mp4'
}

export const contactB2B = {
  ContactEmail: window.pro_boaConfiguration.OrganizationAssets.ContactEmail,
  ContactName: window.pro_boaConfiguration.OrganizationAssets.ContactName,
  ContactPhone: window.pro_boaConfiguration.OrganizationAssets.ContactPhone
}

export const salesB2B = {
  SalesEmail: window.pro_boaConfiguration.SupportEmail,
  SalesPhone: window.pro_boaConfiguration.Phone
}

export const StatusColors = {
  success: pro_boaGreen[1],
  error: pro_boaRed[2],
  alert: pro_boaYellow[2]
}

export const borderColor = '#F0F5F9'
export const infoTextColor = '#9CAEC1'
