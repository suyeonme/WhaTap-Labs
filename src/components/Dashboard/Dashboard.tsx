import styled from 'styled-components';

import { Endpoints } from 'src/types/types';
import Informatics from 'src/components/Informatics/Informatics';
import BarChart from 'src/components/BarChart/BarChart';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 3rem 0;
`;

interface DashboardProps {
  title: string;
}

const INFORMATICS: Endpoints = ['act_agent', 'inact_agent', 'host', 'cpucore'];
const ACTIVE_STATUS: Endpoints = [
  'act_method',
  'act_sql',
  'act_httpc',
  'act_dbc',
  'act_socket',
];

function Dashboard({ title }: DashboardProps) {
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
