import { useEffect, useContext, useCallback } from 'react';

import { NOW, DURATION } from 'utilities/utilities';
import { setError, updateSeriesData, initSeriesData } from 'reducer/actions';
import { DataContext } from 'reducer/context';
import { SeriesData, OriginalSeriesData } from 'types/types';
import api from 'api/api';

// (1) Initial data fetching
// const MIN_30 = 30 * 60 * 1000
// let stime: number = Date.now() - MIN_30;
// let etime: number = Date.now();

// (2) After initial data fetching
// let stime = data[data.length - 1].timestamp;
// let etime: number = Date.now();

const useFetchSeries = (
  endpoint: string,
  dataType: string,
  lastTime: number
): void => {
  const { dispatch } = useContext(DataContext);

  const processData = (data: OriginalSeriesData[]): SeriesData[] => {
    return data.map(([timestamp, value]: OriginalSeriesData) => ({
      timestamp,
      value,
    }));
  };

  const updateData = useCallback(async (): Promise<any> => {
    try {
      if (lastTime) {
        // await console.log('update');
        const res = await api.series(endpoint, {
          stime: lastTime,
          etime: NOW,
        });
        const data = await processData(res.data.data);
        await dispatch(updateSeriesData(data, dataType));
        setTimeout(() => updateData(), 20000);
      }
    } catch (error) {
      await dispatch(setError(error.message, dataType));
      setTimeout(() => updateData(), 20000);
    }
  }, [dataType, dispatch, endpoint, lastTime]);

  const fetchData = useCallback(async (): Promise<any> => {
    try {
      // await console.log('initial');
      await dispatch(setError('', dataType));
      const res = await api.series(endpoint, {
        stime: DURATION,
        etime: NOW,
      });
      const data = await processData(res.data.data);
      await dispatch(initSeriesData(data));
      setTimeout(() => updateData(), 20000);
    } catch (error) {
      await dispatch(setError(error.message, dataType));
      setTimeout(() => updateData(), 20000);
    }
  }, [dataType, dispatch, updateData, endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
};

export default useFetchSeries;
