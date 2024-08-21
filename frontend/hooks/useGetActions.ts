import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";

export interface AvailableAction {
  id: string;
  name: string;
  image: string;
}
export const useGetActions = () => {
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState<AvailableAction[]>([]);

  useEffect(() => {
    try {
      setLoading(true);
      const getActions = async () => {
        const res = await axios.get(`${BACKEND_URL}/api/v1/action/available`);
        console.log("actionssss hereeee----", res);
        setActions(res.data.actions);
      };
      getActions();
    } catch (error) {
      console.log("in the actions", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, actions };
};

export default useGetActions;
