import { blue } from '@pro_boa/ui'
export default ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 24,
    border: '1px solid #F0F5F9',
    padding: 24
  },
  selectListContainer: {
    width: 48,
    marginLeft: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowStyle: {
    fontSize: 8,
    color: blue[1]
  },
  arrowContainerLeft: {
    width: 20,
    cursor: ({ arrowDisableConditions }) => arrowDisableConditions.left ? 'default' : 'pointer',
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2F7',
    borderRadius: 4,
    opacity: ({ arrowDisableConditions }) => arrowDisableConditions.left ? 0.5 : 1
  },
  arrowContainerRight: {
    width: 20,
    cursor: ({ arrowDisableConditions }) => arrowDisableConditions.right ? 'default' : 'pointer',
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2F7',
    borderRadius: 4,
    opacity: ({ arrowDisableConditions }) => arrowDisableConditions.right ? 0.5 : 1
  },
  doubleArrowContainerRight: {
    width: 20,
    cursor: ({ arrowDisableConditions }) => arrowDisableConditions.doubleRight ? 'default' : 'pointer',
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2F7',
    borderRadius: 4,
    marginLeft: 8,
    opacity: ({ arrowDisableConditions }) => arrowDisableConditions.doubleRight ? 0.5 : 1
  },
  doubleArrowContainerLeft: {
    width: 20,
    cursor: ({ arrowDisableConditions }) => arrowDisableConditions.doubleLeft ? 'default' : 'pointer',
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2F7',
    borderRadius: 4,
    marginRight: 8,
    opacity: ({ arrowDisableConditions }) => arrowDisableConditions.doubleLeft ? 0.5 : 1
  }
})
