import React, { useContext } from 'react';
import styled from 'styled-components';

import { DataContext } from 'reducer/context';
import { Endpoints } from 'types/types';
import Layout from 'components/Layout/Layout';
import Informatics from 'components/Informatics/Informatics';
import BarChart from 'components/BarChart/BarChart';
import LineChart from 'components/LineChart/LineChart';

import useFetchSeries from 'hooks/useFetchSeries';
import useFetch from 'hooks/useFetch';

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

const HOUR = 1000 * 60 * 60;
let stime = Date.now() - HOUR;
let etime = Date.now();

function Dashboard() {
  useFetch(ACTIVE_STATUS, 'activeStatus');
  const { state } = useContext(DataContext);
  const { activeStatus } = state;
  console.log(activeStatus);

  return (
    <Layout>
      <Wrapper>
        {/* <Informatics endpoints={INFORMATICS} title="Informatics" /> */}
        <BarChart dataObj={activeStatus} title="Active Status" />
        <LineChart title="Active Visitor" />
      </Wrapper>
    </Layout>
  );
}

export default Dashboard;
