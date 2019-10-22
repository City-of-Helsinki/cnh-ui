/* eslint-disable max-classes-per-file */
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Row, Col, Button,
} from 'reactstrap';
import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';
import ContentLoader from '../common/ContentLoader';
import { IndicatorListLink } from '../../common/links';

import IndicatorHighlightCard from './IndicatorHighlightCard';
import Icon from '../common/Icon';

export const GET_INDICATOR_HIGHLIGHTS = gql`
  query IndicatorHightlightList($plan: ID!, $first: Int!, $orderBy: String!) {
    planIndicators(plan: $plan, first: $first, orderBy: $orderBy, hasData: true, hasGoals: true) {
      id
      identifier
      name
      unit {
        name
        shortName
      }
      latestValue {
        id
        value
      }
      updatedAt
      level(plan: $plan)
    }
  }
`;

const LinkButton = styled(Button)`
  svg {
    fill: ${(props) => props.theme.brandDark} !important;
  }

  &:hover {
    svg {
      fill: ${(props) => props.theme.themeColors.white} !important;
    }
  }
`;

function IndicatorCardList(props) {
  const { t, indicators } = props;

  return (
    <Row>
      <Col xs="12">
        <h2 className="mb-5">{ t('recently-updated-indicators') }</h2>
      </Col>
      {indicators.map((item) => (
        <Col
          xs="12"
          md="6"
          lg="4"
          key={item.id}
          className="mb-4 d-flex align-items-stretch"
          style={{ transition: 'all 0.5s ease' }}
        >
          <IndicatorHighlightCard
            objectid={item.id}
            level={item.level}
            name={item.name}
            value={item.latestValue.value}
            unit={item.unit.shortName || item.unit.name}
          />
        </Col>
      ))}
      <Col xs="12" className="mt-5 mb-3">
        <IndicatorListLink>
          <a href>
            <LinkButton outline color="primary">
              { t('see-all-indicators') }
              {' '}
              <Icon name="arrowRight" />
            </LinkButton>
          </a>
        </IndicatorListLink>
      </Col>
    </Row>
  );
}

IndicatorCardList.propTypes = {
  t: PropTypes.func.isRequired,
  indicators: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

function IndicatorHighlightsList(props) {
  const {
    t, plan,
  } = props;
  const queryParams = {
    plan: plan.identifier,
    first: 6,
    orderBy: '-updatedAt',
  };

  return (
    <Query query={GET_INDICATOR_HIGHLIGHTS} variables={queryParams}>
      {({ data, loading, error }) => {
        if (loading) return <ContentLoader />;
        if (error) return <p>{ t('error-loading-indicators') }</p>;
        return <IndicatorCardList t={t} indicators={data.planIndicators} />;
      }}
    </Query>
  );
}

IndicatorHighlightsList.propTypes = {
  t: PropTypes.func.isRequired,
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
};

export default withTranslation('common')(IndicatorHighlightsList);
