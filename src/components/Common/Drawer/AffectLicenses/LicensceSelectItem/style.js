export default ({
  licenseSelectItem: {
    height: 46,
    width: ({ width }) => width || 152,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: ({ selected }) => selected ? '#D9DFEE' : '#00000000',
    cursor: 'pointer',
    border: '1px solid #A9BDEB',
    '&:hover': {
      backgroundColor: '#D9DFEE'
    }
  }
})
