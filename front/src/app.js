import React, { Component } from 'react';
// import axios from "axios"

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SearchFilter from "./search/searchFilter";
import Home from "./home/home";


class App extends React.Component {

    constructor(props) {
        super(props);
    }
    //
    // navigatePage = (code) => {
    //     if (code === 13) {
    //         alert();
    //         return <Redirect to='/target' />
    //     }
    // };
    componentDidMount() {
        // axios.get("https://jsonplaceholder.typicode.com/users/2")
        //     .then(response => {
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="landing-body">
                    <switch>
                        <Route exact path="/" component={Home} key="home" />
                        <Route exact path="/searchFilter" component={SearchFilter} key="searchFilter" />
                    </switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
