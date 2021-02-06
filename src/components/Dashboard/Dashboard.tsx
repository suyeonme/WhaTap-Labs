import styled from 'styled-components';

import { Endpoints } from 'types/types';
import Informatics from 'components/Informatics/Informatics';
import BarChart from 'components/BarChart/BarChart';
import Layout from 'components/Layout/Layout';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const INFORMATICS: Endpoints = ['act_agent', 'inact_agent', 'host', 'cpucore'];
const ACTIVE_STATUS: Endpoints = [
  'act_method',
  'act_sql',
  'act_httpc',
  'act_dbc',
  'act_socket',
];

function Dashboard() {
  return (
    <Layout>
      <Wrapper>
        <Informatics endpoints={INFORMATICS} title="Informatics" />
        <BarChart endpoints={ACTIVE_STATUS} title="Active Status" />
        {/* <LineCart /> */}
      </Wrapper>
    </Layout>
  );
}

export default Dashboard;
