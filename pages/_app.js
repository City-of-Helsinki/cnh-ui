import React from 'react';
import App from 'next/app';
import getConfig from 'next/config';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import ReactPiwik from 'react-piwik';

import { Router } from '../routes';
import { captureException } from '../common/sentry';
import { appWithTranslation } from '../common/i18n';
import PlanContext from '../context/plan';
import withApollo from '../common/apollo';
import Error from './_error';

require('../styles/' + process.env.THEME_IDENTIFIER + '/main.scss');

const { publicRuntimeConfig } = getConfig();

const GET_PLAN = gql`
  query Plan($plan: ID!) {
    plan(id: $plan) {
      id
      identifier
      name
      imageUrl
      actionSchedules {
        id,
        beginsAt,
        endsAt
      }
      actionImpacts {
        id,
        identifier,
        name,
        order
      }
      staticPages {
        id,
        name,
        slug,
        topMenu,
        footer
      }
      generalContent {
        siteTitle
        siteDescription
        officialNameDescription
        copyrightText
        creativeCommonsLicense
        ownerUrl
        ownerName
        actionShortDescription
        indicatorShortDescription
      }
    }
  }
`;


class AplansApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorEventId: undefined,
    };
    this.handleRouteChange = this.handleRouteChange.bind(this);

    if (process.browser && publicRuntimeConfig.matomoURL && publicRuntimeConfig.matomoSiteId) {
      this.piwik = new ReactPiwik({
        url: publicRuntimeConfig.matomoURL,
        siteId: publicRuntimeConfig.matomoSiteId,
        jsFilename: 'matomo.js',
        phpFilename: 'matomo.php',
      });
      // Track the initial page view
      ReactPiwik.push(['trackPageView']);
    }
  }

  static async getInitialProps(args) {
    const { Component, ctx } = args;
    let pageProps = {};
    let currentURL;

    if (ctx.req) {
      // The current, full URL is used in SSR to render the opengraph tags.
      currentURL = ctx.req.currentURL;
    }

    try {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
    } catch (error) {
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      captureException(error, ctx);
      throw error;
    }

    return { pageProps, currentURL };
  }

  componentDidCatch(error, errorInfo) {
    captureException(error, { errorInfo });
    throw error;
  }

  handleRouteChange(url) {
    if (!process.browser || !this.piwik) return;

    const parts = url.split('?');
    const pathname = parts[0];
    const path = pathname.substring(1);

    this.piwik.track({ path, pathname, search: '' });
  }

  componentDidMount() {
    Router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  shouldComponentUpdate(nextProps) {
    // Optimize performance by updating this component only
    // when props change. State is not used in render() so
    // no need to check it here.
    const keys = Object.keys(this.props);
    for (let i = 0; i < keys.length; i++) {
      if (this.props[keys[i]] !== nextProps[keys[i]]) {
        return true;
      }
    }
    return false;
  }

  render() {
    const {
      Component, pageProps, apollo, currentURL,
    } = this.props;
    const { planIdentifier, instanceType } = publicRuntimeConfig;

    return (
      <ApolloProvider client={apollo}>
        <Query query={GET_PLAN} variables={{ plan: planIdentifier }}>
          {({ data, loading, error }) => {
            if (error) return <Error message={error} />;
            if (loading) return null;

            const { plan } = data;
            plan.instanceType = instanceType;
            if (currentURL) plan.currentURL = currentURL;
            return (
              <PlanContext.Provider value={plan}>
                <Component {...pageProps} />
              </PlanContext.Provider>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}


export default appWithTranslation(withApollo(AplansApp));
