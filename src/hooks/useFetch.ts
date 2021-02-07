import { useEffect, useState, useCallback } from 'react';

import api from 'api/api';
import { GroupData } from 'types/types';

type DataStatus = [GroupData, boolean, string];

const useFetch = (endpoints: string[]): DataStatus => {
  const [data, setData] = useState<GroupData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(
    async (endpoints: string[]): Promise<any> => {
      try {
        const res: GroupData = await api.getDataSeries(endpoints);
        await setData(res);
        await setLoading(false);
        setTimeout(() => fetchData(endpoints), 5000);
      } catch (err) {
        await setError(error);
        setTimeout(() => fetchData(endpoints), 5000);
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
