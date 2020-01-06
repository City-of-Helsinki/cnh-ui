import React from 'react';
import PropTypes from 'prop-types';

import {
  Row, Col, Container,
} from 'reactstrap';

import { Spring } from 'react-spring/renderprops.cjs';
import styled from 'styled-components';
import { withTranslation } from '../common/i18n';
import {
  IndicatorListLink,
  ActionListLink,
} from '../common/links';

import IconActions from '../static/images/default/icon-actions.svg';
import IconIndicators from '../static/images/default/icon-indicators.svg';

const HeroVisual = styled.div`
  position: relative;
  height: 11rem;
  width: 11rem;
  margin: 0 auto 2rem;

  &:before {
    content: "";
    position: absolute;
    z-index: 11;
    width: 11rem;
    height: 11rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.brandDark};
  }

  &:after {
    content: "";
    position: absolute;
    left: -5.5em;
    top: 0;
    width: 11rem;
    height: 11rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.brandLight};
  }
`;

const HeroImage = styled.div`
  background-image: url(${(props) => props.pic});
  background-size: cover;
  position: relative;
  z-index: 13;
  height: 11rem;
  width: 11rem;
  border-radius: 50%;
`;

const BannerContent = styled.div`
  padding: 2rem 0;
  max-width: 48rem;
  margin: 0 auto 0;
  background-color: #ffffff;
  
  //text-shadow: 3px 3px 8px rgba(0,0,0, 0.3);
  h1 {
    font-size: 48px;
  }

  a:hover {
    text-decoration: none;
  }
`;

const Illustration = styled.div`

  svg {
    max-width: 8rem;
    margin: auto;
    display: block;
    .a {
      fill: ${(props) => props.theme.themeColors.white};
    }
    .b {
      fill: ${(props) => props.theme.brandDark};
    }
  }
`;

const SiteTitle = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  color: ${(props) => props.theme.neutralDark};
  h1 {
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }
`;

const Highlight = styled.div`
  margin-bottom: 1rem;
  background: #fff;

  &:hover {
    box-shadow: 6px 6px 10px ${(props) => props.theme.brandDark};
    transform: translate(0, -10px);
    transition: all 0.5s ease;
    a {
      text-decoration: none;
    }
  }

  h3 {
    color: ${(props) => props.theme.neutralDark};
  }
 
  p {
    hyphens: auto;
    margin-bottom: 0;
    color: ${(props) => props.theme.neutralDark};
  }
`;

function FrontHero(props) {
  const {
    t, bgImage, title, siteDescription, actionsDescription, indicatorsDescription,
  } = props;
  return (
    <BannerContent>
      <Container>
        <Row>
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
          >
            {(sprops) => (
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <SiteTitle style={sprops}>
                  <HeroVisual>
                    <HeroImage pic={bgImage} />
                  </HeroVisual>
                  <h1>{ title || 'Site Title' }</h1>
                  <p className="lead">{ siteDescription || 'Site Description' }</p>
                </SiteTitle>
              </Col>
            )}
          </Spring>
        </Row>
        <Row>
          <Col md="6" lg={{ size: 5, offset: 1 }}>
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              delay={250}
            >
              {(sprops) => (
                <ActionListLink>
                  <a href>
                    <Highlight
                      className="d-flex p-3 bd-highlight flex-row justify-content-center justify-content-md-start"
                      style={sprops}
                    >
                      <Illustration className="mr-4">
                        <IconActions />
                      </Illustration>
                      <div>
                        <h3>{ t('actions') }</h3>
                        <p>
                          { actionsDescription || 'Action Description' }
                        </p>
                      </div>
                    </Highlight>
                  </a>
                </ActionListLink>
              )}
            </Spring>
          </Col>
          <Col md="6" lg="5">
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              delay={200}
            >
              {(sprops) => (
                <IndicatorListLink>
                  <a href>
                    <Highlight
                      className="d-flex p-3 bd-highlight flex-row justify-content-center justify-content-md-start"
                      style={sprops}
                    >
                      <Illustration className="mr-4">
                        <IconIndicators />
                      </Illustration>
                      <div>
                        <h3>{ t('indicators') }</h3>
                        <p>
                          { indicatorsDescription || 'Indicator Description' }
                        </p>
                      </div>
                    </Highlight>
                  </a>
                </IndicatorListLink>
              )}
            </Spring>
          </Col>
        </Row>
      </Container>
    </BannerContent>
  );
}

FrontHero.propTypes = {
  t: PropTypes.func.isRequired,
  bgImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  siteDescription: PropTypes.string.isRequired,
  actionsDescription: PropTypes.string.isRequired,
  indicatorsDescription: PropTypes.string.isRequired,
};

export default withTranslation('common')(FrontHero);
