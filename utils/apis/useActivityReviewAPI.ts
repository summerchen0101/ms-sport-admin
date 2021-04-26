import { ProcessStatus } from '@/lib/enums'
import {
  ActivityReview,
  ActivityReviewListRequest,
  ActivityReviewListResponse,
} from '@/types/api/ActivityReview'
import useRequest from '../useRequest'

function useActivityReviewAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: ActivityReviewListRequest) =>
      post<ActivityReviewListResponse>('activity_rec/list', req),
    fetchById: (id: number) => get<ActivityReview>(`activity_rec/view/${id}`),
    status: (id: number, status: ProcessStatus) =>
      post<null>('activity_rec/status', { id, status }),
    edit: (id: number, bonus: number) =>
      post<null>('activity_rec/edit', { id, bonus }),
    pay: (id: number) => post<null>('activity_rec/pay', { id }),
  }
}

export default useActivityReviewAPI
