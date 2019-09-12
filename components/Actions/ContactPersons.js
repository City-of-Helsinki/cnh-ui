import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContactPerson from './ContactPerson';

const ContactList = styled.ul`
  margin-top: 2em;
  list-style: none;
  padding: 0;
`;


function ContactPersons(props) {
  const { persons } = props;
  return (
    <>
      <h5>Yhteyshenkilöt</h5>
      <ContactList>
        { persons.length !== 0
          ? persons.map((person) => (
            <li key={person.id}>
              <ContactPerson person={person} />
            </li>
          ))
          : <h6>Ei merkittyjä yhteyshenkilöitä</h6>}
      </ContactList>
    </>
  );
}
ContactPersons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
  })).isRequired,
};

export default ContactPersons;
