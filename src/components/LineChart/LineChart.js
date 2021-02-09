import { useEffect, useCallback, useRef } from 'react';
import {
  scaleLinear,
  scaleTime,
  extent,
  curveMonotoneX,
  line,
  select,
} from 'd3';
import styled from 'styled-components';

import useFetchSeries from 'hooks/useFetchSeries';
import { WIDTH, HEIGHT } from 'utilities/utilities';
import { Placeholder } from 'styles/styles';
import Axes from 'components/LineChart/Axes';
import TitleWithInfo from 'components/UI/TitleWithInfo';

export const OuterGroup = styled.g`
  transform: ${({ left, top }) => `translate(${left}px, ${top}px)`};
`;

const LineGroup = styled.g`
  path {
    fill: none;
    stroke: #ec008b;
    stroke-width: 2px;
    stroke-linecap: round;
  }
`;

const MARGINS = { top: 5, bottom: 20, left: 25, right: 25 };
const INNER_WIDTH = WIDTH - MARGINS.right - MARGINS.left;
const INNER_HEIGHT = HEIGHT - MARGINS.top - MARGINS.bottom;
const MODAL_CONTENT = `실시간 브라우저 사용자 수를 카운팅하여 보여줍니다. 매5초마다 최근 5분이내에 트랜잭션을 일으킨 사용자를 카운팅 하여 보여줍니다.`;

function LineChart({ title }) {
  const [data, loading, error] = useFetchSeries();
  const lineRef = useRef(null);

  const xScale = scaleTime()
    .domain(extent(data, d => d[0]))
    .range([0, INNER_WIDTH])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, d => d[1]))
    .range([INNER_HEIGHT, 0])
    .nice();

  var lineGenerator = line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]))
    .curve(curveMonotoneX);

  const handleDrawLine = useCallback(
    group => {
      group
        .selectAll('path')
        .data([data])
        .join('path')
        .attr('d', lineGenerator);
    },
    [data, lineGenerator]
  );

  useEffect(() => {
    const lineGroup = select(lineRef.current);
    handleDrawLine(lineGroup);
  }, [handleDrawLine]);

  if (error) {
    return <Placeholder>Error: {error}</Placeholder>;
  }

  if (loading) {
    return <Placeholder>loading...</Placeholder>;
  }

  return (
    <div>
      <TitleWithInfo title={title} modalContent={MODAL_CONTENT} />
      <div>
        <svg width={WIDTH} height={HEIGHT}>
          <OuterGroup left={MARGINS.left} top={MARGINS.top}>
            <Axes xScale={xScale} yScale={yScale} innerHeight={INNER_HEIGHT} />
            <LineGroup ref={lineRef} />
          </OuterGroup>
        </svg>
      </div>
    </div>
  );
}

export default LineChart;
