import { AppDispatch } from '@/shared/redux/store'
import { setError, setLoading } from '@/features/common/commomSlice'

export const trackAsyncThunk = async <T>(
  key: string,
  thunk: () => Promise<T>,
  dispatch: AppDispatch,
): Promise<T | undefined> => {
  dispatch(setLoading({ key, value: true }))
  dispatch(setError({ key, value: null }))

  try {
    return await thunk()
  } catch (error: any) {
    dispatch(setError({ key, value: error?.message || 'Unexpected error' }))
    return undefined
  } finally {
    dispatch(setLoading({ key, value: false }))
  }
}
// const isLoading = useAppSelector((s) => s.ui.loadingMap['product/list'])
// const error = useAppSelector((s) => s.ui.errorMap['product/list'])
//
// return (
//   <div>
//     {isLoading && <Loading />}
// {error && <p className="text-red-500">{error}</p>}
//   {!isLoading && !error && <ProductList />}
//   </div>
// )
