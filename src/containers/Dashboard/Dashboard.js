import styled from 'styled-components';
import Informatics from 'components/Informatics/Informatics';
import BarChart from 'components/BarChart/BarChart';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 3rem 0;
`;

const INFORMATICS = ['act_agent', 'inact_agent', 'host', 'cpucore'];
const ACTIVE_STATUS = [
  'act_method',
  'act_sql',
  'act_httpc',
  'act_dbc',
  'act_socket',
];

// Naming -> Panel

function Dashboard({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <Wrapper>
        <Informatics endpoints={INFORMATICS} title="Informatics" />
        <BarChart endpoints={ACTIVE_STATUS} title="Active Status" />
        {/* <LineCart /> */}
      </Wrapper>
    </div>
  );
}

export default Dashboard;
