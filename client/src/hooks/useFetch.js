import { useEffect, useState } from "react";
import axios from "axios";
export const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      if (res.data) {
        setResponse(res.data);
      }
    } catch (err) {
      console.log(err);
      setErr(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  return { loading, response, err };
};
