export interface User {
  name: string
  email: string
  avatarUrl: string
}

export type FetchListFunc = (
  page: number,
  perPage: number
) => Promise<ListItem[]>
