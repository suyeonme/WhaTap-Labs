import Informatics from '../../components/Informatics/Informatics';
import BarChart from '../../components/BarChart/BarChart';

/*
  Apply antd Layout
  - Informatics
  - Bar Chart
  - Line Chart
*/
function Dashboard({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <Informatics />
      <BarChart />
    </div>
  );
}

export default Dashboard;
