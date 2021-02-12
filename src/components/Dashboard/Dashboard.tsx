import React, { useContext } from 'react';
import styled from 'styled-components';

import useFetch from 'hooks/useFetch';
import useFetchSeries from 'hooks/useFetchSeries';
import { DataContext } from 'reducer/context';
import { Endpoints } from 'types/types';
import Layout from 'components/Layout/Layout';
import Informatics from 'components/Informatics/Informatics';
import BarChart from 'components/BarChart/BarChart';
import LineChart from 'components/LineChart/LineChart';

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

// HERE
const HOUR: number = 1000 * 60 * 60;
let stime: number = Date.now() - HOUR;
let etime: number = Date.now();

function Dashboard() {
  useFetch(ACTIVE_STATUS, 'activeStatus');
  useFetch(INFORMATICS, 'informatics');
  useFetchSeries('visitor_5m/{stime}/{etime}', stime, etime, 'visitorPer5min');

  const { state } = useContext(DataContext);
  const { activeStatus, informatics, visitorPer5min } = state;

  return (
    <Layout>
      <Wrapper>
        <Informatics dataObj={informatics} title="Informatics" />
        <BarChart dataObj={activeStatus} title="Active Status" />
        <LineChart dataObj={visitorPer5min} title="Active Visitor" />
      </Wrapper>
    </Layout>
  );
}

export default Dashboard;
