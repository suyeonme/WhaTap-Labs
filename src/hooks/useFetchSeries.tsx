import { useEffect, useContext, useCallback } from 'react';

import { setError, updateData } from 'reducer/actions';
import { DataContext } from 'reducer/context';
import { SeriesData, OriginalSeriesData } from 'types/types';
import api from 'api/api';

const useFetchSeries = (
  endpoint: string,
  stime: number,
  etime: number,
  dataType: string
): void => {
  const { dispatch } = useContext(DataContext);

  const processData = (data: OriginalSeriesData[]): SeriesData[] => {
    return data.map(([timestamp, value]: OriginalSeriesData) => ({
      timestamp,
      value,
    }));
  };

  const fetchData = useCallback(async (): Promise<any> => {
    try {
      await dispatch(setError('', dataType));
      const res = await api.series(endpoint, {
        stime,
        etime,
      });
      const data = await processData(res.data.data);
      await dispatch(updateData(data, dataType));
      setTimeout(() => fetchData(), 30000);
    } catch (error) {
      await dispatch(setError(error.message, dataType));
      setTimeout(() => fetchData(), 30000);
    }
  }, [endpoint, stime, etime, dispatch, dataType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
};

export default useFetchSeries;
