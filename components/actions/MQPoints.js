import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import styled from 'styled-components'
import Icon from '../common/Icon'

const CircleIconList = styled.span`
  cursor: pointer;
`;

const CircleIcon = styled(Icon)`
  font-size: 1.5em;

  &.icon-on {
    fill: ${(props) => props.theme.brandDark} !important;
  }

  &.icon-off {
    fill: ${(props) => props.theme.themeColors.light} !important;
  }
`;

const Points = styled.div`
  font-size: 1em;

  .check-icon {
    font-size: 1.5em;
  }
`;

const Point = styled.div`
  &.on {
    .check-icon {
      fill: ${(props) => props.theme.brandDark} !important;
    }
  }

  &.off {
    color: ${(props) => darken(0.25, props.theme.themeColors.light)};
    .check-icon {
      fill: ${(props) => darken(0.25, props.theme.themeColors.light)} !important;
    }
  }
`;

const PointDescriptions = ({ points }) => (
  <Points className="mt-1">
    {points.map(mqPoint => (
      <Point key={mqPoint.id} className={mqPoint.hasPoint ? 'on' : 'off'}>
        <Icon name="check" className="check-icon mr-1" />
         {mqPoint.descriptionYes}
      </Point>
    ))}
  </Points>
);

const MQPoints = ({ action, id, points, t }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const actionHasPoint = (id) => action.monitoringQualityPoints
    && action.monitoringQualityPoints.find(obj => obj.id === id) !== undefined;

  const sortedPoints = points.map((mqPoint) => {
    const out = { ...mqPoint };
    out.hasPoint = actionHasPoint(mqPoint.id);
    return out;
  });

  sortedPoints.sort((a, b) => {
    const hasDiff = b.hasPoint - a.hasPoint;
    if (hasDiff) return hasDiff;
    return a.order - b.order;
  });

  const compId = id || action.id;

  return (
    <>
      <CircleIconList id={compId}>
        {sortedPoints.map(mqp => (
          <CircleIcon
            key={mqp.id}
            name={mqp.hasPoint ? 'circleFull' : 'circleOutline'}
            className={mqp.hasPoint ? 'icon-on' : 'icon-off'}
          />
        ))}
      </CircleIconList>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={compId}
        toggle={toggle}
        popperClassName="action-mqpoints-popover"
        fade={false}
      >
       <PopoverHeader>{t('action-monitoring-popover-header')}</PopoverHeader>
       <PopoverBody>
         {t('action-monitoring-popover-body')}
         <PointDescriptions points={sortedPoints} />
       </PopoverBody>
      </Popover>
    </>
  );
};

MQPoints.propTypes = {
  action: PropTypes.object.isRequired,
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MQPoints;
