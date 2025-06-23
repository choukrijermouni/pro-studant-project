import { blue } from '@pro_boa/ui'

export default {
  controls: {
    display: 'flex',
    marginBottom: 24
  },
  coursesContainer: {
    maxHeight: 500,
    paddingRight: 5,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 5
    },
    '&::-webkit-scrollbar-thumb': {
      background: blue[1],
      borderRadius: 50
    }
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px 0 24px 0',
    minWidth: 900
  },
  searchBar: {
    width: 300
  },
  ctaStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 600,
    gap: 10
  },
  actionContainer: {
    display: 'flex'
  },
  firstPart: {
    width: '48%',
    display: 'flex',
    alignItems: 'center'
  },
  secondPart: {
    width: '48%',
    columnGap: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}
