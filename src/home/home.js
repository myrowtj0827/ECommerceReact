import React, { Component } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    navigatePage = (code) => {
        if (code === 13) {
            // alert();
            this.props.history.push(`/searchFilter`);
        }
    };

    render() {
        return (
            <>
                <section className="landing-header">
                    <div className="w3-row min-width">
                        <div className="w3-bar">
                            <div className="w3-bar-item w3-left">
                                <div className="w3-container">
                                    <div className="w3-dropdown-hover">
                                        <span className=""><i className="fa fa-bars menu-size"
                                                              aria-hidden="true"></i></span>
                                        <div className="w3-dropdown-content w3-bar-block w3-border w3-text-white">
                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <i className="far fa-user icon-padding"></i>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Login/Register</div>
                                                </div>
                                            </a>

                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <i className="fas fa-list-ul icon-padding"></i>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9"> Categories</div>
                                                </div>
                                            </a>

                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="offer-size"
                                                             src={require('../assets/images/offers.svg')}/>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Offers</div>
                                                </div>
                                            </a>

                                            <div className="w3-bar-item w3-border-bottom"></div>

                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <i className="far fa-heart icon-padding"></i>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">WishList</div>
                                                </div>
                                            </a>

                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="percent-size"
                                                             src={require('..//assets/images/notification.svg')}/>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Notifications</div>
                                                </div>
                                            </a>

                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="offer-size"
                                                             src={require('../assets/images/history.svg')}/>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">History</div>
                                                </div>
                                            </a>

                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="percent-size"
                                                             src={require('..//assets/images/star.svg')}/>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Reviews</div>
                                                </div>
                                            </a>

                                            <div className="w3-bar-item w3-border-bottom"></div>

                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="percent-size"
                                                             src={require('..//assets/images/language.png')}/>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Language</div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w3-bar-item w3-right contact-us-max">
                                <div className="w3-btn w3-hover-orange w3-hover-text-white btnHome">
                                    <div className="btnUnderLine">Contact us</div>
                                </div>
                            </div>

                            <div className="w3-bar-item w3-right header-item-padding">
                                <div className="w3-btn w3-hover-orange w3-hover-text-white btnHome">
                                    <div className="btnUnderLine">How to use</div>
                                </div>
                            </div>

                            <div className="w3-bar-item w3-right header-item-padding">
                                <div className="w3-btn w3-hover-orange w3-hover-text-white btnHome">
                                    <div className="btnUnderLine">About</div>
                                </div>
                            </div>

                            <div className="w3-bar-item w3-right header-item-padding">
                                <div className="w3-btn w3-hover-orange w3-hover-text-white btnHome">
                                    <div className="btnUnderLine">Home</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="logo-search min-width">
                    <img className="logo-size" src={require('../assets/images/E-Commerce-Software-logo.png')}/>

                    <div className="input-align">
                        <input className="w3-input" type="text" placeholder="Choose the categories"
                               placeholder="Search the categories"
                            // value={this.state.askey}
                            // onChange={(e) => this.setState({ askey: e.target.value })}
                               onKeyUp={ev => this.navigatePage(ev.keyCode)}
                               required
                        />
                    </div>
                </section>

                <section className="featured-products min-width">
                    <div className="w3-row products-title">
                        Featured Products
                    </div>

                    <div className="w3-row slider-banner">
                        <OwlCarousel items={1}
                                     className="owl-theme"
                                     loop
                                     nav
                                     margin={4}
                                     autoplay={true}
                        >
                            <div className="w3-row">
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/226354STK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/134890FLS.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/134051DS.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/166882FLS.png')}/>
                                </div>
                            </div>

                            <div className="w3-row">
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/360691STK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/183535BLK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/359619BAK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/250405FLS.png')}/>
                                </div>
                            </div>

                            <div className="w3-row">
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/51589POT.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/171448POT.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/171464POT.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/174271KST.png')}/>
                                </div>
                            </div>

                            <div className="w3-row">
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/176489STK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/181242PAK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/183535BLK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/184415STK.png')}/>
                                </div>
                            </div>

                            <div className="w3-row">
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/186830STK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/190740CUP.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/201101DS.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/207282STK.png')}/>
                                </div>
                            </div>

                            <div className="w3-row">
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/208733STK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/295942STK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/351352DS.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/989681FLS.png')}/>
                                </div>
                            </div>

                            <div className="w3-row">
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/51589POT.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/171448POT.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/171464POT.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/174271KST.png')}/>
                                </div>
                            </div>

                            <div className="w3-row">
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/186830STK.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/190740CUP.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/201101DS.png')}/>
                                </div>
                                <div className="w3-col l3 m3 s3"><img className="slider__item"
                                                                      src={require('..//assets/images/products/207282STK.png')}/>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>

                    <div className="w3-row w3-right see-all show-more"><a>See All</a></div>
                </section>

                <section className="most-popular-product min-width">
                    <div className="w3-row products-title">
                        Most Popular Products
                    </div>

                    <div className="flex-card">
                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/51589POT.png')}/>
                            <div className="blue-txt">Smaakt Bio Soba Noedels 250g</div>
                            <div className="red-txt">$2.49</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/81430PAK.png')}/>
                            <div className="blue-txt">'La Place Girasoli Tomaat Mozzarella 250g</div>
                            <div className="red-txt">$2.99</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/94151POT.png')}/>
                            <div className="blue-txt">'La Place Erwt en Munt 250g</div>
                            <div className="red-txt">$2.99</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/134051DS.png')}/>
                            <div className="blue-txt">'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                            <div className="red-txt">$2.03</div>
                        </div>


                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/134890FLS.png')}/>
                            <div className="blue-txt">'Aviko SuperCrunch Originals Franse Friet 750g</div>
                            <div className="red-txt">$1.99</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/145330PAK.png')}/>
                            <div className="blue-txt">'Conimex Noodles Wok 248g</div>
                            <div className="red-txt">$1.24</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/163074STK.png')}/>
                            <div className="blue-txt">'Aviko SuperCrunch Airfryer Dunne Friet 750g</div>
                            <div className="red-txt">$2.08</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/166882FLS.png')}/>
                            <div className="blue-txt">'Tafelaardappelen Kruimig Voordeel Verpakking 5kg</div>
                            <div className="red-txt">$3.69</div>
                        </div>
                    </div>

                    <span id="productsSeeAll" className="w3-row collapse">
                    <div className="flex-card">
                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/171448POT.png')}/>
                            <div className="blue-txt">'La Dolce Vita Fusilli 500g</div>
                            <div className="red-txt">$0.79</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/171464POT.png')}/>
                            <div className="blue-txt">'Olvarit Bio Zoete Aardappel 4+ Maanden 125g</div>
                            <div className="red-txt">$1.01</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/174271KST.png')}/>
                            <div className="blue-txt">'Olvarit Bio Groentemix 6+ Maanden 200g</div>
                            <div className="red-txt">$1.34</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/176489STK.png')}/>
                            <div className="blue-txt">'HiPP Biologisch Baby's Lekkere Dagstart Appel, Perzik, Granen 6+ Maanden 100g</div>
                            <div className="red-txt">$1.36</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/134890FLS.png')}/>
                            <div className="blue-txt">'Olvarit Bio Spaghetti Tomaat 18+ Maanden 250g</div>
                            <div className="red-txt">$1.43</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/181242PAK.png')}/>
                            <div className="blue-txt">'Slimpie Bloedsinaasappel Grapefruit Smaak Siroop 580ml</div>
                            <div className="red-txt">$1.91</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/183535BLK.png')}/>
                            <div className="blue-txt">'HiPP Biologisch Appel Perzik Bosvruchten 4+ Maanden 90g</div>
                            <div className="red-txt">$1.67</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/184415STK.png')}/>
                            <div className="blue-txt">'Eco by Naty Size 1 2-5 kg 25 Luiers</div>
                            <div className="red-txt">$6.99</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/51589POT.png')}/>
                            <div className="blue-txt">Smaakt Bio Soba Noedels 250g</div>
                            <div className="red-txt">$2.49</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/81430PAK.png')}/>
                            <div className="blue-txt">'La Place Girasoli Tomaat Mozzarella 250g</div>
                            <div className="red-txt">$2.99</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/94151POT.png')}/>
                            <div className="blue-txt">'La Place Erwt en Munt 250g</div>
                            <div className="red-txt">$2.99</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/134051DS.png')}/>
                            <div className="blue-txt">'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                            <div className="red-txt">$2.03</div>
                        </div>


                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/134890FLS.png')}/>
                            <div className="blue-txt">'Aviko SuperCrunch Originals Franse Friet 750g</div>
                            <div className="red-txt">$1.99</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/145330PAK.png')}/>
                            <div className="blue-txt">'Conimex Noodles Wok 248g</div>
                            <div className="red-txt">$1.24</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/163074STK.png')}/>
                            <div className="blue-txt">'Aviko SuperCrunch Airfryer Dunne Friet 750g</div>
                            <div className="red-txt">$2.08</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/166882FLS.png')}/>
                            <div className="blue-txt">'Tafelaardappelen Kruimig Voordeel Verpakking 5kg</div>
                            <div className="red-txt">$3.69</div>
                        </div>


                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/171448POT.png')}/>
                            <div className="blue-txt">'La Dolce Vita Fusilli 500g</div>
                            <div className="red-txt">$0.79</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/171464POT.png')}/>
                            <div className="blue-txt">'Olvarit Bio Zoete Aardappel 4+ Maanden 125g</div>
                            <div className="red-txt">$1.01</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/174271KST.png')}/>
                            <div className="blue-txt">'Olvarit Bio Groentemix 6+ Maanden 200g</div>
                            <div className="red-txt">$1.34</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/176489STK.png')}/>
                            <div className="blue-txt">'HiPP Biologisch Baby's Lekkere Dagstart Appel, Perzik, Granen 6+ Maanden 100g</div>
                            <div className="red-txt">$1.36</div>
                        </div>


                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/134890FLS.png')}/>
                            <div className="blue-txt">'Olvarit Bio Spaghetti Tomaat 18+ Maanden 250g</div>
                            <div className="red-txt">$1.43</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/181242PAK.png')}/>
                            <div className="blue-txt">'Slimpie Bloedsinaasappel Grapefruit Smaak Siroop 580ml</div>
                            <div className="red-txt">$1.91</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/183535BLK.png')}/>
                            <div className="blue-txt">'HiPP Biologisch Appel Perzik Bosvruchten 4+ Maanden 90g</div>
                            <div className="red-txt">$1.67</div>
                        </div>

                        <div className="w3-card card-bg-padding">
                            <img className="img-item" src={require('..//assets/images/products/184415STK.png')}/>
                            <div className="blue-txt">'Eco by Naty Size 1 2-5 kg 25 Luiers</div>
                            <div className="red-txt">$6.99</div>
                        </div>
                    </div>
                </span>

                    <div className="w3-row w3-right see-all" data-toggle="collapse" data-target="#productsSeeAll"><a>See
                        All</a></div>
                </section>

                <section className="landing-footer">
                    <div className="">All prices are in USD</div>
                </section>

            </>
        );
    }
}

export default Home;
