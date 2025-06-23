export default {
  root: {
    marginLeft: ({ marginLeft }) => marginLeft || 0,
    marginRight: ({ marginRight }) => marginRight || 0,
    width: ({ noWidthPreset }) => noWidthPreset ? 'auto' : '100%'
  }
}
