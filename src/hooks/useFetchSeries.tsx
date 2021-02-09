import { useEffect, useState, useCallback } from 'react';

import api from 'api/api';
// import { GroupData } from 'types/types';
// type DataStatus = [GroupData, boolean, string];

const HOUR = 1000 * 60 * 60;
let stime = Date.now() - HOUR;
let etime = Date.now();

// Implement Typescript
// 5초 단위로 갱신
// Initial: 30min -> 5sec

const useFetchSeries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async (): Promise<any> => {
    try {
      const res = await api.series('visitor_5m/{stime}/{etime}', {
        stime,
        etime,
      });
      await setData(res.data.data);
      await setLoading(false);
      setTimeout(() => fetchData(), 5000);
    } catch (err) {
      await setError(error);
      setTimeout(() => fetchData(), 5000);
    }
  }, [error]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [data, loading, error];
};

export default useFetchSeries;
