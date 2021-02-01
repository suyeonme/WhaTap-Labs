import { useEffect, useState, useCallback } from 'react';
import useFirstRender from '../../hooks/useFirstRender';

// useFetch
// useMultipleFetch

function Informatics({ fetchSpotData }) {
  const isFirstRender = useFirstRender();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    fetchSpotData('act_agent', setData);
    fetchSpotData('inact_agent', setData);
    fetchSpotData('host', setData);
    fetchSpotData('cpucore', setData);
    setIsLoading(false);
  }, [fetchSpotData]);

  useEffect(() => {
    if (isFirstRender) {
      fetchData();
    } else {
      const timer = setInterval(() => fetchData(), 5000);
      return () => clearInterval(timer);
    }
  }, [isFirstRender, fetchData]);

  return (
    <div>
      <h1>Informatics</h1>
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

export default Informatics;
