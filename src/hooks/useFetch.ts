import { useEffect, useCallback, useContext } from 'react';

import { setError, updateSpotData } from 'reducer/actions';
import { DataContext } from 'reducer/context';
import { GroupData } from 'types/types';
import api from 'api/api';

const useFetch = (endpoints: string[], dataType: string): void => {
  const { dispatch } = useContext(DataContext);

  const fetchData = useCallback(
    async (endpoints: string[], dataType): Promise<any> => {
      try {
        await dispatch(setError('', dataType));
        const res: GroupData = await api.getDataSeries(endpoints);
        await dispatch(updateSpotData(res, dataType));
        setTimeout(() => fetchData(endpoints, dataType), 50000);
      } catch (error) {
        await dispatch(setError(error.message, dataType));
        setTimeout(() => fetchData(endpoints, dataType), 50000);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(endpoints, dataType);
  }, [fetchData, endpoints, dataType]);
};

export default useFetch;
