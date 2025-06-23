export default ({
  totalLicencesContainer: {
    backgroundColor: ({ hideLicensesContainer }) => hideLicensesContainer ? 'rgba(234,52,36,0.1)' : 'rgba(2,197,140,0.1)',
    borderRadius: 8,
    width: 39,
    height: 39,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24
  },
  licensesLeftContainer: {
    backgroundColor: ({ hideLicensesContainer }) => hideLicensesContainer ? 'rgba(234,52,36,0.1)' : 'rgba(2,197,140,0.09)',
    height: 86,
    borderRadius: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  licenseTypesContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  subTypeContainer: {
    height: 23,
    width: 23,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3767da2e'
  },
  remainingLicensesContainer: {
    marginLeft: 24
  }
})
