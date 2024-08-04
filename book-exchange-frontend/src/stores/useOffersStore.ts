// src/stores/useOffersStore.ts
import create from "zustand";
import { Offer } from "../types/base/offers.types";
import { ApiHook } from "../hooks/useAPI";

const offerApi = new ApiHook<Offer>("/api/exchange/offers");

interface OffersState {
  offers: Offer[];
  loading: boolean;
  error: string | null;
  fetchOffers: () => void;
  createOffer: (data: Offer) => void;
  updateOffer: (id: string, data: Offer) => void;
  deleteOffer: (id: string) => void;
}

export const useOffersStore = create<OffersState>((set) => ({
  offers: [],
  loading: false,
  error: null,
  fetchOffers: async () => {
    set({ loading: true });
    try {
      const { data } = await offerApi.useFetch();
      set({ offers: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  createOffer: async (data: Offer) => {
    set({ loading: true });
    try {
      await offerApi.useCreate()(data);
      set((state) => ({ offers: [...state.offers, data], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  updateOffer: async (id: string, data: Offer) => {
    set({ loading: true });
    try {
      await offerApi.useUpdate(id)(data);
      set((state) => ({
        offers: state.offers.map((offer) =>
          offer.id === id ? { ...offer, ...data } : offer
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  deleteOffer: async (id: string) => {
    set({ loading: true });
    try {
      await offerApi.useDelete(id)();
      set((state) => ({
        offers: state.offers.filter((offer) => offer.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
