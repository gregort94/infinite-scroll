import { User } from '@/models'
import axios from 'axios'

interface ApiUser {
  [key: string]: any
}

const ERROR_PROBABILITY = 0.5
const isRandomError = () => Math.random() < ERROR_PROBABILITY

const usersApi = axios.create({
  baseURL: 'https://randomuser.me/api',
})
usersApi.interceptors.response.use(
  (response) =>
    isRandomError() ? Promise.reject(new Error('random api error')) : response,
  (error) => Promise.reject(error)
)
const formatUserForInput = (user: ApiUser): User => {
  return {
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
    email: user.email,
    avatarUrl: user.picture.medium,
  }
}

export const fetchUsers = (
  page: number,
  itemsPerPage: number
): Promise<User[]> =>
  usersApi
    .get('/', {
      params: {
        results: itemsPerPage,
        page,
      },
    })
    .then(({ data }) =>
      data.results.map((user: ApiUser) => formatUserForInput(user))
    )
