import { berryApi } from './api'
import type { BerryListResponse, Berry } from '../types/berry.type'

export const getBerries = async (
  limit: number = 20,
  offset: number = 0,
): Promise<BerryListResponse> => {
  const response = await berryApi.get<BerryListResponse>(`/berry?limit=${limit}&offset=${offset}`)
  return response.data
}

export const getBerryByName = async (name: string): Promise<Berry> => {
  const response = await berryApi.get<Berry>(`/berry/${name}`)
  return response.data
}

export const getBerryById = async (id: number): Promise<Berry> => {
  const response = await berryApi.get<Berry>(`/berry/${id}`)
  return response.data
}
