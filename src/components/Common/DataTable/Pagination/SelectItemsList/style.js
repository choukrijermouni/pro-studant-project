import { Colors, neutral, blue } from '@pro_boa/ui'
export default ({
  selectListContainer: {
    position: 'relative',
    width: 48
  },
  selectList: {
    overflow: 'hidden',
    position: 'relative',
    height: 21,
    width: 48,
    padding: '5px 0 5px 5px',
    border: '1px solid #EEF2F7',
    borderRadius: 4,
    backgroundColor: neutral[0],
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  suggestionGroup: {
    width: 48,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: `0 3px 4px 0 ${Colors.SearchableSelectListColors.boxShadow1}, 0 0 1px 0 ${Colors.SearchableSelectListColors.boxShadow2}`,
    backgroundColor: Colors.SearchableSelectListColors.background,
    position: 'absolute',
    zIndex: 5,
    padding: '5px 0 5px 5px',
    overflow: 'auto',
    transition: 'all 0.15s ease',
    maxHeight: ({ toggleSuggestionList }) => toggleSuggestionList ? 252 : 0,
    transform: ({ toggleSuggestionList }) => toggleSuggestionList ? 'scaleY(1)' : 'scaleY(0)',
    transformOrigin: 'top center',
    '&::-webkit-scrollbar': {
      width: 4
    },
    '&::-webkit-scrollbar-thumb': {
      background: Colors.SearchableSelectListColors.scroll,
      borderRadius: 2
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: Colors.SearchableSelectListColors.scrollHover
    }
  },
  arrowContainer: {
    width: 14,
    height: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2F7',
    borderRadius: 4
  },
  arrowStyle: {
    fontSize: 5,
    color: blue[0]
  }
})
