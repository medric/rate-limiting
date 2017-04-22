'use strict';
// @flow
// SSR
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

export function index(req, res) {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

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
    });
}