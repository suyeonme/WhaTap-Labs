import React, { useEffect, useRef } from 'react';
import { axisLeft, axisBottom, select } from 'd3';
import styled from 'styled-components';

const Axis = styled.g`
  transform: ${props =>
    props.axisType === 'yAxis' && `translateY(${props.innerHeight}px)`};

  text {
    font-size: 1rem;
  }

  line {
    fill: none;
    stroke: none;
  }
`;

function Axes({ xScale, yScale, innerHeight }) {
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  useEffect(() => {
    const xGroup = select(xAxisRef.current);
    const yGroup = select(yAxisRef.current);
    const xAxis = axisBottom(xScale).tickSizeOuter(0);
    const yAxis = axisLeft(yScale).tickSizeOuter(0);
    xGroup.call(yAxis);
    yGroup.call(xAxis);
  });

  return (
    <g>
      <Axis ref={xAxisRef} axisType="xAxis" />
      <Axis ref={yAxisRef} axisType="yAxis" innerHeight={innerHeight} />
    </g>
  );
}

export default React.memo(Axes);
