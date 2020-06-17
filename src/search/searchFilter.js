import React from 'react';

class SearchFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    gotoShop = (code) => {
        this.props.history.push(`/`);
    };

    render() {
        return (
            <>
                <div className="search-page">
                    <div className="filter-title">Search Filter</div>

                    <div className="filter-btn">
                        <div className="">
                            <div className="max-center">
                                <select className="filters-option">
                                    <option selected disabled>Filters</option>
                                    <option>Name</option>
                                    <option>Price Low to</option>
                                    <option>Height</option>
                                    <option>Price Height to</option>
                                    <option>Low</option>
                                </select>
                            </div>

                            <div className="max-center">
                                <select className="filters-option">
                                    <option selected disabled>Location</option>
                                    <option>Spain</option>
                                    <option>Italy</option>
                                    <option>Russia</option>
                                    <option>Poland</option>
                                    <option>India</option>
                                    <option>South Africa</option>
                                </select>
                            </div>

                            <div className="max-center">
                                <select className="filters-option">
                                    <option selected disabled>Price</option>
                                    <option>Name</option>
                                    <option>Price Low to</option>
                                    <option>Height</option>
                                    <option>Price Height to</option>
                                    <option>Low</option>
                                </select>
                            </div>

                            <div className="w3-bar phone-center justify-content">
                                <div className="w3-bar-item max-center ">
                                    <span><img className="grid-icon" src={require("../assets/images/border-all-solid.svg")} /></span>
                                    <span className="w3-hover-text-blue view-left-padding">View</span>
                                </div>

                                <div className="w3-bar-item max-center">
                                    <span className="w3-hover-text-blue sort-right-padding">Sort</span>
                                    <span><img className="sort-icon" src={require("../assets/images/sort.svg")} /></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="best-product">
                        <div className="products-title">Best Match</div>
                        <div className="flex-card-most">
                            <div className="w3-card best-match">
                                <div className="w3-row justify-filter-content">
                                    <div className="w3-col img-width">
                                        <img className="products-image" src={require("../assets/images/products/51589POT.png")} />
                                    </div>

                                    <div className="w3-col name-width">
                                        <div className="product-name">'Aardappel, rijst, pasta</div>
                                        <div className="w3-row justify-filter-content">
                                            <div className="w3-col l3 m2 s2">
                                                <img className="store-logo-icon" src={require("../assets/images/logo-icon1.png")} />
                                            </div>
                                            <div className="w3-col l9 m10 s10 description-product">'Smaakt Bio Soba Noedels 250g. 'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                        </div>
                                    </div>

                                    <div className="w3-col price-width">
                                        <div className="product-price">$22.55</div>
                                    </div>

                                    <div className="w3-col shop-width">
                                        <div onClick={this.gotoShop}><span className="link-shop">Go to Shop</span><img className="goToShop" src={require("../assets/images/next.png")} /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="w3-card best-match">
                                <div className="w3-row justify-filter-content">
                                    <div className="w3-col img-width">
                                        <img className="products-image" src={require("../assets/images/products/94151POT.png")} />
                                    </div>

                                    <div className="w3-col name-width">
                                        <div className="product-name">'Aardappel, rijst, pasta</div>
                                        <div className="w3-row justify-filter-content">
                                            <div className="w3-col l3 m2 s2">
                                                <img className="store-logo-icon" src={require("../assets/images/logo-icon1.svg")} />
                                            </div>
                                            <div className="w3-col l9 m10 s10 description-product">'Smaakt Bio Soba Noedels 250g. 'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                        </div>
                                    </div>

                                    <div className="w3-col price-width">
                                        <div className="product-price">$22.55</div>
                                    </div>

                                    <div className="w3-col shop-width">
                                        <div onClick={this.gotoShop}><span className="link-shop">Go to Shop</span><img className="goToShop" src={require("../assets/images/next.png")} /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="w3-card best-match">
                                <div className="w3-row justify-filter-content">
                                    <div className="w3-col img-width">
                                        <img className="products-image" src={require("../assets/images/products/134051DS.png")} />
                                    </div>

                                    <div className="w3-col name-width">
                                        <div className="product-name">'Aardappel, rijst, pasta</div>
                                        <div className="w3-row justify-filter-content">
                                            <div className="w3-col l3 m2 s2">
                                                <img className="store-logo-icon" src={require("../assets/images/logo-icon2.svg")} />
                                            </div>
                                            <div className="w3-col l9 m10 s10 description-product">'Smaakt Bio Soba Noedels 250g. 'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                        </div>
                                    </div>

                                    <div className="w3-col price-width">
                                        <div className="product-price">$22.55</div>
                                    </div>

                                    <div className="w3-col shop-width">
                                        <div onClick={this.gotoShop}><span className="link-shop">Go to Shop</span><img className="goToShop" src={require("../assets/images/next.png")} /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="w3-card best-match">
                                <div className="w3-row justify-filter-content">
                                    <div className="w3-col img-width">
                                        <img className="products-image" src={require("../assets/images/products/145330PAK.png")} />
                                    </div>

                                    <div className="w3-col name-width">
                                        <div className="product-name">'Aardappel, rijst, pasta</div>
                                        <div className="w3-row justify-filter-content">
                                            <div className="w3-col l3 m2 s2">
                                                <img className="store-logo-icon" src={require("../assets/images/logo-icon1.png")} />
                                            </div>
                                            <div className="w3-col l9 m10 s10 description-product">'Smaakt Bio Soba Noedels 250g. 'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                        </div>
                                    </div>

                                    <div className="w3-col price-width">
                                        <div className="product-price">$22.55</div>
                                    </div>

                                    <div className="w3-col shop-width">
                                        <div onClick={this.gotoShop}><span className="link-shop">Go to Shop</span><img className="goToShop" src={require("../assets/images/next.png")} /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="w3-card best-match">
                                <div className="w3-row justify-filter-content">
                                    <div className="w3-col img-width">
                                        <img className="products-image" src={require("../assets/images/products/163074STK.png")} />
                                    </div>

                                    <div className="w3-col name-width">
                                        <div className="product-name">'Aardappel, rijst, pasta</div>
                                        <div className="w3-row justify-filter-content">
                                            <div className="w3-col l3 m2 s2">
                                                <img className="store-logo-icon" src={require("../assets/images/logo-icon1.svg")} />
                                            </div>
                                            <div className="w3-col l9 m10 s10 description-product">'Smaakt Bio Soba Noedels 250g. 'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                        </div>
                                    </div>

                                    <div className="w3-col price-width">
                                        <div className="product-price">$22.55</div>
                                    </div>

                                    <div className="w3-col shop-width">
                                        <div onClick={this.gotoShop}><span className="link-shop">Go to Shop</span><img className="goToShop" src={require("../assets/images/next.png")} /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="w3-card best-match">
                                <div className="w3-row justify-filter-content">
                                    <div className="w3-col img-width">
                                        <img className="products-image" src={require("../assets/images/products/171448POT.png")} />
                                    </div>

                                    <div className="w3-col name-width">
                                        <div className="product-name">'Aardappel, rijst, pasta</div>
                                        <div className="w3-row justify-filter-content">
                                            <div className="w3-col l3 m2 s2">
                                                <img className="store-logo-icon" src={require("../assets/images/logo-icon2.svg")} />
                                            </div>
                                            <div className="w3-col l9 m10 s10 description-product">'Smaakt Bio Soba Noedels 250g. 'Aviko SuperCrunch Oven Pommes Frites 750g</div>
                                        </div>
                                    </div>

                                    <div className="w3-col price-width">
                                        <div className="product-price">$22.55</div>
                                    </div>

                                    <div className="w3-col shop-width">
                                        <div onClick={this.gotoShop}><span className="link-shop">Go to Shop</span><img className="goToShop" src={require("../assets/images/next.png")} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="next-prev-btn">
                            <div className="np-width">
                                <img className="btn-np" src={require("../assets/images/back.png")} />
                                <div className="btn-np">1</div>
                                <div className="btn-np">2</div>
                                <div className="btn-np">3</div>

                                <div className="btn-NL">Next</div>

                                <div className="btn-NL">Last</div>
                                <img className="btn-np"  src={require("../assets/images/next.png")} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SearchFilter;
