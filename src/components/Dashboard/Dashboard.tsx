import React, { useContext } from 'react';
import styled from 'styled-components';

import useFetch from 'hooks/useFetch';
import useFetchSeries from 'hooks/useFetchSeries';
import { DataContext } from 'reducer/context';
import { Endpoints } from 'types/types';
import Informatics from 'components/Informatics/Informatics';
import BarChart from 'components/BarChart/BarChart';
import LineChart from 'components/LineChart/LineChart';
import WithLoading from 'components/HOC/WithLoading';
import Layout from 'components/Layout/Layout';

const InformaticsWithLoading = WithLoading(Informatics);
const BarChartWithLoading = WithLoading(BarChart);
const LineChartWithLoading = WithLoading(LineChart);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: normal;
    align-items: center;
  }

  @media (max-width: 568px) {
    padding: 3rem;
  }
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
// timestamp_last: data[data.length - 1];

function Dashboard() {
  useFetch(ACTIVE_STATUS, 'activeStatus');
  useFetch(INFORMATICS, 'informatics');
  useFetchSeries('visitor_5m/{stime}/{etime}', stime, etime, 'visitorPer5min');

  const { state } = useContext(DataContext);
  const { activeStatus, informatics, visitorPer5min } = state;

  return (
    <Layout>
      <Wrapper>
        <InformaticsWithLoading dataObj={informatics} title="Informatics" />
        <BarChartWithLoading dataObj={activeStatus} title="Active Status" />
        <LineChartWithLoading dataObj={visitorPer5min} title="Active Visitor" />
      </Wrapper>
    </Layout>
  );
}

export default Dashboard;
