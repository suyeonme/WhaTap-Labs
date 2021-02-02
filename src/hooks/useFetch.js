import { useEffect, useState, useCallback } from 'react';

import useFirstRender from './useFirstRender';
import api from '../api/api';

// isFirstRender ? Fetch right away : setInterval()

const useFetch = endpoints => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFirstRender = useFirstRender(); // (*)

  const fetchData = useCallback(
    async endpoints => {
      try {
        const res = await api.getDataSeries(endpoints);
        setData(res);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(error);
      }
    },
    [data]
  );

  useEffect(() => {
    const timer = setInterval(() => fetchData(endpoints), 5000);
    return () => clearInterval(timer);
  });

  return [data, loading, error];
};

export default useFetch;
