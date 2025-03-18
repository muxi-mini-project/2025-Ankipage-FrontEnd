export interface Note {
  content: string
  createdtime: string
  updatedtime: string
  id: number
  title: string
  url: string
}

export interface APIResponse<T> {
  code: number
  data: T
  message: string
}
