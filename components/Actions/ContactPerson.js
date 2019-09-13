import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Media, Button, Collapse } from 'reactstrap';

import AvatarImage from '../../images/default-avatar.png';

const Person = styled.div`
  margin-top: 1em;
  padding-bottom: 1em;
  border-bottom: 2px solid ${(props) => props.theme.themeColors.light};
`;

const PersonDetails = styled(Media)`
  margin-left: 1em;
`;

const Name = styled.p`
  line-height: 1;
  margin-bottom: .25em;
  font-weight: 600;
`;

const PersonRole = styled.p`
  margin-bottom: .25em;
  color: ${(props) => props.theme.themeColors.dark};
  font-weight: 600;
  line-height: 1;
`;

const PersonOrg = styled.p`
  margin-bottom: .5em;
  color: ${(props) => props.theme.themeColors.dark};
  line-height: 1;
`;

const Avatar = styled.img`
  width: 6em;
  height: 6em;
`;

const Address = styled.address`
  margin-top: 1em;
  margin-bottom: 0;
`;

const CollapseButton = styled(Button)`
  padding: 0;
`;

class ContactPerson extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  state = { collapse: false };

  toggle() {
    this.setState((state) => ({ collapse: !state.collapse }));
  }

  render() {
    const { person } = this.props;
    const { collapse } = this.state;
    return (
      <Person>
        <Media key={person.id}>
          <Media left>
            <Avatar
              src={person.avatarUrl ? person.avatarUrl : AvatarImage}
              className="rounded-circle"
              alt={`${person.firstName} ${person.lastName}`}
            />
          </Media>
          <PersonDetails body>
            <Name>
              {`${person.firstName} ${person.lastName}`}
            </Name>
            <PersonRole>Titteli puuttuu</PersonRole>
            <PersonOrg>Organisaatio puuttuu</PersonOrg>
            <CollapseButton
              onClick={this.toggle}
              color="link"
              size="sm"
              aria-expanded={collapse}
              aria-controls={`contact-${person.id}`}
            >
              Yhteystiedot
            </CollapseButton>
          </PersonDetails>
        </Media>
        <Collapse isOpen={collapse} id={`contact-${person.id}`}>
          <Address>
            Sähköposti:
            {' '}
            <a href={`mailto:${person.firstName}.${person.lastName}@hel.fi`}>
              {`${person.firstName}.${person.lastName}@hel.fi`}
            </a>
            <br />
            Puhelin:
            {' '}
            <a href="tel:+358 555 5555">
              +358 555 5555
            </a>
          </Address>
        </Collapse>
      </Person>
    );
  }
}

ContactPerson.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default ContactPerson;