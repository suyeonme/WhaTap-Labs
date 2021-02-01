import axios from 'axios';
import { useEffect, useState } from 'react';

import useFirstRender from '../../hooks/useFirstRender';
import { OPEN_API_HEADERS, OPEN_API_ROOT } from '../../api/api';

/*
  act_method
  act_sql
  act_httpc
  act_dbc
  act_socket
*/

function BarChart() {
  const [method, setMethod] = useState({
    name: 'Method',
    data: 0,
  });
  const [sql, setSql] = useState({
    name: 'Sql',
    data: 0,
  });
  const [httpc, setHttpc] = useState({ name: 'Httpc', data: 0 });
  const [dbc, setDbc] = useState({ name: 'Dbc', data: 0 });
  const [socket, setSocket] = useState({ name: 'Socket', data: 0 });

  const isFristRender = useFirstRender();

  const fetchData = () => {
    const informatics = [
      'act_method',
      'act_sql',
      'act_httpc',
      'act_dbc',
      'act_socket',
    ];

    const requests = informatics.map(endpoint => {
      return axios.get(OPEN_API_ROOT + '/' + endpoint, {
        headers: OPEN_API_HEADERS,
      });
    });

    return Promise.all(requests)
      .then(([method, sql, httpc, dbc, socket]) => {
        setMethod(prev => ({ ...prev, data: method.data }));
        setSql(prev => ({ ...prev, data: sql.data }));
        setHttpc(prev => ({ ...prev, data: httpc.data }));
        setDbc(prev => ({ ...prev, data: dbc.data }));
        setSocket(prev => ({ ...prev, data: socket.data }));
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (isFristRender) {
      // fetchData();
    } else {
      // const timer = setTimeout(() => fetchData(), 5000);
      // return () => clearTimeout(timer);
    }
  }, [isFristRender]);

  return (
    <div>
      <h1>Active Status</h1>
      <p>
        {method.name}: {method.data}
      </p>
      <p>
        {sql.name}: {sql.data}
      </p>
      <p>
        {httpc.name}: {httpc.data}
      </p>
      <p>
        {dbc.name}: {dbc.data}
      </p>
      <p>
        {socket.name}: {socket.data}
      </p>
    </div>
  );
}

export default BarChart;
