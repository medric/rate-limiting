'use strict';
// @flow
// SSR
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { matchPath } from 'react-router-dom'
import { StaticRouter, RouterContext } from 'react-router';
import routes from '../../../common/routes';
import {App} from '../../../app/components';

export function index(req, res) {
    const context = {};

    const html = ReactDOMServer.renderToString(
        <StaticRouter
            location={req.url}
            context={context}
        >
            <App/>
        </StaticRouter>
    )

    const promises = [];
    routes.some(route => {
        // use `matchPath` here
        const match = matchPath(req.url, route)
        if (match) {
            promises.push(route.loadData(match))
        }

        return match;
    });

    Promise.all(promises).then(data => {
        // do something w/ the data so the client
        // can access it then render the app
        render();
    })

    function render() {
        if (context.url) {
            res.writeHead(301, {
                Location: context.url
            });
            res.end();
        } else {
            res.write(index(html));
            res.end();
        }
    }
    /*match({ routes: routes.default, location: req.url }, 
        (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                const component = renderToString(
                    <RouterContext {...renderProps} />
                );

                fetchData();

                // Waiting for data to be fetched before rendering
                async function fetchData() {
                    
                    const data = {
                        title: 'Airtasker',
                        content: component,
                    };

                    res.status(200);
                    res.render('index', data);
                }
            } else {
                res.status(404).send('Not found')
            }
    });*/
}