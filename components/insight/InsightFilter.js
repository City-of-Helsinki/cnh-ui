import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { Typeahead } from 'react-bootstrap-typeahead';
import { withTranslation } from '../../common/i18n';

function InsightFilter(props) {
  const { nodes, activeFilterNode, t } = props;
  const options = nodes
    .filter(node => node.indicator_level === 'strategic' || node.id == activeFilterNode)
    .map((node) => {
      const out = {};
      out.id = node.id;
      out.label = node.name;
      return out;
    });

  function handleChange(data) {
    const selectedNode = data[0];
    let nodeId;

    if (selectedNode) {
      nodeId = selectedNode.id;
    } else {
      nodeId = null;
    }
    props.onFilterNode(nodeId);
  }

  let defaultSelected;
  if (activeFilterNode) {
    defaultSelected = options.filter(opt => opt.id === activeFilterNode);
  } else {
    defaultSelected = [];
  }

  return (
    <div className="mb-4">
      <h5>{ t('insight-filter-label') }</h5>

      <Typeahead
        id="insight-filter"
        onChange={handleChange}
        ignoreDiacritics={false}
        clearButton
        emptyLabel={t('insight-filter-no-results')}
        defaultSelected={defaultSelected}
        options={options}
      />
    </div>
  );
}

export default withTranslation('common')(InsightFilter);
