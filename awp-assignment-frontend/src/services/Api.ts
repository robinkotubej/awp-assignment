import oAuth from '../types/oAuth'
import Wish from '../types/Wish'
import User from '../types/User'

interface CreateExtraWishProps {
  accessToken: string
  title: string
  description?: string
  externalUrl?: string
}

export const getApiUrl = () => {
  if (window.location.origin === 'http://164.90.164.4') {
    return 'http://164.90.164.4:8080'
  } else return 'http://localhost:8080'
}

class Api {
  // new api

  static async authorizeUser(email: string, password: string) {
    const response = await fetch(`${getApiUrl()}/oauth/authorize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    return data
  }

  static async renewToken(accessToken: string) {
    const response = await fetch(`${getApiUrl()}/oauth/renewToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    })
    const data = await response.json()
    return data as oAuth
  }

  static async getWishes() {
    const response = await fetch(`${getApiUrl()}/api/get-wishes`)
    const data = await response.json()
    if (response.status >= 400) throw Error(data.error)
    return data as Wish[]
  }

  static async getWish(userId: string, wishId: string) {
    const response = await fetch(
      `${getApiUrl()}/api/get-wish/${userId}/${wishId}`
    )
    const data = await response.json()
    if (response.status >= 400) throw Error(data.error)
    return data as Wish
  }

  static async createWish({
    accessToken,
    title,
    description,
    externalUrl,
  }: CreateExtraWishProps) {
    const response = await fetch(`${getApiUrl()}/create-wish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title,
        description,
        externalUrl,
      }),
    })
    const data = await response.json()
    if (response.status >= 400) throw data
    return data
  }

  static async getUser(userId: string) {
    const response = await fetch(`${getApiUrl()}/api/get-user/${userId}`)
    const data = await response.json()
    if (response.status >= 400) throw Error(data.error)
    return data as User
  }

  static async getUserComplete(userId: string) {
    const response = await fetch(
      `${getApiUrl()}/api/get-user-complete/${userId}`
    )
    const data = await response.json()
    if (response.status >= 400) throw Error(data.error)
    return data as User
  }

  static async createComment(
    ownerId: string,
    wishId: string,
    username: string,
    comment: string
  ) {
    const response = await fetch(
      `${getApiUrl()}/api/create-comment/${ownerId}/${wishId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          comment,
        }),
      }
    )
    const data = await response.json()
    if (response.status >= 400) throw data
    return data as Wish
  }
}

export default Api
