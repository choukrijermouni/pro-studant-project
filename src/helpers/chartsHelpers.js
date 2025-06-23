import Text from './text.json'
import { MDYDateFormat, dateTypesConstenants } from 'constants/'
import moment from 'moment'
import {
  blue
} from '@pro_boa/ui'

export const generateBarChartData = (data, labelsAndDateTypes) => {
  const newData = []
  switch (labelsAndDateTypes.dateType) {
    case dateTypesConstenants.oneDay:
      labelsAndDateTypes.dates?.map((el, index) => {
        const indexOfLabel = Object.keys(data).findIndex(element => {
          return moment(element).isSame(el)
        })
        if (indexOfLabel >= 0) {
          return newData.push(data[Object.keys(data)[indexOfLabel]])
        } else {
          return newData.push(0)
        }
      })
      break
    case dateTypesConstenants.week:
      labelsAndDateTypes.dates?.map((el, index) => {
        const indexOfLabel = Object.keys(data).findIndex(element => {
          return moment(element).isSame(el)
        })
        if (indexOfLabel >= 0) {
          return newData.push(data[Object.keys(data)[indexOfLabel]])
        } else {
          return newData.push(0)
        }
      })
      break
    case dateTypesConstenants.month:
      labelsAndDateTypes.dates?.map((el, index) => {
        const indexOfLabel = Object.keys(data).findIndex(element => {
          return moment(element).isSame(el)
        })
        if (indexOfLabel >= 0) {
          return newData.push(data[Object.keys(data)[indexOfLabel]])
        } else {
          return newData.push(0)
        }
      })
      break
    case dateTypesConstenants.year:
      labelsAndDateTypes.dates?.map((el, index) => {
        const indexOfLabel = Object.keys(data).findIndex(element => {
          return moment(element).isSame(el, 'month') && moment(element).isSame(el, 'year')
        })
        if (indexOfLabel >= 0) {
          return newData.push(data[Object.keys(data)[indexOfLabel]])
        } else {
          return newData.push(0)
        }
      })
      break
    case dateTypesConstenants.moreThanYear:
      labelsAndDateTypes.dates?.map((el, index) => {
        const indexOfLabel = Object.keys(data).findIndex(element => {
          return moment(element).isSame(el, 'year')
        })
        if (indexOfLabel >= 0) {
          return newData.push(data[Object.keys(data)[indexOfLabel]])
        } else {
          return newData.push(0)
        }
      })
      break
    default:
      for (let i = 0; i < labelsAndDateTypes.labels.length; i++) {
        newData.push(data[i] || 0)
      }
      break
  }
  return newData
}

export const getYears = (startDate, endDate) => {
  const years = []
  let startYear = moment(startDate).year()
  const endYear = moment(endDate).year()
  while (startYear <= endYear) {
    years.push(startYear++)
  }
  return years
}

export const getMonthDays = (startDate, endDate) => {
  const days = []
  const dates = []
  const startDateMoment = moment(startDate)
  const endDateMoment = moment(endDate)
  while (startDateMoment.isSameOrBefore(endDateMoment)) {
    days.push(startDateMoment.format('DD MMM'))
    dates.push(startDateMoment.format(MDYDateFormat))
    startDateMoment.add(1, 'days')
  }
  return {
    label: days,
    date: dates
  }
}

export const barChartFormat = (data = {}, labelsAndDateTypes = []) => {
  return {
    labels: [...labelsAndDateTypes.labels],
    datasets: [
      {
        radius: 0,
        data: generateBarChartData(data, labelsAndDateTypes),
        backgroundColor: [
          blue[0]
        ]
      }
    ]
  }
}

export const getWeekDays = (startDate, endDate) => {
  const days = []
  const dates = []
  const startDateMoment = moment(startDate)
  const endDateMoment = moment(endDate)
  while (startDateMoment.isSameOrBefore(endDateMoment)) {
    dates.push(startDateMoment.format(MDYDateFormat))
    days.push(startDateMoment.locale('fr').format('dddd DD MMM'))
    startDateMoment.add(1, 'days')
  }
  return {
    label: days,
    date: dates
  }
}

export const getYearMonths = (startDate, endDate) => {
  const months = []
  const dates = []
  const startDateMoment = moment(startDate)
  const endDateMoment = moment(endDate)
  while (startDateMoment.isSameOrBefore(endDateMoment)) {
    months.push(startDateMoment.locale('fr').format('MMMM').charAt(0).toUpperCase() + startDateMoment.locale('fr').format('MMMM').slice(1))
    dates.push(startDateMoment.format(MDYDateFormat))
    startDateMoment.add(1, 'month')
  }
  return {
    label: months,
    date: dates
  }
}

export const generateDateTypeAndLabels = (startDate, endDate) => {
  const startDateMoment = moment(startDate)
  const endDateMoment = moment(endDate)
  const daysCount = {
    isYear: endDateMoment.add(1, 'days').diff(startDateMoment, 'years'),
    isMonth: endDateMoment.add(1, 'days').diff(startDateMoment, 'month'),
    days: moment(endDate).diff(moment(startDate), 'days')
  }
  switch (true) {
    case daysCount.days > 365:
      return {
        dateType: dateTypesConstenants.moreThanYear,
        labels: [...getYears(startDate, endDate)]
      }
    case daysCount.isYear <= 1 && daysCount.days > 30:
      return {
        dateType: dateTypesConstenants.year,
        labels: [...getYearMonths(startDate, moment(startDate).add(1, 'year')).label],
        dates: [...getYearMonths(startDate, moment(startDate).add(1, 'year')).date]
      }
    case daysCount.isMonth <= 1 && daysCount.days >= 7:
      return {
        dateType: dateTypesConstenants.month,
        labels: [...getMonthDays(startDate, moment(startDate).add(1, 'month')).label],
        dates: [...getMonthDays(startDate, moment(startDate).add(1, 'month')).date]
      }
    case daysCount.days < 7 && daysCount.days >= 1:
      return {
        dateType: dateTypesConstenants.week,
        labels: [...getWeekDays(startDate, moment(startDate).add(7, 'days')).label],
        dates: [...getWeekDays(startDate, moment(startDate).add(7, 'days')).date]
      }
    case moment(startDate).isSame(moment(), 'day') && moment(endDate).isSame(moment(), 'day'):
      return {
        dateType: dateTypesConstenants.oneDay,
        labels: [Text.today],
        dates: [moment(startDate).format(MDYDateFormat)]
      }
    case moment(startDate).isSame(moment().subtract(1, 'd'), 'day') && moment(endDate).isSame(moment().subtract(1, 'd'), 'day'):
      return {
        dateType: dateTypesConstenants.oneDay,
        labels: [Text.yesterday],
        dates: [moment(startDate).format(MDYDateFormat)]
      }
    default:
      return {
        dateType: dateTypesConstenants.oneDay,
        labels: [moment(startDate).locale('fr').format('dddd, Do MMMM YYYY')],
        dates: [moment(startDate).format(MDYDateFormat)]
      }
  }
}
