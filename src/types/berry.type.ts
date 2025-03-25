export interface Berry {
    id: number;
    name: string;
    growth_time: number;
    max_harvest: number;
    natural_gift_power: number;
    size: number;
    smoothness: number;
    soil_dryness: number;
    firmness: {
      name: string;
      url: string;
    };
    flavors: Array<{
      potency: number;
      flavor: {
        name: string;
        url: string;
      };
    }>;
    item: {
      name: string;
      url: string;
    };
    natural_gift_type: {
      name: string;
      url: string;
    };
  }
  
  export interface BerryListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
      name: string;
      url: string;
    }>;
  }
  
  export interface BerryState {
    berries: Array<{
      id: number;
      name: string;
      url: string;
    }>;
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
    searchQuery: string;
    selectedBerry: Berry | null;
    isLoading: boolean;
  }