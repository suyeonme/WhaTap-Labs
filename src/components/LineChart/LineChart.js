import { useEffect, useCallback, useRef, useState } from 'react';
import {
  scaleLinear,
  scaleTime,
  extent,
  curveMonotoneX,
  line,
  select,
  axisLeft,
  axisBottom,
  easeLinear,
  pointer,
} from 'd3';

import { WIDTH, HEIGHT } from 'utilities/utilities';
import {
  OuterGroup,
  LinePath,
  Axis,
  Indicator,
} from 'components/LineChart/LineChartStyle';
import TitleWithInfo from 'components/UI/TitleWithInfo';

// Implement Typescript
import { ChartWrapper, Chart } from 'styles/styles';

const MARGINS = { top: 5, bottom: 20, left: 25, right: 25 };
const INNER_WIDTH = WIDTH - MARGINS.right - MARGINS.left;
const INNER_HEIGHT = HEIGHT - MARGINS.top - MARGINS.bottom;
const MODAL_CONTENT = `실시간 브라우저 사용자 수를 카운팅하여 보여줍니다. 매5초마다 최근 5분이내에 트랜잭션을 일으킨 사용자를 카운팅 하여 보여줍니다.`;

function LineChart({ title, dataObj }) {
  const { data } = dataObj;
  const [selectedData, setSelectedData] = useState();
  const [selectedTime, setSelectedTime] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [xPosition, setXPosition] = useState(0);

  const lineRef = useRef(null);
  const axesRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const rectRef = useRef(null);

  const xValue = d => d.timestamp;
  const yValue = d => d.value;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, INNER_WIDTH])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([INNER_HEIGHT, 0])
    .nice();

  var lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(curveMonotoneX);

  const handleMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  const getSelectedData = data => {
    console.log(data.filter(d => d.timestamp === selectedTime));
    return data.find(d => d.timestamp === selectedTime);
  };

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

  const handleDrawAxes = useCallback(() => {
    const xGroup = select(xAxisRef.current);
    const yGroup = select(yAxisRef.current);
    const xAxis = axisBottom(xScale).tickSizeOuter(0);
    const yAxis = axisLeft(yScale).tickSizeOuter(0);
    yGroup.call(yAxis);
    xGroup.call(xAxis).transition().duration(750).ease(easeLinear);
  }, [xScale, yScale]);

  const handleDrawIndicator = useCallback(
    group => {
      group
        .append('rect')
        .merge(group.select('rect'))
        .attr('width', INNER_WIDTH)
        .attr('height', INNER_HEIGHT)
        .on('mousemove', e => {
          const x = pointer(e, group.node())[0];
          const hoveredData = xScale.invert(x);
          setSelectedTime(hoveredData.getTime());
          setXPosition(x);
          handleMouseEnter();
        });
    },
    [handleMouseEnter, xScale]
  );

  useEffect(() => {
    const lineGroup = select(lineRef.current);
    const AxesGroup = select(axesRef.current);
    const IndicatorGroup = select(rectRef.current);

    handleDrawLine(lineGroup);
    handleDrawAxes(AxesGroup);
    handleDrawIndicator(IndicatorGroup);
  }, [handleDrawLine, handleDrawAxes, handleDrawIndicator]);

  console.log(selectedTime);
  console.log(getSelectedData(data));

  return (
    <ChartWrapper>
      <TitleWithInfo title={title} modalContent={MODAL_CONTENT} />
      <Chart>
        <svg width={WIDTH} height={HEIGHT}>
          <OuterGroup left={MARGINS.left} top={MARGINS.top}>
            <g ref={axesRef}>
              <Axis
                ref={xAxisRef}
                axisType="xAxis"
                innerHeight={INNER_HEIGHT}
              />
              <Axis ref={yAxisRef} axisType="yAxis" />
            </g>
            <LinePath ref={lineRef} />
            <Indicator
              ref={rectRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              {isHover && (
                <line
                  y1={0}
                  x1={xScale(selectedTime)}
                  x2={xScale(selectedTime)}
                  y2={INNER_HEIGHT}
                />
              )}
            </Indicator>
          </OuterGroup>
        </svg>
        {/* {isHover && <div>{selectedData.value}</div>} */}
      </Chart>
    </ChartWrapper>
  );
}

export default LineChart;

// import { useEffect, useCallback, useRef } from 'react';
// import {
//   scaleLinear,
//   scaleTime,
//   extent,
//   curveMonotoneX,
//   line,
//   select,
//   axisLeft,
//   axisBottom,
//   easeLinear,
//   active,
// } from 'd3';

// import { WIDTH, HEIGHT } from 'utilities/utilities';
// import {
//   OuterGroup,
//   LinePath,
//   Axis,
// } from 'components/LineChart/LineChartStyle';
// import TitleWithInfo from 'components/UI/TitleWithInfo';

// // Implement Typescript
// import { ChartWrapper, Chart } from 'styles/styles';

// const MARGINS = { top: 5, bottom: 20, left: 25, right: 25 };
// const INNER_WIDTH = WIDTH - MARGINS.right - MARGINS.left;
// const INNER_HEIGHT = HEIGHT - MARGINS.top - MARGINS.bottom;
// const MODAL_CONTENT = `실시간 브라우저 사용자 수를 카운팅하여 보여줍니다. 매5초마다 최근 5분이내에 트랜잭션을 일으킨 사용자를 카운팅 하여 보여줍니다.`;

// function LineChart({ title, dataObj }) {
//   const { data } = dataObj;

//   const lineRef = useRef(null);
//   const axesRef = useRef(null);
//   const xAxisRef = useRef(null);
//   const yAxisRef = useRef(null);

//   const xValue = d => d.timestamp;
//   const yValue = d => d.value;

//   const xScale = scaleTime()
//     .domain(extent(data, xValue))
//     .range([0, INNER_WIDTH])
//     .nice();

//   const yScale = scaleLinear()
//     .domain(extent(data, yValue))
//     .range([INNER_HEIGHT, 0])
//     .nice();

//   var lineGenerator = line()
//     .x(d => xScale(xValue(d)))
//     .y(d => yScale(yValue(d)))
//     .curve(curveMonotoneX);

//   const handleDrawLine = useCallback(
//     group => {
//       group
//         .selectAll('path')
//         .data([data])
//         .join('path')
//         .attr('d', lineGenerator);
//     },
//     [data, lineGenerator]
//   );

//   const handleDrawAxes = useCallback(() => {
//     const xGroup = select(xAxisRef.current);
//     const yGroup = select(yAxisRef.current);
//     const xAxis = axisBottom(xScale).tickSizeOuter(0);
//     const yAxis = axisLeft(yScale).tickSizeOuter(0);
//     yGroup.call(yAxis);
//     xGroup
//       .transition()
//       .duration(750)
//       .ease(easeLinear)
//       .call(xAxis)
//       .selectAll('text')
//       .style('text-anchor', 'end')
//       .attr('dx', '0')
//       .attr('dy', '0.9em');

//     // xGroup
//     //   .call(xAxis)
//     //   .transition()
//     //   .duration(750)
//     //   .ease(easeLinear)
//     //   .on('start', () => animate(xAxis, xGroup));
//   }, [xScale, yScale]);

//   useEffect(() => {
//     const lineGroup = select(lineRef.current);
//     const AxesGroup = select(axesRef.current);

//     handleDrawLine(lineGroup);
//     handleDrawAxes(AxesGroup);
//   }, [handleDrawLine, handleDrawAxes]);

//   return (
//     <ChartWrapper>
//       <TitleWithInfo title={title} modalContent={MODAL_CONTENT} />
//       <Chart>
//         <svg width={WIDTH} height={HEIGHT}>
//           <OuterGroup left={MARGINS.left} top={MARGINS.top}>
//             <g ref={axesRef}>
//               <Axis
//                 ref={xAxisRef}
//                 axisType="xAxis"
//                 innerHeight={INNER_HEIGHT}
//               />
//               <Axis ref={yAxisRef} axisType="yAxis" />
//             </g>
//             <LinePath ref={lineRef} />
//           </OuterGroup>
//         </svg>
//       </Chart>
//     </ChartWrapper>
//   );
// }

// export default LineChart;
