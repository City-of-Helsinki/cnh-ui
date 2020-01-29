import React from 'react';
import PropTypes from 'prop-types';
import posthtml from 'posthtml';
import externalLinks from 'posthtml-external-link-target-blank';

const HtmlContent = (props) => {
  const { html, linksToNewWindow, ...otherProps } = props;
  let content = html;
  if (linksToNewWindow) {
    // modify external links to open in new window
    content = posthtml()
      .use(externalLinks())
      .process(html, { sync: true })
      .html;
  }
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      {...otherProps}
    />
  );
};

HtmlContent.defaultProps = {
  linksToNewWindow: true,
};

HtmlContent.propTypes = {
  html: PropTypes.string.isRequired,
  linksToNewWindow: PropTypes.bool,
};

export default HtmlContent;
