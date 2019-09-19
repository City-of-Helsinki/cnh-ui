import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Navbar, Nav, NavItem, NavbarToggler,
} from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import { Link } from '../routes';
import PlanContext from '../context/plan';

import Icon from './Common/Icon';
// TODO: get page content from API
import mockData from '../pages/mock-content-data.json';

const TopNav = styled(Navbar)`
  background-color: ${props => props.theme.brandNavBackground};
`;

const BotNav = styled(Navbar)`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.brandDark};
`;

const Logo = styled.div`
  height: 2em;
`;

const DynamicNavItem = props => (
  <NavItem>
    <Link as={`/p/${props.id}`} href={`/content?title=${props.id}`}>
      <a className="nav-link">{props.title}</a>
    </Link>
  </NavItem>
)

class Header extends React.Component {
  static contextType = PlanContext;

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { theme, siteTitle } = this.props;
    const plan = this.context;

    return (
      <div>
        <TopNav expand="md">
          <Link href="/">
            <a aria-label="Helsinki, palvelun etusivu" className="navbar-brand">
              <Logo aria-hidden="true" className="nav-org-logo" />
            </a>
          </Link>
        </TopNav>
        <BotNav expand="md">
          <Link href="/">
            <a className="navbar-brand">{siteTitle}</a>
          </Link>
          <NavbarToggler onClick={this.toggle}><Icon name="bars" color={theme.brandDark}/></NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem key='actions'>
                <Link href="/#actions">
                  <a className="nav-link">Toimenpiteet</a>
                </Link>
              </NavItem>
              <NavItem key='indicators'>
                <Link href="/indicators">
                  <a className="nav-link">Mittarit</a>
                </Link>
              </NavItem>
              { plan.staticPages && plan.staticPages.map((page) => (
                <NavItem key={page.slug}>
                  <Link href={`/${page.slug}`}>
                    <a className="nav-link">{page.name}</a>
                  </Link>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </BotNav>
      </div>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default withTheme(Header);
