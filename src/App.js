import { useCallback } from 'react';

import api from './api';
import Informatics from './components/Informatics/Informatics';
import BarChart from './components/BarChart/BarChart';

const HOUR = 1000 * 60 * 60;

/*
  (1) How to fetch multiple data at once with setInterval?
  - Promise.all
  - Custom Hooks (useFetch / useMultipleFetch)
  - Axios

  (2) State Management
*/

function App() {
  const fetchSpotData = useCallback((endpoint, setState) => {
    api.spot(endpoint).then(result =>
      setState(prev => ({
        ...prev,
        [result.key]: {
          name: result.name,
          data: result.data,
        },
      }))
    );
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Open API (Application)</h1>
      {/* <Dashboard /> */}
      <Informatics fetchSpotData={fetchSpotData} />
      {/* <BarChart fetchSpotData={fetchSpotData} /> */}
      {/* <pre>{JSON.stringify(actAgent, null, 4)}</pre> */}
      <hr />
      {/* <h3>통계 정보 조회 URL</h3> */}
      {/* <pre>{JSON.stringify(httpcSeries, null, 4)}</pre> */}
    </div>
  );
}

export default App;
