import Informatics from '../../components/Informatics/Informatics';
import BarChart from '../../components/BarChart/BarChart';

/*
  Apply antd Layout
  - Informatics
  - Bar Chart
  - Line Chart
*/
function Dashboard({ title }) {
  const informatics = ['act_agent', 'inact_agent', 'host', 'cpucore'];
  const activeStatus = [
    'act_method',
    'act_sql',
    'act_httpc',
    'act_dbc',
    'act_socket',
  ];

  return (
    <div>
      <h1>{title}</h1>
      <Informatics endpoints={informatics} title="Informatics" />
      <BarChart endpoints={activeStatus} title="Active Status" />
    </div>
  );
}

export default Dashboard;
