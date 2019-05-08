import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import IndicatorValueGraph from '../components/Indicators/IndicatorValueGraph';

import '../styles/hnh2035/main.scss';

storiesOf('IndicatorSummary', module)
  .add('bad', () => <IndicatorValueGraph initialValue={4997} initialTime={1995} currentValue={6606} currentTime={2017} goalValue={4600} goalTime={2035} unit="Gwh/a" development="bad"/>)
  .add('good but slow', () => <IndicatorValueGraph initialValue={8004} initialTime={1995} currentValue={6606} currentTime={2017} goalValue={2000} goalTime={2035} unit="Gwh/a" development="goodSlow"/>)
  .add('good', () => <IndicatorValueGraph initialValue={6970} initialTime={1995} currentValue={6606} currentTime={2017} goalValue={2000} goalTime={2035} unit="Gwh/a" development="good"/>)
  .add('close to goal', () => <IndicatorValueGraph initialValue={6970} initialTime={1995} currentValue={52060} currentTime={2018} goalValue={64000} goalTime={2021} unit="käyttäjää" development="good"/>)
  .add('cats', () => <IndicatorValueGraph initialValue={0} initialTime={2007} currentValue={2} currentTime={2019} goalValue={12} goalTime={2025} unit="kissaa" development="goodSlow"/>);
