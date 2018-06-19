import React from 'react';
import { Route } from 'react-router';
import {
    Layout,
    RestRequest
} from '../';


export class Home extends React.Component {
    render() {
        return <Layout>
            <Route path='/webapi' component={ RestRequest }/>
        </Layout>
    }
}
