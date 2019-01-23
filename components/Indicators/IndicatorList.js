import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Card, CardBody, CardTitle, Badge,
} from 'reactstrap';

import styled from 'styled-components';
import { Link } from '../../routes';

import { aplans } from '../../common/api';
import Icon from '../Common/Icon';

const IndicatorType = styled.div`
  line-height: 1.5rem;
  text-align: center;
  color: #ffffff;
  background-color: ${(props) => {
    switch (props.level) {
      case 'tactical':
        return props.theme.helFog;
      case 'operational':
        return props.theme.helCopper;
      case 'strategic':
        return props.theme.helCoat;
      default:
        return '#cccccc';
    }
  }};
`;

const StyledBadge = styled(Badge)`
  white-space: normal;
`;

const StyledCardTitle = styled(CardTitle)`
  hyphens: auto;
  &:hover {
    text-decoration: underline;
    color: inherit;
    cursor: pointer;
  }
`;

const IndicatorCard = styled(Card)`
  width: 100%;
  margin-bottom: 1.5em;
`;

const levels = {
  operational: { fi: 'toiminnallinen', index: 1 },
  tactical: { fi: 'taktinen', index: 2 },
  strategic: { fi: 'strateginen', index: 3 },
};

class IndicatorList extends React.Component {
  static async fetchData() {
    // Fetches the data needed by this component from the API and
    // returns them as props suitable for the component.
    const resp = await aplans.findAll('indicator', {
      include: ['latest_graph', 'categories'],
      'fields[indicator]': ['name', 'unit_name', 'updated_at', 'level', 'categories', 'latest_graph'],
      'fields[category]': ['identifier', 'name', 'parent'],
    });
    const props = {
      indicators: resp.data,
    };

    return props;
  }

  sortIndicators(indicators) {
    let sorted = indicators;
    sorted = indicators.sort((a, b) => {
      if (levels[a.level].index < levels[b.level].index) {
        return -1;
      }
      if (levels[a.level].index > levels[b.level].index) {
        return 1;
      }
      return 0;
    });
    return sorted;
  }

  render() {
    const { indicators } = this.props;
    return (
      <Row className="mb-5">
        {this.sortIndicators(indicators).map(item => (
          <Col key={item.id} sm="6" md="4" lg="3" className="d-flex align-items-stretch">
            <IndicatorCard>
              <IndicatorType level={item.level}>{levels[item.level].fi || <span>-</span>}</IndicatorType>
              <CardBody>
                <StyledCardTitle tag="h6">
                  <Link route="indicator" params={{ id: item.id }} href>
                    <a>{item.name}</a>
                  </Link>
                </StyledCardTitle>
                <div className="mb-3">
                  {item.categories.map(cat => (
                    <StyledBadge color="light" key={cat.id}>{cat.name}</StyledBadge>
                  ))}
                </div>
                <div>
                  {item.latest_graph !== null
                  && (
                    <span>
                      <Icon name="chartLine" />
                    </span>
                  )
                  }
                </div>
              </CardBody>
            </IndicatorCard>
          </Col>
        ))}
      </Row>
    );
  }
}

IndicatorList.propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.object),
};

export default IndicatorList;
