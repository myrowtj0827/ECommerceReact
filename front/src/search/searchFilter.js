import React from 'react';
import {connect} from "react-redux";
import { fetchAllProducts, SortProduct } from "../redux/actions/filter/filter";
import { scrapingAllProducts, ScrapingSort } from "../redux/actions/filter/scrapingProduct"

import storeLogo1 from "../assets/images/logo-icon1.png";
import storeLogo2 from "../assets/images/logo-icon2.svg";
import storeLogo3 from "../assets/images/logo-icon3.svg";

import storeLogoNoon from "../assets/images/noon_logo_black_english.svg";
import storeLogoSwsg from "../assets/images/storeLogoSwsg.png";
import redseaLogo from "../assets/images/redseaLogo.svg";
import extraLogo from "../assets/images/extraLogo.svg";

class SearchFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            //SortProduct,
            ScrapingSort
        } = this.props;

        // if (SortProduct) {
        //     SortProduct( localStorage.getItem('category'));
        // }

        if (ScrapingSort) {
            ScrapingSort( localStorage.getItem('category'));
        }
    }

    gotoShop = (code) => {
        this.props.history.push(`/`);
    };

    render() {

        const {
            //productSortList,
            scrapingSortList,
        } = this.props;

        const category = localStorage.getItem('category');

        const logoArray = {
            'noon.com': storeLogoNoon, // completed
            'blackbox.com.sa': storeLogo2,
            'amazon.sa': storeLogo1,
            'extra.com': extraLogo, //completed
            'samma3a.com': storeLogo1,
            'bukhamsen.com': storeLogo2,
            'alsomah.com.sa': storeLogo3,
            'redsea.com': redseaLogo, // completed
            'mystore.com.sa': storeLogo1,
            'virginmegastore.sa': storeLogo2,
            'jarir.com': storeLogo3,
            'electrostores.com': storeLogo1,
            'swsg.co': storeLogoSwsg, // completed
            'xcite.com': storeLogo3,
            'ubuy.com': storeLogo1,
            'lowimart.com': storeLogo2
        };

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
                                    <option>Saudi Arabia</option>
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
                                    <span><img className="grid-icon" src={require("../assets/images/border-all-solid.svg")} alt="" /></span>
                                    <span className="w3-hover-text-blue view-left-padding">View</span>
                                </div>

                                <div className="w3-bar-item max-center">
                                    <span className="w3-hover-text-blue sort-right-padding">Sort</span>
                                    <span><img className="sort-icon" src={require("../assets/images/sort.svg")} alt="" /></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="best-product">
                        <div className="products-title">Best Match</div>
                        <div className="flex-card-most">
                            {
                                scrapingSortList && scrapingSortList.map((item, key) => {
                                    // if (item.scraping_category.toLowerCase() === category.toLowerCase()) {
                                        return (
                                            <div>
                                                <div className="w3-card best-match" key={key}>
                                                    <div className="w3-row justify-filter-content">
                                                        <div className="w3-col img-width">
                                                            <a href={item.scraping_store_address}><img className="products-image" src={item.scraping_photo_link}/></a>
                                                        </div>

                                                        <div className="w3-col name-width">
                                                            <div className="product-name">{item.scraping_name}</div>
                                                            <div className="w3-row justify-filter-content">
                                                                <div className="w3-col l3 m2 s2">
                                                                    <img className="store-logo-icon" src={logoArray[item.scraping_store_address.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0]]} alt="" />
                                                                </div>
                                                                <div className="w3-col l9 m10 s10 description-product">{item.scraping_description}</div>
                                                            </div>
                                                        </div>

                                                        <div className="w3-col price-width">
                                                            <div className="product-price">SAR {item.scraping_price}</div>
                                                        </div>

                                                        <div className="w3-col shop-width">
                                                            <div onClick={this.gotoShop}><span className="link-shop">Go to Shop</span><img className="goToShop" src={require("../assets/images/next.png")} alt="" /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    // }
                                })
                            }

                        </div>

                        <div className="next-prev-btn">
                            <div className="np-width">
                                <img className="btn-np" src={require("../assets/images/back.png")} alt="" />
                                <div className="btn-np">1</div>
                                <div className="btn-np">2</div>
                                <div className="btn-np">3</div>

                                <div className="btn-NL">Next</div>
                                <div className="btn-NL">Last</div>
                                <img className="btn-np"  src={require("../assets/images/next.png")} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productSortList: state.filter.productSortList,
        scrapingSortList: state.scrapingProduct.scrapingSortList,
    }
};

export default connect(
    mapStateToProps,
    {
        fetchAllProducts,
        SortProduct,
        scrapingAllProducts,
        ScrapingSort,
    }
)(SearchFilter);
