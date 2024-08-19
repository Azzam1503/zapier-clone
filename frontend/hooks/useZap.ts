import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";

interface Action {
  id: string;
  zapId: string;
  actionId: string;
  sortingOrder: number;
  type: {
    id: string;
    name: string;
  };
}
interface Trigger {
  id: string;
  zapId: string;
  trigerrId: string;
  type: {
    id: string;
    name: string;
  };
}
export interface Zap {
  id: string;
  triggerId: string;
  userId: string;
  actions: Action[];
  trigger: Trigger;
}

export function useZaps() {
  const [loading, setLoading] = useState(false);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    try {
      setLoading(true);
      const getZaps = () => {
        axios
          .get(`${BACKEND_URL}/api/v1/zap`, {
            withCredentials: true,
          })
          .then((res) => {
            setZaps(res.data.zaps);
          });
      };
      getZaps();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { zaps, loading };
}
