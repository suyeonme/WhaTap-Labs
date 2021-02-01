import axios from 'axios';
import { useEffect, useState } from 'react';

import { OPEN_API_HEADERS, OPEN_API_ROOT } from '../../api/api';
import useFirstRender from '../../hooks/useFirstRender';

// Show "Loading..." when fetching data
// setInterval & Initial Loading

/*
  (1) Combine state into one state

  const [data, setData] = usetState({
    act_agent: 0,
    inact_agent: 0,
    host: 0,
    cpucore: 0,
  })

  (2) Update each state using data's name
*/

function Informatics() {
  // Combine states into one state
  const [actAgent, setActAgent] = useState({
    name: '활성 애플리케이션',
    data: 0,
  });
  const [inactAgent, setInactAgent] = useState({
    name: '비활성 애플리케이션',
    data: 0,
  });
  const [host, setHost] = useState({ name: 'Hosts', data: 0 });
  const [cpucore, setCpuCore] = useState({ name: 'CPU 코어', data: 0 });

  const isFristRender = useFirstRender();

  const fetchData = () => {
    // Create a custom Hook (useFetchMultiData)
    const informatics = ['act_agent', 'inact_agent', 'host', 'cpucore'];

    const requests = informatics.map(endpoint => {
      return axios.get(OPEN_API_ROOT + '/' + endpoint, {
        headers: OPEN_API_HEADERS,
      });
    });

    return Promise.all(requests)
      .then(([actAgent, inactAgent, host, cpucore]) => {
        setActAgent(prev => ({ ...prev, data: actAgent.data }));
        setInactAgent(prev => ({ ...prev, data: inactAgent.data }));
        setHost(prev => ({ ...prev, data: host.data }));
        setCpuCore(prev => ({ ...prev, data: cpucore.data }));
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchData();
    if (isFristRender) {
      fetchData();
    } else {
      const timer = setTimeout(() => fetchData(), 5000);
      return () => clearTimeout(timer);
    }
  }, [isFristRender]);

  // Mapping
  return (
    <div>
      <h1>Informatics</h1>
      <p>
        {actAgent.name}: {actAgent.data}
      </p>
      <p>
        {inactAgent.name}: {inactAgent.data}
      </p>
      <p>
        {host.name}: {host.data}
      </p>
      <p>
        {cpucore.name}: {cpucore.data}
      </p>
    </div>
  );
}

export default Informatics;
