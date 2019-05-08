import React from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import moment from '../../common/moment';

import Icon from '../Common/Icon';

const ValueGraph = styled.section`
  display: flex;
  justify-content: center;
  margin: 2em 0 0;
  padding: 1em 0;
`;

const PreLegend = styled.div`
  padding-right: 1em;
`;

const PostLegend = styled.div`
  padding-left: 1em;
`;

const Graph = styled.div`
  max-width: 180px;
  .graph-fill {
    fill: ${(props) => props.color};
    opacity: 0.3;
  }
`;

const Status = styled.div`
  display: flex;
  max-width: 200px;
  color: ${(props) => props.color};
  line-height: 1;

  .icon {
    width: 3rem !important;
    height: 3rem !important;
    margin-right: .5em;
  }
`;

const Value = styled.div`
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 1;
  margin-bottom: 1rem;
  color: ${(props) => props.color};
`;

const Unit = styled.span`
  font-weight: 300;
  font-size: 75%;
  margin-left: 0.3em;
  color: #000000;
`;

const Time = styled.div`
  font-size: 1.75rem;
  line-height: 1;
`;

function beautifyValue(x) {
  let out;

  if (!Number.isInteger(x)) {
    out = x.toFixed(2);
  } else {
    out = x;
  }
  const s = out.toString();
  const displayNumber = s.replace('.', ',');
  return displayNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function IndicatorValueGraph({
  initialValue, initialTime, currentValue, currentTime, goalValue, goalTime, unit, development 
}) {
  let timeFormat = 'D.M.YYYY';
  const topValue = Math.max(initialValue, currentValue, goalValue);
  const vizHeight = 200;
  const vizWidth = 160;
  const plotValues = [
    (initialValue/topValue)*vizHeight,
    (currentValue/topValue)*vizHeight,
    (goalValue/topValue)*vizHeight
  ];
  const currentRelativeTime = (currentTime-initialTime)/(goalTime-initialTime);
  var stateColor, developmentLabel;
  switch (development) {
    case "bad":
      stateColor="#a52323";
      developmentLabel="Mittari kehittyy tavoitteen vastaiseen suuntaan";
      break;
    case "good":
      stateColor="#009933";
      developmentLabel="Mittari kehittyy suotuisasti";
      break;
    case "goodSlow":
      stateColor="#009933";
      developmentLabel="Mittari kehittyy oikeaan suuntaan, mutta liian hitaasti";
      break;
    default:
      stateColor="#cccccc";
      developmentLabel="-";
  };
  return (
    <ValueGraph>
      <PreLegend>
        <div><strong>Lähtöarvo</strong></div>
        <Time>{initialTime}</Time>
        <Value color={stateColor}>
          {beautifyValue(initialValue)}
          <Unit>{unit}</Unit>
        </Value>
      </PreLegend>
      <Graph color={stateColor}>
        <svg width="100%" height="100%" viewBox={`0 0 ${vizWidth+16} ${vizHeight+40}`} preserveAspectRatio="none">
          <g transform="translate(8,32)">
          <polygon points=
            {`
              0,${vizHeight} 
              0,${vizHeight-plotValues[0]} 
              ${vizWidth*currentRelativeTime},${vizHeight-plotValues[1]} 
              ${vizWidth},${vizHeight-plotValues[2]} 
              ${vizWidth},${vizHeight} `} className="graph-fill" />
            <line x1="0" y1={vizHeight} x2={vizWidth} y2={vizHeight} stroke="#000000" strokeWidth="4" />
            <line x1="0" y1={vizHeight-plotValues[0]} x2={vizWidth*currentRelativeTime} y2={vizHeight-plotValues[1]} stroke={stateColor} strokeWidth="4" />
            <line x2={vizWidth} y2={vizHeight-plotValues[2]} x1={vizWidth*currentRelativeTime} y1={vizHeight-plotValues[1]} stroke={stateColor}  strokeWidth="3" strokeDasharray="8" />
            <circle cx="0" cy={vizHeight-plotValues[0]} r="7" fill={stateColor} />
            <circle cx={vizWidth*currentRelativeTime} cy={vizHeight-plotValues[1]} r="7" fill={stateColor} />
            <circle cx={vizWidth} cy={vizHeight-plotValues[2]} r="7" fill={stateColor} />
            
            <line x1={vizWidth*currentRelativeTime} y1={vizHeight-plotValues[1]} x2={vizWidth*currentRelativeTime} y2={-16} stroke="#000000" strokeWidth="1" />
            <line x1={vizWidth*currentRelativeTime} y1={-16} stroke="#000000" strokeWidth="1" x2={vizWidth+16} y2={-16} stroke="#000000" strokeWidth="1" />
            </g>
        </svg>
      </Graph>
      <PostLegend>
        <div><strong>Viimeisin mittaus</strong></div>
        <Time>{currentTime}</Time>
        <Value color={stateColor}>
          {beautifyValue(currentValue)}
          <Unit>{unit}</Unit>
        </Value>
        <div><strong>Tavoite</strong></div>
        <Time>{goalTime}</Time>
        <Value color={stateColor}>
          {beautifyValue(goalValue)}
          <Unit>{unit}</Unit>
        </Value>
        <Status color={stateColor}>
          <div><Icon name={development} color={stateColor}/></div>
          <div>{developmentLabel}</div>
        </Status>
      </PostLegend>
    </ValueGraph>
  );
}

export default IndicatorValueGraph;
