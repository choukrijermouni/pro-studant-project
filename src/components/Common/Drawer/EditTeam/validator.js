import Text from './text.json'

export default async values => {
  const errors = {}
  if (!values.name) {
    errors.name = Text.required
  }
  return errors
}
