// // src/hooks/useApi.ts
// import { useState, useEffect } from "react";
// import axios, { AxiosError } from "axios";

// export class ApiHook<T> {
//   private endpoint: string;

//   constructor(endpoint: string) {
//     this.endpoint = endpoint;
//   }

//   useFetch = () => {
//     const [data, setData] = useState<T | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//       const fetchData = async () => {
//         setLoading(true);
//         try {
//           const response = await fetch(this.endpoint);
//           if (!response.ok) {
//             throw new Error("Failed to fetch data");
//           }
//           const result = await response.json();
//           setData(result);
//         } catch (err) {
//           setError((err as Error).message);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }, [this.endpoint]);

//     return { data, loading, error };
//   };

//   useCreate = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const create = async (data: T) => {
//       setLoading(true);
//       try {
//         const response = await fetch(this.endpoint, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//         if (!response.ok) {
//           throw new Error("Failed to create data");
//         }
//         return await response.json();
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     return { create, loading, error };
//   };

//   useUpdate = (id: string) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const update = async (data: T) => {
//       setLoading(true);
//       try {
//         const response = await fetch(`${this.endpoint}/${id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//         if (!response.ok) {
//           throw new Error("Failed to update data");
//         }
//         return await response.json();
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     return { update, loading, error };
//   };

//   useDelete = (id: string) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const deleteData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`${this.endpoint}/${id}`, {
//           method: "DELETE",
//         });
//         if (!response.ok) {
//           throw new Error("Failed to delete data");
//         }
//         return await response.json();
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     return { deleteData, loading, error };
//   };
// }
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3003";
const BASE_URL = "http://localhost:3003";

// src/hooks/useApi.ts
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export class ApiHook<T> {
  protected fullUrl: string;

  constructor(endpoint: string) {
    this.fullUrl = `${BASE_URL}${endpoint}`;
  }

  protected getToken = () => {
    return localStorage.getItem("authToken");
  };

  useFetch = () => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const token = this.getToken();
          const response = await axios.get(this.fullUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
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
    }, [this.fullUrl]);

    return { data, loading, error };
  };

  useCreate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (data: T) => {
      setLoading(true);
      try {
        const token = this.getToken();
        const response = await axios.post(this.fullUrl, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as { message: string })?.message ||
            axiosError.message ||
            "Failed to create data"
        );
      } finally {
        setLoading(false);
      }
    };

    return { create, loading, error };
  };

  useUpdate = (id: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (data: T) => {
      setLoading(true);
      try {
        const token = this.getToken();
        const response = await axios.put(`${this.fullUrl}/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as { message: string })?.message ||
            axiosError.message ||
            "Failed to update data"
        );
      } finally {
        setLoading(false);
      }
    };

    return { update, loading, error };
  };

  useDelete = (id: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteData = async () => {
      setLoading(true);
      try {
        const token = this.getToken();
        const response = await axios.delete(`${this.fullUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as { message: string })?.message ||
            axiosError.message ||
            "Failed to delete data"
        );
      } finally {
        setLoading(false);
      }
    };

    return { deleteData, loading, error };
  };
}
