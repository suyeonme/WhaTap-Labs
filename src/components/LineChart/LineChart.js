import { useEffect, useCallback, useRef } from 'react';
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
  active,
} from 'd3';

import useFetchSeries from 'hooks/useFetchSeries';
import { WIDTH, HEIGHT } from 'utilities/utilities';
import { Placeholder } from 'styles/styles';
import {
  OuterGroup,
  LinePath,
  Axis,
} from 'components/LineChart/LineChartStyle';
import TitleWithInfo from 'components/UI/TitleWithInfo';

// 'visitor_5m/{stime}/{etime}'
// stime
// etime

const MARGINS = { top: 5, bottom: 20, left: 25, right: 25 };
const INNER_WIDTH = WIDTH - MARGINS.right - MARGINS.left;
const INNER_HEIGHT = HEIGHT - MARGINS.top - MARGINS.bottom;
const MODAL_CONTENT = `실시간 브라우저 사용자 수를 카운팅하여 보여줍니다. 매5초마다 최근 5분이내에 트랜잭션을 일으킨 사용자를 카운팅 하여 보여줍니다.`;

function LineChart({ title }) {
  const [data, loading, error] = useFetchSeries(); //(*)

  const lineRef = useRef(null);
  const axesRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  const xValue = d => d[0];
  const yValue = d => d[1];

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
    xGroup.transition().duration(750).ease(easeLinear).call(xAxis);

    // xGroup
    //   .call(xAxis)
    //   .transition()
    //   .duration(750)
    //   .ease(easeLinear)
    //   .on('start', () => animate(xAxis, xGroup));
  }, [xScale, yScale]);

  useEffect(() => {
    const lineGroup = select(lineRef.current);
    const AxesGroup = select(axesRef.current);

    handleDrawLine(lineGroup);
    handleDrawAxes(AxesGroup);
  }, [handleDrawLine, handleDrawAxes]);

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
            <g ref={axesRef}>
              <Axis
                ref={xAxisRef}
                axisType="xAxis"
                innerHeight={INNER_HEIGHT}
              />
              <Axis ref={yAxisRef} axisType="yAxis" />
            </g>
            <LinePath ref={lineRef} />
          </OuterGroup>
        </svg>
      </div>
    </div>
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

// import useFetchSeries from 'hooks/useFetchSeries';
// import { WIDTH, HEIGHT } from 'utilities/utilities';
// import { Placeholder } from 'styles/styles';
// import {
//   OuterGroup,
//   LinePath,
//   Axis,
// } from 'components/LineChart/LineChartStyle';
// import TitleWithInfo from 'components/UI/TitleWithInfo';

// const MARGINS = { top: 5, bottom: 20, left: 25, right: 25 };
// const INNER_WIDTH = WIDTH - MARGINS.right - MARGINS.left;
// const INNER_HEIGHT = HEIGHT - MARGINS.top - MARGINS.bottom;
// const MODAL_CONTENT = `실시간 브라우저 사용자 수를 카운팅하여 보여줍니다. 매5초마다 최근 5분이내에 트랜잭션을 일으킨 사용자를 카운팅 하여 보여줍니다.`;

// function LineChart({ title }) {
//   const [data, loading, error] = useFetchSeries(); //(*)

//   const lineRef = useRef(null);
//   const axesRef = useRef(null);
//   const xAxisRef = useRef(null);
//   const yAxisRef = useRef(null);

//   const xValue = d => d[0];
//   const yValue = d => d[1];

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
//     xGroup.transition().duration(750).ease(easeLinear).call(xAxis);

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

//   if (error) {
//     return <Placeholder>Error: {error}</Placeholder>;
//   }

//   if (loading) {
//     return <Placeholder>loading...</Placeholder>;
//   }

//   return (
//     <div>
//       <TitleWithInfo title={title} modalContent={MODAL_CONTENT} />
//       <div>
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
//       </div>
//     </div>
//   );
// }

// export default LineChart;
