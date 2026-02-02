import { useSearchParams } from 'react-router'

export function useGetTokenFromQueryParam() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  return {
    token,
    hasToken: !!token,
    isValidToken: token?.length > 0,
  }
}
