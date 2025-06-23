import { Spacing, blue } from '@pro_boa/ui'
export default ({
  icon: {
    fontSize: 13,
    color: blue[0],
    lineHeight: '12px',
    marginRight: 24
  },
  columnStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pointer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  filterStyle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 0
  },
  customStyle: {
    margin: '2px 0'
  },
  tableStyle: {
    display: 'grid',
    border: '1px solid #F0F5F9',
    margin: 0,
    padding: 0,
    borderRadius: 4,
    width: '100%',
    '& thead': {
      '& tr': {
        width: '100%',
        display: 'inline-grid',
        gridTemplateColumns: ({ config }) => `repeat(${config.columns.length}, 1fr)`,
        '& td': {
          width: '100%',
          padding: () => Spacing(5, 0, 5, 5)
        }
      }
    },
    '& tbody': {
      '& tr': {
        '&:nth-child(2n)': {
          backgroundColor: '#FAFBFF',
          '&:hover': {
            backgroundColor: ({ inactive, loading }) => inactive || loading ? null : 'rgba(0, 0, 0, 0.04)'
          }
        },
        cursor: ({ inactive, loading }) => inactive || loading ? 'default' : 'pointer',
        width: '100%',
        display: 'inline-grid',
        '&:hover': {
          backgroundColor: ({ inactive, loading }) => inactive || loading ? null : 'rgba(0, 0, 0, 0.04)'
        },
        gridTemplateColumns: ({ config }) => `repeat(${config.columns.length}, 1fr)`,
        borderTop: '1px solid #F0F5F9',
        '& td': {
          width: '100%',
          padding: () => Spacing(4, 0, 4, 5)
        }
      }
    }
  }
})
