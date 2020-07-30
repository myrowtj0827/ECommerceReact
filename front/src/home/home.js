import React, { Component } from 'react';
import { connect } from "react-redux";
import { createProduct, fetchAllProducts } from "../redux/actions/filter/filter";

import { gettingLink, scrapingAllProducts } from "../redux/actions/filter/scrapingProduct";

import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import no_img from "../assets/images/noImage.png";


class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // imgStore: '',
            categoryName: '',
            // product_id: '',
            // product_photo: '',
            // product_category: '',
            // product_name: '',
            // product_price: '',
            // product_description: '',
            // product_store_logo: '',
            // product_store_address: '',

            scraping_id: '',
            scraping_store_address: '',
            scraping_photo_link: '',
            scraping_category: '',
            scraping_name: '',
            scraping_description: '',
            scraping_price: '',

        }
    };

    // selectImage = (e) => {
    //     const url = e.target.files[0];
    //
    //     if (url) {
    //         const reader = new FileReader();
    //         reader.onload = fileEvent => {
    //             this.cropImage(fileEvent.target.result, 370)
    //                 .then(croppedImg => {
    //
    //                     this.setState({
    //                         product_photo: croppedImg,
    //                     })
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 });
    //         };
    //         reader.readAsDataURL(url);
    //     }
    // };
    //
    // cropImage = (url, size, key) => {
    //     return new Promise(resolve => {
    //         // this image will hold our source image data
    //         const inputImage = new Image();
    //
    //         // we want to wait for our image to load
    //         inputImage.onload = () => {
    //             // let's store the width and height of our image
    //             const minLength = Math.min(inputImage.naturalWidth, inputImage.naturalHeight);
    //
    //             // calculate the position to draw the image at
    //             const offsetX = (inputImage.naturalWidth - minLength) / 2;
    //             const offsetY = (inputImage.naturalHeight - minLength) / 2;
    //
    //             // create a canvas that will present the output image
    //             const outputImage = document.createElement('canvas');
    //
    //             // set it to the same size as the image
    //             outputImage.width = size;
    //             outputImage.height = size;
    //
    //             // draw our image at position 0, 0 on the canvas
    //             const ctx = outputImage.getContext('2d');
    //             ctx.drawImage(inputImage, offsetX, offsetY, minLength, minLength, 0, 0, size, size);
    //             resolve(outputImage.toDataURL('image/png', 0.4));
    //         };
    //         // start cropping
    //         inputImage.src = url;
    //     })
    // };

    componentDidMount() {
        const {
            fetchAllProducts,
            scrapingAllProducts,
            productList,
            scrapingList,
        } = this.props;

        if (fetchAllProducts) {
            fetchAllProducts();
        }

        if (scrapingAllProducts) {
            scrapingAllProducts();
        }

        $("button").click(function () {
            $.getAttribute();
        })

    }

    scrapingData = () => {
        const {
            gettingLink
        } = this.props;

        gettingLink(this.state);
    };

    scrapingResultShow = () => {
        const {
            scrapingAllProducts
        } = this.props;

        scrapingAllProducts(this.state);
    };

    // scrapingDelete = () => {
    //     const {
    //         gettingLink,
    //         ScrapingDelete,
    //         scrapingAllProducts
    //     } = this.props;
    //     gettingLink(this.state);
    //     ScrapingDelete(this.state);
    //     scrapingAllProducts(this.state);
    // };

    // registerData = () => {
    //     const {
    //         createProduct
    //     } = this.props;
    //
    //     createProduct(this.state);
    // };
    //
    // productAllShow = () => {
    //     const {
    //         fetchAllProducts
    //     } = this.props;
    //
    //     fetchAllProducts(this.state);
    // };

    navigatePage = (code) => {
        if (code === 13) {
            localStorage.setItem('category', this.state.categoryName);

            this.props.history.push(`/searchFilter`);
        }
    };

    render() {

        // const {
        //     product_photo,
        // } = this.state;

        // const {
        //     productList,
        // } = this.props;

        const {
            scrapingList
        } = this.props;


       // const imgShow = product_photo ? product_photo : no_img;
        return (
            <>
                <section className="landing-header">
                    <div className="w3-row min-width">
                        <div className="w3-bar">
                            <div className="w3-bar-item w3-left">
                                <div className="w3-container">
                                    <div className="w3-dropdown-hover">
                                        <span className=""><i className="fa fa-bars menu-size" aria-hidden="true"></i></span>
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
                                                        <img className="offer-size" src={require('../assets/images/offers.svg')} alt="" />
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
                                                             src={require('..//assets/images/notification.svg')} alt="" />
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Notifications</div>
                                                </div>
                                            </a>

                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="offer-size"
                                                             src={require('../assets/images/history.svg')} alt="" />
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">History</div>
                                                </div>
                                            </a>

                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="percent-size"
                                                             src={require('..//assets/images/star.svg')} alt="" />
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Reviews</div>
                                                </div>
                                            </a>

                                            <div className="w3-bar-item w3-border-bottom"></div>

                                            <a href="#" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="percent-size"
                                                             src={require('..//assets/images/language.png')} alt="" />
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
                    <img className="logo-size" src={require('../assets/images/E-Commerce-Software-logo.png')} alt="" />

                    <div className="input-align">
                        <input className="w3-input" type="text" placeholder="Search the categories"
                               onChange={(event) => this.setState({ categoryName: event.target.value })}
                               onKeyUp={event => this.navigatePage(event.keyCode)}
                               required />
                    </div>

                    <div className="w3-btn w3-yellow w3-hover-blue" onClick={this.scrapingData} style={{marginTop: '40px'}}>Scraping Start</div>

                    <div className="w3-btn w3-yellow w3-hover-blue" onClick={this.scrapingResultShow} style={{marginTop: '40px'}}>Scraping Result</div>
                    {/*<div className="w3-btn w3-yellow w3-hover-blue" onClick={this.scrapingDelete} style={{marginTop: '40px'}}>DB Delete</div>*/}

                    {/*<div className="w3-btn w3-blue w3-hover-yellow" data-toggle="collapse" data-target="#productsInsert" style={{marginTop: '40px'}}>Insert Image</div>*/}
                    {/*<span id="productsInsert" className="w3-row collapse">*/}
                    {/*    <div className="w3-row w3-center">*/}
                    {/*    <div className="w3-row" style={{paddingTop: '40px'}}>*/}
                    {/*        <div className="w3-col l4">*/}
                    {/*            <img src={imgShow} />*/}
                    {/*        </div>*/}

                    {/*        <div className="w3-col l8">*/}
                    {/*            <input type="file" id="owner_picture" accept="image/*"*/}
                    {/*                   onChange={(event) => this.selectImage(event)} required />*/}

                    {/*            <input className="w3-input w3-border-blue"*/}
                    {/*                   type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}*/}
                    {/*                   placeholder="ID"*/}
                    {/*                   onChange={(event) => this.setState({ product_id: event.target.value })} required />*/}

                    {/*            <input className="w3-input w3-border-blue"*/}
                    {/*                   type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}*/}
                    {/*                   placeholder="Category"*/}
                    {/*                   onChange={(event) => this.setState({ product_category: event.target.value })} required />*/}

                    {/*            <input className="w3-input w3-border-blue"*/}
                    {/*                   type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}*/}
                    {/*                   placeholder="Product Name"*/}
                    {/*                   onChange={(event) => this.setState({ product_name: event.target.value })} required />*/}

                    {/*            <input className="w3-input w3-border-blue"*/}
                    {/*                   type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}*/}
                    {/*                   placeholder="Product Price"*/}
                    {/*                   onChange={(event) => this.setState({ product_price: event.target.value })} required />*/}

                    {/*            <input className="w3-input w3-border-blue"*/}
                    {/*                   type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}*/}
                    {/*                   placeholder="Product Description"*/}
                    {/*                   onChange={(event) => this.setState({ product_description: event.target.value })} required />*/}

                    {/*            <input className="w3-input w3-border-blue"*/}
                    {/*                   type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}*/}
                    {/*                   placeholder="Product Store Address"*/}
                    {/*                   onChange={(event) => this.setState({ product_store_address: event.target.value })} required />*/}

                    {/*            <div className="w3-btn w3-yellow w3-hover-blue" onClick={this.registerData} style={{marginTop: '40px'}}>Register</div>*/}

                    {/*            <div className="w3-btn w3-yellow w3-hover-blue" onClick={this.productAllShow} style={{marginTop: '40px'}}>Show</div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*</span>*/}
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

                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1542352705/N14773385A_M2.jpg'} alt="" />
                                    <div className="blue-txt">FC Bayern Pre Match Jersey Collegiate Navy/White</div>
                                    <div className="red-txt">SAR 140</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1562821028/N25889578V_1.jpg'} alt="" />
                                    <div className="blue-txt">Boot League Short Sleeve T-Shirt Black/Collegiate Navy/Active Teal/White</div>
                                    <div className="red-txt">SAR 97</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1586153040/N29872531V_1.jpg'} alt="" />
                                    <div className="blue-txt">Sportswear Remix T-Shirt Black</div>
                                    <div className="red-txt">SAR 83</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1589521994/N34111287V_1.jpg'} alt="" />
                                    <div className="blue-txt">Moments Basketball T-Shirt Light Blue</div>
                                    <div className="red-txt">SAR 143</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1572184233/N31243714V_1.jpg'} alt="" />
                                    <div className="blue-txt">Star Chevron T-Shirt Red</div>
                                    <div className="red-txt">SAR 97</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1572326301/N31288604V_1.jpg'} alt="" />
                                    <div className="blue-txt">Felix Graphic T-Shirt white</div>
                                    <div className="red-txt">SAR 148</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1589521985/N34111232V_1.jpg'} alt="" />
                                    <div className="blue-txt">Baseline Buckets Basketball T-Shirt Black</div>
                                    <div className="red-txt">SAR 119</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1585594405/N29872238V_1.jpg'} alt="" />
                                    <div className="blue-txt">Dri-FIT Humor T-Shirt Black/White</div>
                                    <div className="red-txt">SAR 81</div>
                                </div>
                            </div>

                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1589715672/N11292764A_1.jpg'} alt="" />
                                    <div className="blue-txt">Skin Refining Clear-Up Strips</div>
                                    <div className="red-txt">SAR 19</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1513172074/N12874978A_1.jpg'} alt="" />
                                    <div className="blue-txt">Body And Face Scrubbing Cream 500ml</div>
                                    <div className="red-txt">SAR 45</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1557487643/N15658822A_1.jpg'} alt="" />
                                    <div className="blue-txt">Vitamin E Oil Clear 75ml</div>
                                    <div className="red-txt">SAR 17.2</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1583837534/N29905109A_1.jpg'} alt="" />
                                    <div className="blue-txt">Facial Serum Vitamin C 30ml</div>
                                    <div className="red-txt">SAR 19</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1525757135/N13714689A_1.jpg'} alt="" />
                                    <div className="blue-txt">Multipurpose Foldable Table White 74centimeter</div>
                                    <div className="red-txt">SAR 89</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1556468124/N24214884A_1.jpg'} alt="" />
                                    <div className="blue-txt">9-Layer Shoe Rack Grey/Black 60x108x30centimeter</div>
                                    <div className="red-txt">SAR 158</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1522418998/N14004197A_1.jpg'} alt="" />
                                    <div className="blue-txt">Inflatable Pull Out Sofa Bed Black 221x66x193centimeter</div>
                                    <div className="red-txt">SAR 359</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1556468124/N24214879A_1.jpg'} alt="" />
                                    <div className="blue-txt">12-Layer Shoe Rack Black/White 118x120x30centimeter</div>
                                    <div className="red-txt">SAR 140</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1590059570/N37750239V_1.jpg'} alt="" />
                                    <div className="blue-txt">Smash V2 Max</div>
                                    <div className="red-txt">SAR 223</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1590562286/N38379738V_1.jpg'} alt="" />
                                    <div className="blue-txt">Pack of 9 Sensitive Baby Wipes, 540 Counts</div>
                                    <div className="red-txt">SAR </div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1589996076/N35699194V_1.jpg'} alt="" />
                                    <div className="blue-txt">Bountiful Quick Path Sports Shoes</div>
                                    <div className="red-txt">SAR 212</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1536065876/N16898584A_1.jpg'} alt="" />
                                    <div className="blue-txt">6-Piece Compressed Two-Sided Comforter Set Microfibre Dark Purple King</div>
                                    <div className="red-txt">SAR 144.85</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1572867966/N31073554A_1.jpg'} alt="" />
                                    <div className="blue-txt">Printed Flat Bedsheet Set Cotton Blend Multicolour Double</div>
                                    <div className="red-txt">SAR 32</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1569584309/N30384324A_1.jpg'} alt="" />
                                    <div className="blue-txt">3-Piece Compressed Single Size Comforter Set Microfibre Pink</div>
                                    <div className="red-txt">SAR 34</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1582650388/N23010459A_1.jpg'} alt="" />
                                    <div className="blue-txt">6-Piece Platinum Plus Printed Bedsheet Set Cotton Blend Multicolor 229X254centimeter</div>
                                    <div className="red-txt">SAR 58</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1554838769/N23114850A_1.jpg'} alt="" />
                                    <div className="blue-txt">Modern Home Painted Linen Pillowcase Linen White/Yellow</div>
                                    <div className="red-txt">SAR 9.95</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1589526624/N37107396V_1.jpg'} alt="" />
                                    <div className="blue-txt">Breathe Run T-Shirt Black</div>
                                    <div className="red-txt">SAR 115</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1578908718/N32735043V_1.jpg'} alt="" />
                                    <div className="blue-txt">Rebel Block Sweatpants Grey</div>
                                    <div className="red-txt">SAR 230</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1589526627/N37107421V_1.jpg'} alt="" />
                                    <div className="blue-txt">Breath Run Tank Top Black</div>
                                    <div className="red-txt">SAR 104</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1589521998/N34111313V_1.jpg'} alt="" />
                                    <div className="blue-txt">Charged Cotton Training T-Shirt Light Blue</div>
                                    <div className="red-txt">SAR 135</div>
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
                        {
                            scrapingList && scrapingList.map((item, key) => {
                                if (key < 8) {
                                    return (
                                        <div className="w3-card card-bg-padding">
                                            <a href={item.scraping_store_address}><img className="img-item" key={key} src={item.scraping_photo_link}/></a>
                                            <div className="scraping-name">{item.scraping_name}</div>
                                            <div className="blue-txt">{item.scraping_description}</div>
                                            <div className="red-txt">SAR {item.scraping_price}</div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>

                    <span id="productsSeeAll" className="w3-row collapse">
                        <div className="flex-card">
                        {
                            scrapingList && scrapingList.map((item, key) => {
                                if (key >= 8) {
                                    return (
                                        <div className="w3-card card-bg-padding">
                                            <a href={item.scraping_store_address}><img className="img-item" key={key} src={item.scraping_photo_link}/></a>
                                            <div className="scraping-name">{item.scraping_name}</div>
                                            <div className="blue-txt">{item.scraping_description}</div>
                                            <div className="red-txt">SAR {item.scraping_price}</div>
                                        </div>
                                    )
                                }
                            })
                        }
                        </div>
                    </span>

                    <div className="w3-row w3-right see-all" data-toggle="collapse" data-target="#productsSeeAll">
                        <a>See All</a>
                    </div>
                </section>

                <section className="landing-footer">
                    <div className="">All prices are in USD</div>
                </section>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // productList: state.filter.productList,
        scrapingList: state.scrapingProduct.scrapingList,
    }
};

export default connect(
    mapStateToProps,
    {
        createProduct,
        fetchAllProducts,
        scrapingAllProducts,
        gettingLink,
        // ScrapingDelete,ScrapingDelete,
    }
)(Home);
