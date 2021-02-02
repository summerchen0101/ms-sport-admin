import { NewsType } from '@/lib/enums'
import { Status } from '@chakra-ui/react'

export interface News {
  id: number
  title: string
  content: string
  start_at: number
  end_at: number
  is_active: boolean
  news_type: NewsType

  editor: string
  created_at: number
  updated_at: number
}

export interface NewsListRequest {
  title: string
  start_at: number
  end_at: number
  is_active: Status
  news_type: NewsType
  page: number
  perpage: number
}

export interface NewsListResponse {
  list: News[]
  total_count: number
  total_page: number
}

export interface NewsActiveRequest {
  id: number
  is_active: boolean
}

export interface NewsCreateRequest {
  name: string
  is_active: boolean
}
export interface NewsEditRequest {
  id: number
  name: string
  is_active: boolean
}
