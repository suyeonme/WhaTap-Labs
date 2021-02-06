import { useEffect, useRef, useCallback } from 'react';
import {
  scaleLinear,
  max,
  scaleBand,
  select,
  axisLeft,
  scaleOrdinal,
  schemeAccent,
} from 'd3';

import { Endpoints, Data, Margins, GroupTag } from 'types/types';
import useFetch from 'hooks/useFetch';
import { Group, GroupAxis } from 'components/BarChart/BarChartStyle';

interface BarChartProps {
  endpoints: Endpoints;
  title: string;
}

const WIDTH: number = 600;
const HEIGHT: number = 400;
const MARGINS: Margins = { top: 15, bottom: 15, left: 200, right: 25 };
const INNER_WIDTH: number = WIDTH - MARGINS.right - MARGINS.left;
const INNER_HEIGHT: number = HEIGHT - MARGINS.top - MARGINS.bottom;

function BarChart({ endpoints, title }: BarChartProps) {
  const [data, loading, error] = useFetch(endpoints);

  const rectRef = useRef<GroupTag>(null);
  const leftAxisRef = useRef<GroupTag>(null);
  const textRef = useRef<GroupTag>(null);

  const xScale = scaleLinear()
    .domain([0, max(data, (d: Data) => d.data) as number])
    .range([0, INNER_WIDTH]);

  const yScale = scaleBand()
    .domain(data!.map((d: Data) => d!.name))
    .range([0, INNER_HEIGHT])
    .padding(0.2);

  const colorScale = scaleOrdinal(schemeAccent);

  const handleDrawRect = useCallback(
    (group): void => {
      group
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('height', yScale.bandwidth())
        .attr('y', (d: Data) => yScale(d.name))
        .style('fill', (d: Data) => colorScale(d.name))
        .transition()
        .duration(750)
        .attr('width', (d: Data) => xScale(d.data));
    },
    [data, xScale, yScale, colorScale]
  );

  const handleDrawAxis = useCallback(
    (group): void => {
      const leftAxis = axisLeft(yScale).tickSizeOuter(0);
      group.call(leftAxis);
    },
    [yScale]
  );

  const handleDrawText = useCallback(
    (group): void => {
      group
        .selectAll('text')
        .data(data)
        .join('text')
        .attr(
          'y',
          (d: Data) => (yScale(d.name) as number) + yScale.bandwidth() / 1.5
        )
        .text((d: Data) => d.data)
        .attr('x', (d: Data) => xScale(d.data) + 5)
        .transition();
    },
    [data, xScale, yScale]
  );

  useEffect(() => {
    const rectGroup = select(rectRef.current);
    const textGroup = select(textRef.current);
    const axisGroup = select(leftAxisRef.current);

    handleDrawRect(rectGroup);
    handleDrawAxis(axisGroup);
    handleDrawText(textGroup);
  }, [handleDrawRect, handleDrawAxis, handleDrawText]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h2>{title}</h2>
      <svg width={WIDTH} height={HEIGHT}>
        <Group left={MARGINS.left}>
          <g ref={rectRef} />
          <g ref={textRef} />
          <GroupAxis ref={leftAxisRef} />
        </Group>
      </svg>
    </div>
  );
}

export default BarChart;
