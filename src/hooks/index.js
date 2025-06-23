import { useLocation } from 'react-router-dom'

export const useQuery = queryParameter => {
  const query = new URLSearchParams(useLocation().search)
  return query.get(queryParameter)
}
