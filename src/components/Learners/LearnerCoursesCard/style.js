import { neutral, blue } from '@pro_boa/ui'

export default {
  buttonContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  LearningCardsContainer: {
    margin: '12px 0 12px 0'
  },
  selectItem: {
    width: 100
  },
  controls: {
    display: 'flex',
    marginBottom: 24
  },
  iconButton: {
    fontSize: 14,
    backgroundColor: neutral[2],
    color: blue[0],
    marginRight: 8,
    transition: 'transform 0.2s ease'
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    height: 45,
    width: 184,
    borderRadius: 4,
    backgroundColor: `${blue[0]}2D`,
    border: 'none',
    outline: 'none',
    '&:hover > $iconButton': {
      transform: 'translateY(-3px)'
    },
    '&:hover': {
      backgroundColor: `${blue[1]}2D`
    }
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
  }
}
