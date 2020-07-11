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
            imgStore: '',
            categoryName: '',
            product_id: '',
            product_photo: '',
            product_category: '',
            product_name: '',
            product_price: '',
            product_description: '',
            product_store_logo: '',
            product_store_address: '',

            scraping_id: '',
            scraping_store_address: '',
            scraping_photo_link: '',
            scraping_category: '',
            scraping_name: '',
            scraping_description: '',
            scraping_price: '',

        }
    };

    selectImage = (e) => {
        const url = e.target.files[0];

        if (url) {
            const reader = new FileReader();
            reader.onload = fileEvent => {
                this.cropImage(fileEvent.target.result, 370)
                    .then(croppedImg => {

                        this.setState({
                            product_photo: croppedImg,
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            };
            reader.readAsDataURL(url);
        }
    };

    cropImage = (url, size, key) => {
        return new Promise(resolve => {
            // this image will hold our source image data
            const inputImage = new Image();

            // we want to wait for our image to load
            inputImage.onload = () => {
                // let's store the width and height of our image
                const minLength = Math.min(inputImage.naturalWidth, inputImage.naturalHeight);

                // calculate the position to draw the image at
                const offsetX = (inputImage.naturalWidth - minLength) / 2;
                const offsetY = (inputImage.naturalHeight - minLength) / 2;

                // create a canvas that will present the output image
                const outputImage = document.createElement('canvas');

                // set it to the same size as the image
                outputImage.width = size;
                outputImage.height = size;

                // draw our image at position 0, 0 on the canvas
                const ctx = outputImage.getContext('2d');
                ctx.drawImage(inputImage, offsetX, offsetY, minLength, minLength, 0, 0, size, size);
                resolve(outputImage.toDataURL('image/png', 0.4));
            };
            // start cropping
            inputImage.src = url;
        })
    };

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
            gettingLink,
            scrapingAllProducts
        } = this.props;

        gettingLink(this.state);
        scrapingAllProducts(this.state);
    };

    registerData = () => {
        const {
            createProduct
        } = this.props;

        createProduct(this.state);
    };

    productAllShow = () => {
        const {
            fetchAllProducts
        } = this.props;

        fetchAllProducts(this.state);
    };

    navigatePage = (code) => {
        if (code === 13) {
            localStorage.setItem('category', this.state.categoryName);

            this.props.history.push(`/searchFilter`);
        }
    };


    render() {

        const {
            product_photo,
        } = this.state;

        const {
            productList,
        } = this.props;

        const {
            scrapingList
        } = this.props;


        const imgShow = product_photo ? product_photo : no_img;
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

                    {/*<div className="w3-btn w3-blue w3-hover-yellow" data-toggle="collapse" data-target="#productsInsert" style={{marginTop: '40px'}}>Insert Image</div>*/}


                    <span id="productsInsert" className="w3-row collapse">
                        <div className="w3-row w3-center">
                        <div className="w3-row" style={{paddingTop: '40px'}}>
                            <div className="w3-col l4">
                                <img src={imgShow} />
                            </div>

                            <div className="w3-col l8">
                                <input type="file" id="owner_picture" accept="image/*"
                                       onChange={(event) => this.selectImage(event)} required />

                                <input className="w3-input w3-border-blue"
                                       type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}
                                       placeholder="ID"
                                       onChange={(event) => this.setState({ product_id: event.target.value })} required />

                                <input className="w3-input w3-border-blue"
                                       type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}
                                       placeholder="Category"
                                       onChange={(event) => this.setState({ product_category: event.target.value })} required />

                                <input className="w3-input w3-border-blue"
                                       type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}
                                       placeholder="Product Name"
                                       onChange={(event) => this.setState({ product_name: event.target.value })} required />

                                <input className="w3-input w3-border-blue"
                                       type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}
                                       placeholder="Product Price"
                                       onChange={(event) => this.setState({ product_price: event.target.value })} required />

                                <input className="w3-input w3-border-blue"
                                       type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}
                                       placeholder="Product Description"
                                       onChange={(event) => this.setState({ product_description: event.target.value })} required />

                                <input className="w3-input w3-border-blue"
                                       type="text" style={{margin: '0 auto', width: '100%', maxWidth: '50%', textAlign: 'left', marginTop: '20px', paddingLeft: '20px'}}
                                       placeholder="Product Store Address"
                                       onChange={(event) => this.setState({ product_store_address: event.target.value })} required />

                                <div className="w3-btn w3-yellow w3-hover-blue" onClick={this.registerData} style={{marginTop: '40px'}}>Register</div>

                                <div className="w3-btn w3-yellow w3-hover-blue" onClick={this.productAllShow} style={{marginTop: '40px'}}>Show</div>
                            </div>
                        </div>
                    </div>
                    </span>
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
                                    <img className="img-item" src={require('../assets/images/products/226354STK.png')} alt="" />
                                    <div className="blue-txt">Smaakt Bio Soba Noedels 250g</div>
                                    <div className="red-txt">$2.49</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/134890FLS.png')} alt="" />
                                    <div className="blue-txt">'La Place Girasoli Tomaat 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/134051DS.png')} alt="" />
                                    <div className="blue-txt">'La Place Erwt en Munt 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/166882FLS.png')} alt="" />
                                    <div className="blue-txt">'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                    <div className="red-txt">$2.03</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/360691STK.png')} alt="" />
                                    <div className="blue-txt">Smaakt Bio Soba Noedels 250g</div>
                                    <div className="red-txt">$2.49</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/183535BLK.png')} alt="" />
                                    <div className="blue-txt">'La Place Girasoli Tomaat 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/359619BAK.png')} alt="" />
                                    <div className="blue-txt">'La Place Erwt en Munt 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/250405FLS.png')} alt="" />
                                    <div className="blue-txt">'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                    <div className="red-txt">$2.03</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/51589POT.png')} alt="" />
                                    <div className="blue-txt">Smaakt Bio Soba Noedels 250g</div>
                                    <div className="red-txt">$2.49</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/171448POT.png')} alt="" />
                                    <div className="blue-txt">'La Place Girasoli Tomaat 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/171464POT.png')} alt="" />
                                    <div className="blue-txt">'La Place Erwt en Munt 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/174271KST.png')} alt="" />
                                    <div className="blue-txt">'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                    <div className="red-txt">$2.03</div>
                                </div>
                            </div>

                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/176489STK.png')} alt="" />
                                    <div className="blue-txt">Smaakt Bio Soba Noedels 250g</div>
                                    <div className="red-txt">$2.49</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/181242PAK.png')} alt="" />
                                    <div className="blue-txt">'La Place Girasoli Tomaat 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/183535BLK.png')} alt="" />
                                    <div className="blue-txt">'La Place Erwt en Munt 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/184415STK.png')} alt="" />
                                    <div className="blue-txt">'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                    <div className="red-txt">$2.03</div>
                                </div>
                            </div>

                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/186830STK.png')} alt="" />
                                    <div className="blue-txt">Smaakt Bio Soba Noedels 250g</div>
                                    <div className="red-txt">$2.49</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/190740CUP.png')} alt="" />
                                    <div className="blue-txt">'La Place Girasoli Tomaat 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/201101DS.png')} alt="" />
                                    <div className="blue-txt">'La Place Erwt en Munt 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/207282STK.png')} alt="" />
                                    <div className="blue-txt">'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                    <div className="red-txt">$2.03</div>
                                </div>
                            </div>

                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/208733STK.png')} alt="" />
                                    <div className="blue-txt">Smaakt Bio Soba Noedels 250g</div>
                                    <div className="red-txt">$2.49</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/295942STK.png')} alt="" />
                                    <div className="blue-txt">'La Place Girasoli Tomaat 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/351352DS.png')} alt="" />
                                    <div className="blue-txt">'La Place Erwt en Munt 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/989681FLS.png')} alt="" />
                                    <div className="blue-txt">'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                    <div className="red-txt">$2.03</div>
                                </div>
                            </div>

                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/186830STK.png')} alt="" />
                                    <div className="blue-txt">Smaakt Bio Soba Noedels 250g</div>
                                    <div className="red-txt">$2.49</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/190740CUP.png')} alt="" />
                                    <div className="blue-txt">'La Place Girasoli Tomaat 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/201101DS.png')} alt="" />
                                    <div className="blue-txt">'La Place Erwt en Munt 250g</div>
                                    <div className="red-txt">$2.99</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item" src={require('../assets/images/products/207282STK.png')} alt="" />
                                    <div className="blue-txt">'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                    <div className="red-txt">$2.03</div>
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
                                            <div className="red-txt">${item.scraping_price}</div>
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
                                            <div className="red-txt">${item.scraping_price}</div>
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
        productList: state.filter.productList,
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
    }
)(Home);
