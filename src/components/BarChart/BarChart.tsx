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

import { SpotData, Margins, GroupTag, DataState } from 'types/types';
import TitleWithInfo from 'components/UI/TitleWithInfo';
import { OuterGroup, GroupAxis } from 'components/BarChart/BarChartStyle';
import { WIDTH, HEIGHT } from 'utilities/utilities';

interface BarChartProps {
  title: string;
  dataObj: DataState;
}

const MARGINS: Margins = { top: 15, bottom: 15, left: 130, right: 25 };
const INNER_WIDTH: number = WIDTH - MARGINS.right - MARGINS.left;
const INNER_HEIGHT: number = HEIGHT - MARGINS.top - MARGINS.bottom;
const MODAL_CONTENT: string = `액티브 트랜잭션들을 각 상태별로 갯수를 보여줍니다. DBC나 SOCKET의 갯수가 1이상에서 지속되면 문제가 있는지 의심해야합니다.`;

function BarChart({ dataObj, title }: BarChartProps) {
  const { data } = dataObj;

  const rectRef = useRef<GroupTag>(null);
  const leftAxisRef = useRef<GroupTag>(null);
  const textRef = useRef<GroupTag>(null);

  const xScale = scaleLinear()
    .domain([0, max(data, (d: SpotData) => d.data) as number])
    .range([0, INNER_WIDTH]);

  const yScale = scaleBand()
    .domain(data.map((d: SpotData) => d.name))
    .range([0, INNER_HEIGHT])
    .padding(0.3);

  const colorScale = scaleOrdinal(schemeAccent);

  const handleDrawRect = useCallback(
    (group): void => {
      group
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('height', yScale.bandwidth())
        .attr('y', (d: SpotData) => yScale(d.name))
        .style('fill', (d: SpotData) => colorScale(d.name))
        .transition()
        .duration(750)
        .attr('width', (d: SpotData) => xScale(d.data));
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
          (d: SpotData) => (yScale(d.name) as number) + yScale.bandwidth() / 1.5
        )
        .text((d: SpotData) => d.data)
        .transition()
        .duration(750)
        .attr('x', (d: SpotData) => xScale(d.data) + 5);
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

  return (
    <div>
      <TitleWithInfo title={title} modalContent={MODAL_CONTENT} />
      <svg width={WIDTH} height={HEIGHT}>
        <OuterGroup left={MARGINS.left}>
          <g ref={rectRef} />
          <g ref={textRef} />
          <GroupAxis ref={leftAxisRef} />
        </OuterGroup>
      </svg>
    </div>
  );
}

export default BarChart;
