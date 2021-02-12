import { Endpoints, GroupData, Data } from 'types/types';

interface Header {
  [key: string]: string | number;
}
interface HttpHeader {
  headers: HeadersInit;
}
interface OpenApi {
  [key: string]: any;
}

const DEMO_PROJECT_API_TOCKEN: string = 'XGJHUSQZTI2AVIENWA27HI5V';
const DEMO_PROJECT_CODE: number = 5490;
const OPEN_API_HEADERS: Header = {
  'x-whatap-pcode': DEMO_PROJECT_CODE,
  'x-whatap-token': DEMO_PROJECT_API_TOCKEN,
};

const OPEN_API_ROOT: string = 'https://service.whatap.io/open/api';

const OPEN_API: OpenApi = {
  '': {
    act_agent: '활성화 상태의 에이전트',
    inact_agent: '비활성화 상태의 에이전트',
    host: '호스트',
    cpucore: '호스트의 CPU 코어 합',
    txcount: '트랜잭션',
    tps: '초당 트랜잭션',
    user: '5분간 집계된 고유 사용자',
    actx: '액티브 트랜잭션',
    rtime: '평균 응답 시간',
    cpu: 'CPU 사용률',
    threadpool_active: '쓰레드풀 활성 쓰레드',
    threadpool_queue: '쓰레드풀 큐잉 쓰레드',
    dbc_count: '전체 DB Connection',
    dbc_active: '활성(Active) DB Connection',
    dbc_idle: '비활성(Idle) DB Connection',
    act_method: 'Method',
    act_sql: 'SQL',
    act_httpc: 'HTTP Call',
    act_dbc: 'DB Connection',
    act_socket: 'Socket',
  },
  json: {
    'visitor_5m/{stime}/{etime}': '동시접속 사용자',
  },
};

const getPath = (url: string, param: OpenApi = {}): string => {
  let path: string = url;
  for (let key in param) {
    path = path.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key]);
  }
  return path;
};

const getOpenApi = (type: string) => (
  key: string,
  param?: OpenApi
): Promise<any> =>
  new Promise((resolve, reject) => {
    if (key! in OPEN_API[type]) {
      return resolve({
        url: [OPEN_API_ROOT, type, key].join('/'),
        name: OPEN_API[type][key!],
      });
    } else {
      reject('잘못된 API 정보');
    }
  }).then(({ url, name }: any) =>
    fetch(getPath(url, param), {
      headers: OPEN_API_HEADERS,
    } as HttpHeader)
      .then(response => response.json())
      .then(data => ({
        key,
        name,
        data,
      }))
  );

const spot = getOpenApi('');
const series = getOpenApi('json');

const delay: () => Promise<any> = (ms: number = 1000) =>
  new Promise(r => setTimeout(r, ms));

const getDataSeries = async (items: Endpoints): Promise<any> => {
  let results: GroupData = [];
  for (let index = 0; index < items.length; index++) {
    await delay();
    const res: Data = await spot(items[index]);
    results.push({ name: res.name, data: res.data });
  }
  return results;
};

// eslint-disable-next-line
export default { spot, series, getDataSeries };
