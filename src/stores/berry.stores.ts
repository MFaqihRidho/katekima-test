import { defineStore } from 'pinia'
import { getBerries, getBerryByName } from '../service/berry.service'
import type { BerryState, Berry } from '../types/berry.type'

export const useBerryStore = defineStore('berry', {
  state: (): BerryState => ({
    berries: [],
    totalCount: 0,
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    selectedBerry: null,
    isLoading: false,
  }),

  getters: {
    filteredBerries: (state) => {
      if (!state.searchQuery) return state.berries

      return state.berries.filter((berry) =>
        berry.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )
    },

    paginatedBerries: (state) => {
      const startIndex = (state.currentPage - 1) * state.itemsPerPage
      const endIndex = startIndex + state.itemsPerPage

      // First filter by search query, then paginate
      const filtered = state.berries.filter((berry) =>
        berry.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )

      return filtered.slice(startIndex, endIndex)
    },

    totalPages: (state) => {
      const filtered = state.berries.filter((berry) =>
        berry.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )

      return Math.ceil(filtered.length / state.itemsPerPage)
    },
  },

  actions: {
    async fetchBerries() {
      this.isLoading = true
      try {
        // Fetch all berries at once for client-side filtering and pagination
        const response = await getBerries(100, 0)

        this.totalCount = response.count

        // Map results to include ID extracted from URL
        this.berries = response.results.map((berry) => {
          const urlParts = berry.url.split('/')
          const id = parseInt(urlParts[urlParts.length - 2])
          return {
            id,
            name: berry.name,
            url: berry.url,
          }
        })

        // Sort by name (ascending)
        this.berries.sort((a, b) => a.name.localeCompare(b.name))
      } catch (error) {
        console.error('Error fetching berries:', error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchBerryDetail(nameOrId: string | number) {
      this.isLoading = true
      try {
        const berry = await getBerryByName(nameOrId.toString())
        this.selectedBerry = berry
      } catch (error) {
        console.error('Error fetching berry detail:', error)
      } finally {
        this.isLoading = false
      }
    },

    setSearchQuery(query: string) {
      this.setPage(1)
      this.searchQuery = query
    },

    setPage(page: number) {
      this.currentPage = page
    },

    setItemsPerPage(count: number) {
      this.itemsPerPage = count
      this.currentPage = 1 // Reset to first page when changing items per page
    },
  },
  persist: {
    storage: sessionStorage,
    key: 'berryStore',
  },
})
