import { useEffect, useState, useCallback } from 'react';

import api from 'api/api';
import { Data, GroupData } from 'types/types';

type DataStatus = [GroupData, boolean, string];

const useFetch = (endpoints: string[]): DataStatus => {
  const [data, setData] = useState<GroupData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(
    async (endpoints: string[]): Promise<any> => {
      const temp: GroupData = [];

      try {
        await setLoading(false);
        for (let i of endpoints) {
          const res: Data = await api.spot(i);
          await temp.push(res);
        }
        await setData(temp);
        setTimeout(() => fetchData(endpoints), 10000);
      } catch (err) {
        await setError(error);
        setTimeout(() => fetchData(endpoints), 10000);
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
