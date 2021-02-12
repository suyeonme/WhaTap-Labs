import { useEffect, useContext, useCallback } from 'react';

import { setError, updateData } from 'reducer/actions';
import { DataContext } from 'reducer/context';
import api from 'api/api';

/*
  let duration = 5000; //how quickly to move (will look jerky if less that data input rate)
  let limit = 60; // how many datapoints, total points = (duration * limit)

  첫 렌더링: 1시간전 ~ 현재
  이후: etime을 stime으로 설정후, stime ~ 현재 (5초 주기로 갱신)
*/

const useFetchSeries = (
  endpoint: string,
  stime: number,
  etime: number,
  dataType: string
): void => {
  const { dispatch } = useContext(DataContext);

  const fetchData = useCallback(async (): Promise<any> => {
    try {
      const res = await api.series(endpoint, {
        stime,
        etime,
      });
      await dispatch(updateData(res.data.data, dataType));
      setTimeout(() => fetchData(), 10000);
    } catch (error) {
      await dispatch(setError(error, dataType));
      setTimeout(() => fetchData(), 10000);
    }
  }, [endpoint, stime, etime, dispatch, dataType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
};

export default useFetchSeries;
