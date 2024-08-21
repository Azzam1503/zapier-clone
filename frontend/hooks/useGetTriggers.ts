import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";

export interface AvailableTrigger {
  id: string;
  name: string;
  image: string;
}
export const useGetTriggers = () => {
  const [loading, setLoading] = useState(false);
  const [triggers, setTriggers] = useState<AvailableTrigger[]>([]);

  useEffect(() => {
    try {
      setLoading(true);
      const getActions = async () => {
        const res = await axios.get(`${BACKEND_URL}/api/v1/trigger/available`);
        console.log("trigerrrs hereeee----", res);
        setTriggers(res.data.availabeTiggers);
      };
      getActions();
    } catch (error) {
      console.log("in the triggers", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, triggers };
};

export default useGetTriggers;
