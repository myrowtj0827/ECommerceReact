import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

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
