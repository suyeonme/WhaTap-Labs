import { useEffect, useState, useCallback } from 'react';

import api from 'api/api';

const useFetch = endpoints => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async endpoints => {
      const temp = [];

      try {
        await setLoading(false);
        for (let i of endpoints) {
          const res = await api.spot(i);
          await temp.push(res);
        }
        await setData(temp);
        setTimeout(() => fetchData(endpoints), 20000);
      } catch (err) {
        await setError(error);
        setTimeout(() => fetchData(endpoints), 20000);
      }
    },
    [error]
  );

  useEffect(() => {
    fetchData(endpoints);
  }, [fetchData, endpoints]);

  return [data, loading, error];
};

export default useFetch;
