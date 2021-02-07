import { useEffect } from 'react';
import api from 'api/api';

interface LineChartProps {
  title: string;
}

const HOUR: number = 1000 * 60 * 60;

/*
통계 정보 조회용 Open API는 시간 범위를 지정하여 호출하며, URL에 다음 항목이 포함된 경우 각 항목의 동작 방식은 다음과 같습니다.
시간 범위 미지정 시 최근 5분간의 정보를 조회
stime: 조회 시작 시간 (UNIX epoch time, millisecond)
etime: 조회 종료 시간 (UNIX epoch time, millisecond)

getTime() = milliseconds
*/

function LineChart({ title }: LineChartProps) {
  useEffect(() => {
    // const res = api.series(`exception/{stime}/{etime}`);
    // console.log(res);
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      <div>Line Chart</div>
    </div>
  );
}

export default LineChart;
