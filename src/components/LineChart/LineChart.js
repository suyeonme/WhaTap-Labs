import { useEffect, useCallback, useRef } from 'react';
import { scaleLinear, scaleTime, extent, curveMonotoneX, line } from 'd3';
import styled from 'styled-components';

import api from 'api/api';
import { WIDTH, HEIGHT } from 'utilities/utilities';
import useFetchSeries from 'hooks/useFetchSeries';
import Axes from 'components/LineChart/Axes';
import { Placeholder } from 'styles/styles';

export const OuterGroup = styled.g`
  transform: ${({ left, top }) => `translate(${left}px, ${top}px)`};
`;

const MARGINS = { top: 5, bottom: 20, left: 25, right: 25 };
const INNER_WIDTH = WIDTH - MARGINS.right - MARGINS.left;
const INNER_HEIGHT = HEIGHT - MARGINS.top - MARGINS.bottom;

function LineChart({ title }) {
  const [data, loading, error] = useFetchSeries();

  const xScale = scaleTime()
    .domain(extent(data, d => +d.time))
    .range([0, INNER_WIDTH])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, d => +d.count))
    .range([INNER_HEIGHT, 0])
    .nice();

  const lineGenerator = line()
    .x(d => xScale(d => +d.time))
    .y(d => yScale(d => +d.count))
    .curve(curveMonotoneX);

  if (error) {
    return <Placeholder>Error: {error}</Placeholder>;
  }

  if (loading) {
    return <Placeholder>loading...</Placeholder>;
  }

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <svg width={WIDTH} height={HEIGHT}>
          <OuterGroup left={MARGINS.left} top={MARGINS.top}>
            <Axes xScale={xScale} yScale={yScale} innerHeight={INNER_HEIGHT} />
          </OuterGroup>
        </svg>
      </div>
    </div>
  );
}

export default LineChart;
