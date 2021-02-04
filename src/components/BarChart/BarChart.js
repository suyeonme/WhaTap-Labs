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

import useFetch from 'hooks/useFetch';
import { Group, Tick } from 'components/BarChart/BarChartStyle';

const width = 600;
const height = 400;
const margin = { top: 15, bottom: 15, left: 90, right: 25 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

function BarChart({ endpoints, title }) {
  const [data, loading, error] = useFetch(endpoints);

  const rectRef = useRef();
  const leftAxisRef = useRef();
  const labelRef = useRef();

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.data)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, innerHeight])
    .padding(0.2);

  const colorScale = scaleOrdinal(schemeAccent);

  const handleDrawRect = useCallback(() => {
    const group = select(rectRef.current);

    group
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('height', yScale.bandwidth())
      .attr('y', d => yScale(d.name))
      .style('fill', d => colorScale(d.name))
      .transition()
      .duration(750)
      .attr('width', d => xScale(d.data));
  }, [data, xScale, yScale, colorScale]);

  const handleDrawAxis = useCallback(() => {
    const leftAxis = select(leftAxisRef.current);
    leftAxis.call(axisLeft(yScale).tickSizeOuter(0));
  }, [yScale]);

  const handleDrawText = useCallback(() => {
    const group = select(labelRef.current);

    group
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('y', d => yScale(d.name) + yScale.bandwidth() / 1.5)
      .text(d => d.data)
      .attr('x', d => xScale(d.data) + 5)
      .transition();
  }, [data, xScale, yScale]);

  useEffect(() => {
    handleDrawRect();
    handleDrawAxis();
    handleDrawText();
  }, [handleDrawRect, handleDrawAxis, handleDrawText]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <svg width={width} height={height}>
        <Group left={margin.left}>
          <g ref={rectRef} />
          <Tick ref={leftAxisRef} />
          <g ref={labelRef} />
        </Group>
      </svg>
    </div>
  );
}

export default BarChart;
