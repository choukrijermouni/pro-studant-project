import moment from 'moment'

const staticRangeHandler = {
  range: {},
  isSelected (range) {
    const definedRange = this.range()
    return (
      moment(range.startDate).isSame(definedRange.startDate, 'day') &&
      moment(range.endDate).isSame(definedRange.endDate, 'day')
    )
  }
}

export function createStaticRanges (ranges) {
  return ranges.map(range => ({ ...staticRangeHandler, ...range }))
}

export const defaultStaticRanges = createStaticRanges([
  {
    label: 'Aujourd\'hui',
    range: () => ({
      startDate: moment()._d,
      endDate: moment()._d
    })
  },
  {
    label: 'Hier',
    range: () => ({
      startDate: moment().subtract(1, 'd')._d,
      endDate: moment().subtract(1, 'd')._d
    })
  },
  {
    label: 'Cette semaine',
    range: () => ({
      startDate: moment().startOf('week').add(1, 'd')._d,
      endDate: moment().endOf('week').add(1, 'd')._d
    })
  },
  {
    label: 'La semaine dernière',
    range: () => ({
      startDate: moment().subtract(1, 'weeks').startOf('week').add(1, 'd')._d,
      endDate: moment().subtract(1, 'weeks').endOf('week').add(1, 'd')._d
    })
  },
  {
    label: 'Ce mois-ci',
    range: () => ({
      startDate: moment().startOf('month')._d,
      endDate: moment().endOf('month')._d
    })
  },
  {
    label: 'Le mois dernier',
    range: () => ({
      startDate: moment().subtract(1, 'month').startOf('month')._d,
      endDate: moment().subtract(1, 'month').endOf('month')._d
    })
  },
  {
    label: 'Cette année',
    range: () => ({
      startDate: moment().startOf('year')._d,
      endDate: moment().endOf('year')._d
    })
  },
  {
    label: 'L\'année dernière',
    range: () => ({
      startDate: moment().subtract(1, 'year').startOf('year')._d,
      endDate: moment().subtract(1, 'year').endOf('year')._d
    })
  }
])
