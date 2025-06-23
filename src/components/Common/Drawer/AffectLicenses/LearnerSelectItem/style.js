export default ({
  learnerContainer: {
    display: 'flex',
    cursor: ({ disabled }) => disabled ? 'auto' : 'pointer',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '8px 0',
    opacity: ({ disabled }) => disabled ? '.28' : '1'
  },
  checkBoxStyle: {
    display: 'none'
  },
  avatarStyle: {
    marginLeft: 8
  }
})
