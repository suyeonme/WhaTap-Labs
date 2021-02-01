import { useEffect, useState, useCallback } from 'react';
import useFirstRender from '../../hooks/useFirstRender';

/*
  act_method
  act_sql
  act_httpc
  act_dbc
  act_socket
*/

function BarChart({ fetchSpotData }) {
  const isFirstRender = useFirstRender();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    await fetchSpotData('act_method', setData);
    await fetchSpotData('act_sql', setData);
    await fetchSpotData('act_httpc', setData);
    await fetchSpotData('act_dbc', setData);
    await fetchSpotData('act_socket', setData);
    setIsLoading(false);
  }, [fetchSpotData]);

  useEffect(() => {
    if (isFirstRender) {
      fetchData();
    } else {
      const actAgent = setInterval(() => {
        fetchData();
      }, 5000);
      return () => clearInterval(actAgent);
    }
  }, [isFirstRender, fetchData]);

  return (
    <div>
      <h1>Active Status</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        Object.keys(data).map((el, i) => (
          <div key={i}>
            {data[el].name}: {data[el].data}
          </div>
        ))
      )}
    </div>
  );
}

export default BarChart;
