import { useLocation } from 'react-router-dom'

interface Result {
  [key: string]: any
}

export const useQuery = () => {
  const query = useLocation().search
  return query
    .replace('?', '')
    .split('&')
    .map((q) => q.split('='))
    .reduce((result: Result, q) => {
      result[q[0]] = q[1]
      return result
    }, {})
}
