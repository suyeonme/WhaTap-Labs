import { useEffect, useState, useCallback } from 'react';

import api from 'api/api';
// import { GroupData } from 'types/types';
// type DataStatus = [GroupData, boolean, string];

const HOUR = 1000 * 60 * 60;
let stime = Date.now() - HOUR;
let etime = Date.now();

// 5초 단위로 갱신
// Initial: 30min -> 5sec
// fetchData (setTimeout)

const useFetchSeries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async (): Promise<any> => {
    try {
      const res = await api.series('exception/{stime}/{etime}', {
        stime,
        etime,
      });
      await setData(res.data.records);
      await setLoading(false);

      // setTimeout(() => fetchData(), 20000);
    } catch (err) {
      await setError(error);
      // setTimeout(() => fetchData(), 20000);
    }
  }, [error]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [data, loading, error];
};

export default useFetchSeries;
