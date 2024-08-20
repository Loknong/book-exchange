import { useEffect, useState } from "react";
import { ApiHook } from "./useAPI";
import axios, { AxiosError } from "axios";

export class AddressApi<T> extends ApiHook<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }
  fetchList = (params: { userId: number; addressMode: string }) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if(!params.userId) return;
      const fetchData = async () => {
        setLoading(true);
        try {
          const token = this.getToken();
          const response = await axios.post(this.fullUrl, params, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          setData(response.data);
        } catch (err) {
          const axiosError = err as AxiosError;
          setError(
            (axiosError.response?.data as { message: string })?.message ||
              axiosError.message ||
              "Failed to fetch data"
          );
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [this.fullUrl, params.userId, params.addressMode]);

    return { data, loading, error };
  };
}
