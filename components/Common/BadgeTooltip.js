import React from 'react';
import { Badge, Tooltip } from 'reactstrap';
import styled from 'styled-components';

const TooltipBadge = styled.span`
  .badge {
    background-color: ${props => props.theme.brandDark};
    color: #ffffff;
  }
`;

class BadgeTooltip extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  render() {
    const { abbreviation, name } = this.props;
    const id = this.props.id.replace(/[: ]/g, '_');

    return (
      <TooltipBadge>
        <Badge pill href="#" id={id}>{abbreviation || name}</Badge>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={id} toggle={this.toggle}>
          {name}
        </Tooltip>
      </TooltipBadge>
    );
  }
}

export default BadgeTooltip;
