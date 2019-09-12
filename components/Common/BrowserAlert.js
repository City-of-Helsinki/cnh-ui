import React from 'react';
import { Alert } from 'reactstrap';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  padding: 2em;
  margin-bottom: 0;
`;

const BrowserList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const BrowserItem = styled.li`
  display: inline-block;
  margin-right: .5em;
  font-weight: 600;

  &:after {
    content: "|";
    margin-left: .5em;
  }

  &:last-child:after {
    content: "";
  }
`;

class BrowserAlert extends React.Component {
  state = {
    visible: true,
  };

  onDismiss = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;

    let isIE = false;
    if (typeof window !== 'undefined') {
      isIE = /* @cc_on!@ */false || !!document.documentMode;
    }

    return (
      <StyledAlert color="warning" isOpen={visible && isIE} toggle={this.onDismiss}>
        <h3>Internet Explorer ei ole tuettu</h3>
        <p>
          Sivuston kaikki toiminnallisuudet eivät tue käyttämääsi IE selainta.
          <br />
          Suosittelemme käyttämään jotain näistä selainohjelmistoista:
          <BrowserList>
            <BrowserItem><a href="https://www.microsoft.com/en-us/windows/microsoft-edge">Edge</a></BrowserItem>
            <BrowserItem><a href="https://www.google.com/chrome">Chrome</a></BrowserItem>
            <BrowserItem><a href="https://www.firefox.com/">Mozilla Firefox</a></BrowserItem>
            <BrowserItem><a href="https://www.apple.com/safari/">Safari</a></BrowserItem>
            <BrowserItem><a href="https://www.opera.com/">Opera</a></BrowserItem>
          </BrowserList>
        </p>
      </StyledAlert>
    );
  }
}

export default BrowserAlert;
