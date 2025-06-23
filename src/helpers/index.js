import Text from './text.json'
import moment from 'moment'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { blue } from '@pro_boa/ui'
import {
  todayDate,
  endOfCurrentMonth,
  endOfCurrentWeek,
  endOfLastMonth,
  endOfLastWeek,
  endOfLastYear,
  endOfThisYear,
  startOfCurrentMonth,
  startOfCurrentWeek,
  startOfLastMonth,
  startOfLastWeek,
  startOfLastYear,
  startOfThisYear,
  yesterdayDate,
  DMYDateFormat,
  HourlyDateFormat
} from 'constants/'

export const notValidDate = (date) => date === '0001-01-01T00:00:00'

export const avatarName = (name = '') => name.trim().split(' ').reduce((value, current) => value + current.charAt(0), '')
export const formatMinutesDuration = (duration) => {
  const parsedDuration = parseInt(duration, 10)
  let hours = Math.floor(parsedDuration / 3600)
  let minutes = Math.floor((parsedDuration - (hours * 3600)) / 60)
  if (hours === 0) { hours = '' } else if (hours < 10 || hours >= 10) { hours = hours + 'h' }
  if (minutes === 0) { minutes = '' } else if (minutes < 10) { minutes = '0' + minutes + 'min' }
  return hours + minutes
}
export const secondsToMinsChartFormat = (obj = {}) => {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    newObj[key] = (obj[key] / 3600).toFixed(2)
  })
  return newObj
}
export const ToHours = (seconds) => {
  return Number((seconds / 3600).toFixed(2))
}
export const steps = {
  onBoardingFirstStep: 0,
  onBoardingSecendStep: 1,
  onBoardingThirdStep: 2,
  onBoardingFourthStep: 3,
  onBoardingFifthStep: 4
}
export const shrinkName = (name = '', size = 20) => {
  const names = name.split(' ')
  const initials = names.map(n => n.charAt(0)).join('')
  return initials
}

export const FilterValidatedEmails = (emails) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const validEmails = emails.filter(email => emailRegex.test(email))
  return validEmails
}

export const exportTeamsToExcel = (data = [], fileName) => {
  const workBook = XLSX.utils.book_new()
  workBook.Props = {
    Title: Text.Team.Title,
    Subject: Text.Team.Subject,
    Author: Text.Team.Author,
    CreatedDate: moment()._d
  }
  workBook.SheetNames.push('Teams')
  const formattedData = data.map(user => {
    const formattedUser = user.Courses.map(course => ({ ...user, ...course }))
    return formattedUser
  })
  const flatData = formattedData.flat()
  const workSheet = XLSX.utils.json_to_sheet([Text.teamsReportHeader, ...flatData], { skipHeader: true })
  const wscols = [
    { wch: 10 }, // firstName
    { wch: 10 }, // lastName
    { wch: 30 }, // email
    { wch: 30 }, // expiration date
    { wch: 50 }, // course name
    { wch: 15 }, // course time
    { wch: 10 }, // percentage
    { wch: 10 }, // total view
    { wch: 10 }, // total
    { wch: 30 }, // last access
    { wch: 20 } // team name
  ]
  workSheet['!cols'] = wscols
  const colsToMerge = [0, 1, 2, 3, 4, 9]
  const merges = []
  let startRow = 1
  data.forEach((user) => {
    colsToMerge.forEach((col, index) => {
      const endRow = user.Courses.length === 0 ? startRow : startRow + user.Courses.length - 1
      merges.push({
        s: {
          r: startRow,
          c: col
        },
        e: {
          r: endRow,
          c: col
        }
      })
    })
    startRow += user.Courses.length === 0 ? 1 : user.Courses.length
  })
  workSheet['!merges'] = merges
  workBook.Sheets.Teams = workSheet
  const workBookResult = XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
  const stringToArrayBuffer = (workBookResult) => {
    const buf = new ArrayBuffer(workBookResult.length)
    const view = new Uint8Array(buf)
    for (let index = 0; index < workBookResult.length; index++) view[index] = workBookResult.charCodeAt(index) & 0xFF
    return buf
  }
  const blob = new window.Blob([stringToArrayBuffer(workBookResult)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, `${Text.Team.FilePrefix}_${fileName}.xlsx`)
}

export const exportAttributionHistory = (data) => {
  const workBook = XLSX.utils.book_new()
  workBook.Props = {
    Title: Text.AttributionHistory.Title,
    Subject: Text.AttributionHistory.Subject,
    Author: Text.AttributionHistory.Author,
    CreatedDate: moment()._d
  }
  workBook.SheetNames.push(Text.AttributionHistory.Title)
  const workSheet = XLSX.utils.json_to_sheet([Text.AttributionHistoryHeaders, ...data], { skipHeader: true })
  const wscols = [
    { wch: 20 }, // firstName + lastName
    { wch: 30 }, // email
    { wch: 30 }, // Affectation date
    { wch: 20 }, // quantity
    { wch: 30 }, // Type
    { wch: 20 } // admin
  ]
  workSheet['!cols'] = wscols
  workBook.Sheets[Text.AttributionHistory.Title] = workSheet
  const workBookResult = XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
  const stringToArrayBuffer = (workBookResult) => {
    const buf = new ArrayBuffer(workBookResult.length)
    const view = new Uint8Array(buf)
    for (let index = 0; index < workBookResult.length; index++) view[index] = workBookResult.charCodeAt(index) & 0xFF
    return buf
  }
  const blob = new window.Blob([stringToArrayBuffer(workBookResult)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, `${Text.AttributionHistory.Title}.xlsx`)
}

export const formatSeconds = seconds => {
  const duration = moment.duration(Number(seconds), 'seconds')
  const hours = duration.months() * 30 * 24 + duration.days() * 24 + duration.hours()
  return `${hours === 0 ? '' : hours + 'h'}${duration.minutes()}m`
}
export const exportLearnersToExcel = (data, fileName) => {
  const workBook = XLSX.utils.book_new()
  workBook.Props = {
    Title: Text.Team.Title,
    Subject: Text.Team.Subject,
    Author: Text.Team.Author,
    CreatedDate: moment()._d
  }
  workBook.SheetNames.push('Learners')
  let workSheetData = []
  data.forEach(user => {
    const courseProgressionInfo = user.Courses
    const workSheetDataUser = courseProgressionInfo.map(course => {
      return {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Team: user.TeamName || Text.none,
        Email: user.Email,
        SubscriptionEndDate: user.SubscriptionEndDate
          ? isExpired(user.SubscriptionEndDate)
              ? Text.withoutLicense
              : moment(user.SubscriptionEndDate).format(DMYDateFormat)
          : Text.withoutLicense,
        Course: course.Course,
        Duration: course.Duration,
        CompletionPercentage: course.CompletionPercentage + '%',
        CompletionDuration: course.CompletionDuration,
        Total: user.Total,
        LastAccessedDate: moment(course.LastAccessedDate).format(DMYDateFormat)
      }
    })
    if (courseProgressionInfo.length === 0) {
      workSheetDataUser.push({
        FirstName: user.FirstName,
        LastName: user.LastName,
        Team: user.TeamName || Text.none,
        Email: user.Email,
        SubscriptionEndDate: user.SubscriptionEndDate || Text.none,
        Course: 'N.A',
        Duration: 'N.A',
        CompletionPercentage: '0%',
        CompletionDuration: 0,
        Total: 0,
        LastAccessedDate: 'N.A'
      })
    }
    workSheetData = workSheetData.concat(workSheetDataUser)
  })
  const headers = {
    FirstName: 'Prénom',
    LastName: 'Nom',
    Team: 'Équipe',
    Email: 'Email',
    SubscriptionEndDate: 'Date d\'expiration de l\'abonnement',
    Course: 'Intitulé formation',
    Duration: 'Durée formation',
    CompletionPercentage: 'Avancement',
    CompletionDuration: 'Durée vue',
    Total: 'Total',
    LastAccessedDate: 'Dernier Accès'
  }
  workSheetData.unshift(headers)
  const workSheet = XLSX.utils.json_to_sheet(workSheetData, { skipHeader: true })
  const wscols = [
    { wch: 10 }, // firstName
    { wch: 10 }, // lastName
    { wch: 30 }, // email
    { wch: 30 }, // expiration date
    { wch: 50 }, // course name
    { wch: 15 }, // course time
    { wch: 10 }, // percentage
    { wch: 10 }, // total view
    { wch: 10 }, // total
    { wch: 30 }, // last access
    { wch: 20 } // team name
  ]
  workSheet['!cols'] = wscols
  const colsToMerge = [0, 1, 2, 3, 4, 9]
  const merges = []
  let startRow = 1
  data.forEach((user) => {
    colsToMerge.forEach((col, index) => {
      const endRow = user.Courses.length === 0 ? startRow : startRow + user.Courses.length - 1
      merges.push({
        s: {
          r: startRow,
          c: col
        },
        e: {
          r: endRow,
          c: col
        }
      })
    })
    startRow += user.Courses.length === 0 ? 1 : user.Courses.length
  })
  workSheet['!merges'] = merges
  workBook.Sheets.Learners = workSheet
  const workBookResult = XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
  const stringToArrayBuffer = (workBookResult) => {
    const buf = new ArrayBuffer(workBookResult.length)
    const view = new Uint8Array(buf)
    for (let index = 0; index < workBookResult.length; index++) view[index] = workBookResult.charCodeAt(index) & 0xFF
    return buf
  }
  const blob = new window.Blob([stringToArrayBuffer(workBookResult)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, `${fileName}.xlsx`)
}

export const exportLearnersInfoToExcel = (data, fileName, licenseTypes) => {
  const workBook = XLSX.utils.book_new()
  workBook.Props = {
    Title: Text.Team.Title,
    Subject: Text.Team.Subject,
    Author: Text.Team.Author,
    CreatedDate: moment()._d
  }
  workBook.SheetNames.push('Learners')
  const workSheetDataUser = data?.map(user => {
    return {
      FirstName: user?.FirstName || Text.noData,
      LastName: user?.LastName || Text.noData,
      Team: user?.TeamName || Text.noData,
      Email: user?.Email || user?.InvitationEmail || Text.noData,
      CreationDate: moment(user?.CreationDate).format(DMYDateFormat) || Text.noData,
      LastConnectionDate: user?.LastConnectionDate ? moment(user?.LastConnectionDate).format(DMYDateFormat) : Text.neverConnected,
      LicenseType: Text.licenseTypesTranslation[licenseTypes[user?.OrganizationLicenseType]] ||
        Text.licenseTypesTranslation[licenseTypes[user?.InvitationLicenseType]] ||
        Text.withoutLicense,
      SubscriptionEndDate: user?.EndDate
        ? isExpired(user?.EndDate)
            ? Text.withoutLicense
            : moment(user?.EndDate).format(DMYDateFormat)
        : Text.withoutLicense
    }
  })
  const headers = {
    FirstName: Text.headers.firstName,
    LastName: Text.headers.lastName,
    Team: Text.headers.team,
    Email: Text.headers.email,
    CreationDate: Text.headers.CreationDate,
    LastConnectionDate: Text.headers.LastConnectionDate,
    LicenseType: Text.headers.LicenseType,
    SubscriptionEndDate: Text.headers.subscriptionEndDate
  }
  workSheetDataUser.unshift(headers)
  const workSheet = XLSX.utils.json_to_sheet(workSheetDataUser, { skipHeader: true })
  const wscols = [
    { wch: 10 }, // firstName
    { wch: 10 }, // lastName
    { wch: 30 }, // email
    { wch: 30 }, // creation date
    { wch: 30 }, // last connection date
    { wch: 30 }, // license type
    { wch: 30 } // subscription end date
  ]
  workSheet['!cols'] = wscols
  workBook.Sheets.Learners = workSheet
  const workBookResult = XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
  const stringToArrayBuffer = (workBookResult) => {
    const buf = new ArrayBuffer(workBookResult.length)
    const view = new Uint8Array(buf)
    for (let index = 0; index < workBookResult.length; index++) view[index] = workBookResult.charCodeAt(index) & 0xFF
    return buf
  }
  const blob = new window.Blob([stringToArrayBuffer(workBookResult)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, `${fileName}.xlsx`)
}

export const exportTeamLearnersInfoToExcel = (data, fileName, organizationLicenseTypes) => {
  const workBook = XLSX.utils.book_new()
  workBook.Props = {
    Title: Text.Team.Title,
    Subject: Text.Team.Subject,
    Author: Text.Team.Author,
    CreatedDate: moment()._d
  }
  workBook.SheetNames.push('Learners')
  const workSheetData = data.map(item => {
    return {
      UserName: item?.FirstName && item?.LastName ? `${item?.FirstName} ${item?.LastName}` : Text.noData,
      Email: item?.Email || item?.InvitationEmail || Text.noData,
      CreationDate: (item?.CreationDate ? moment(item?.CreationDate).format(DMYDateFormat) : Text.none),
      LastConnectionDate: (item?.LastConnectionDate ? moment(item?.LastConnectionDate).format(DMYDateFormat) : Text.none),
      LicenseType: organizationLicenseTypes?.[item?.OrganizationLicenseType] || organizationLicenseTypes?.[item?.InvitationLicenseType] || Text.withoutLicense,
      ExpirationDate: (item?.EndDate ? moment(item?.EndDate).format(DMYDateFormat) : Text.none),
      TeamName: item?.TeamName
    }
  })
  const headers = {
    UserName: Text.headers.fullName,
    Email: Text.headers.email,
    CreationDate: Text.headers.CreationDate,
    LastConnectionDate: Text.headers.LastConnectionDate,
    LicenseType: Text.headers.LicenseType,
    ExpirationDate: Text.headers.subscriptionEndDate,
    TeamName: Text.headers.team
  }
  workSheetData.unshift(headers)
  const workSheet = XLSX.utils.json_to_sheet(workSheetData, { skipHeader: true })
  const colsWidth = [180, 180, 180, 180, 180, 180, 180]
  workSheet['!cols'] = colsWidth.map(colWidth => { return { wpx: colWidth } })
  workBook.Sheets.Learners = workSheet
  const workBookResult = XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
  const stringToArrayBuffer = (workBookResult) => {
    const buf = new ArrayBuffer(workBookResult.length)
    const view = new Uint8Array(buf)
    for (let index = 0; index < workBookResult.length; index++) view[index] = workBookResult.charCodeAt(index) & 0xFF
    return buf
  }
  const blob = new window.Blob([stringToArrayBuffer(workBookResult)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, `${Text.Team.FilePrefix}_${fileName}.xlsx`)
}

const switchDayRanges = (data, DayRanges) => {
  switch (DayRanges) {
    case 1:
    case 2:
      return Array(1).fill(0).map((_, index) => parseInt(data[index + 1]) || 0)
    case 3:
    case 4:
      return Array(7).fill(0).map((_, index) => parseInt(data[index + 1]) || 0)
    case 5:
    case 6:
      return Array(4).fill(0).map((_, index) => parseInt(data[index + 1]) || 0)
    case 7:
      return Array(12).fill(0).map((_, index) => parseInt(data[index + 1]) || 0)
    default:
      return Array(1).fill(0).map((_, index) => parseInt(data[index + 1]) || 0)
  }
}

export const HomeBarChartFormat = (data = {}, DayRanges) => {
  return {
    labels:
      (DayRanges === 1 || DayRanges === 2)
        ? [Text.today]
        : (DayRanges === 3 || DayRanges === 4)
            ? [Text.monday, Text.tuesday, Text.wednesday, Text.thursday, Text.friday, Text.saturday, Text.sunday]
            : (DayRanges === 5 || DayRanges === 6)
                ? [Text.week1, Text.week2, Text.week3, Text.week4]
                : [Text.january, Text.february, Text.march, Text.april, Text.may, Text.june, Text.july, Text.august, Text.september, Text.october, Text.november, Text.december],
    datasets: [
      {
        radius: 0,
        data: switchDayRanges(data, DayRanges),
        backgroundColor: [
          blue[0]
        ]
      }
    ]
  }
}

export const barChartFormat = (data = {}) => {
  return {
    labels: [Text.week1, Text.week2, Text.week3, Text.week4],
    datasets: [
      {
        radius: 0,
        data: Object.values(data),
        backgroundColor: [
          blue[0]
        ]
      }
    ]
  }
}

export const calculatePercentage = (total, value) => {
  return Math.floor((value / total) * 100) || 0
}

export const calculateAverage = (total, value) => {
  return Math.round(value / total) || 0
}

const radarCategoryLabel = ''

export const radarChartFormat = (data = []) => {
  const isAllZero = data.every(item => item === 0)
  return {
    labels: data.map(item => radarCategoryLabel),
    datasets: [
      {
        radius: 0,
        data: isAllZero ? [] : data,
        borderColor: [
          blue[0]
        ],
        backgroundColor: [
          `${blue[0]}5d`
        ],
        tension: 0.1,
        spanGaps: true
      }
    ]
  }
}

export let startDate = todayDate
export let endDate
export let dateType = 3

export const chartDateHandler = (DayRanges) => {
  switch (DayRanges) {
    case 1:
      startDate = todayDate
      endDate = undefined
      dateType = 3
      break
    case 2:
      startDate = yesterdayDate
      endDate = undefined
      dateType = 3
      break
    case 3:
      startDate = startOfCurrentWeek
      endDate = endOfCurrentWeek
      dateType = 3
      break
    case 4:
      startDate = startOfLastWeek
      endDate = endOfLastWeek
      dateType = 3
      break
    case 5:
      startDate = startOfCurrentMonth
      endDate = endOfCurrentMonth
      dateType = 2
      break
    case 6:
      startDate = startOfLastMonth
      endDate = endOfLastMonth
      dateType = 2
      break
    case 7:
      startDate = startOfThisYear
      endDate = endOfThisYear
      dateType = 1
      break
    case 8:
      startDate = startOfLastYear
      endDate = endOfLastYear
      dateType = 1
      break
    default:
      startDate = todayDate
      endDate = undefined
  }
}

export const dateToStringFormat = (from, to) => {
  const start = moment(from).format(DMYDateFormat)
  const end = moment(to).format(DMYDateFormat)
  if (start === end && start === todayDate) {
    return Text.today
  } else if (start === end && start === yesterdayDate) {
    return Text.yesterday
  } else if (start === startOfCurrentWeek && end === endOfCurrentWeek) {
    return Text.thisWeek
  } else if (start === startOfLastWeek && end === endOfLastWeek) {
    return Text.lastWeek
  } else if (start === startOfCurrentMonth && end === endOfCurrentMonth) {
    return Text.thisMonth
  } else if (start === startOfLastMonth && end === endOfLastMonth) {
    return Text.lastMonth
  } else if (start === startOfThisYear && end === endOfThisYear) {
    return Text.thisYear
  } else if (start === startOfLastYear && end === endOfLastYear) {
    return Text.lastYear
  }
  return `${start} - ${end}`
}

export const isExpired = (date) => {
  return moment(date).isSameOrBefore(moment(), 'day')
}

export const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

export const exportOrganizationsLearningHoursHelper = (data, fileName) => {
  const workBook = XLSX.utils.book_new()
  workBook.Props = {
    Title: Text.OrganizationLearning.Title,
    Subject: Text.OrganizationLearning.Subject,
    Author: Text.OrganizationLearning.Author,
    CreatedDate: moment()._d
  }
  workBook.SheetNames.push('visionnage')
  const workSheetData = data.map(item => {
    return {
      Email: item.Email,
      LastWatchedDate: item.LastWatchedDate ? moment(item.LastWatchedDate).format(HourlyDateFormat) : '',
      VideoTitle: item.VideoTitle,
      CourseTitle: item.CourseTitle
    }
  })
  const headers = {
    Email: 'Email',
    LastWatchedDate: 'Heure de visionnage (GMT)',
    VideoTitle: 'Video',
    CourseTitle: 'Formation'
  }
  workSheetData.unshift(headers)
  const workSheet = XLSX.utils.json_to_sheet(workSheetData, { skipHeader: true })
  const colsWidth = [180, 180, 180, 180]
  workSheet['!cols'] = colsWidth.map(colWidth => { return { wpx: colWidth } })
  workBook.Sheets.visionnage = workSheet
  const workBookResult = XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
  const stringToArrayBuffer = (workBookResult) => {
    const buf = new ArrayBuffer(workBookResult.length)
    const view = new Uint8Array(buf)
    for (let index = 0; index < workBookResult.length; index++) view[index] = workBookResult.charCodeAt(index) & 0xFF
    return buf
  }
  const blob = new window.Blob([stringToArrayBuffer(workBookResult)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, `${Text.OrganizationLearning.FilePrefix}_${fileName}.xlsx`)
}
