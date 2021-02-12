import { useEffect, useState, useCallback } from 'react';
import api from 'api/api';

const HOUR = 1000 * 60 * 60;
let stime = Date.now() - HOUR;
let etime = Date.now();

// Implement Typescript

/*
  let duration = 5000; //how quickly to move (will look jerky if less that data input rate)
  let limit = 60; // how many datapoints, total points = (duration * limit)

  첫 렌더링: 1시간전 ~ 현재
  이후: etime을 stime으로 설정후, stime ~ 현재 (5초 주기로 갱신)
*/

const useFetchSeries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async (): Promise<any> => {
    try {
      const res = await api.series('visitor_5m/{stime}/{etime}', {
        // (*)
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

  return [data, loading, error]; // (*)
};

export default useFetchSeries;
