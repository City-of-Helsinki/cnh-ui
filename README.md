# Carbon Neutral Helsinki 2035 Action Plan Monitoring UI

React ui for browsing and visualizing action plans. Built using [Next.js](https://nextjs.org).

* Displays data from [Aplans API](https://github.com/City-of-Helsinki/aplans)
* Uses [Kerrokantasi API](https://dev.hel.fi/projects/kerro-kantasi/) for commenting


## Development

#### Prerequisites

* [Yarn](https://yarnpkg.com/)

#### Getting Started

Clone the repository, install dependencies and run the development server locally:

    yarn install
    yarn dev

Preview the application locally on http://localhost:3000/

## Building and deploying in production

To run the app in production:

    yarn install
    yarn build
    yarn start

## Forking

City of Helsinki would like to request that when this source code is forked
and deployed to production use for another organization, the following phrases
would be added to the FAQ or similar section of the user-visible UI, as well as
to the public presentations or other materials presenting the new service:

> [Name of the service] is an open-source service based on [Helsinki Climate Watch](https://github.com/City-of-Helsinki/cnh-ui),
> a service developed by the City of Helsinki. Helsinki Climate Watch has
> received funding from the European Union EIT Climate-KIC programme.

Or in Finnish:

> Palvelu on avointa lähdekoodia ja perustuu alun perin Helsingin kaupungin kehittämään [Helsingin ilmastovahti -palveluun](https://github.com/City-of-Helsinki/cnh-ui).
> Helsingin ilmastovahti on saanut tukea EU:n Climate-KIC-ohjelmasta.
