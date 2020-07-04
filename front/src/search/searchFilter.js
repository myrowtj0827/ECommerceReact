import React from 'react';
import {connect} from "react-redux";
import { fetchAllProducts, SortProduct } from "../redux/actions/filter/filter";

import storeLogo1 from "../assets/images/logo-icon1.png";
import storeLogo2 from "../assets/images/logo-icon2.svg";
import storeLogo3 from "../assets/images/logo-icon3.svg";

class SearchFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            SortProduct,
            productSorList
        } = this.props;

        if (SortProduct) {
            SortProduct( localStorage.getItem('category'));
        }
    }

    gotoShop = (code) => {
        this.props.history.push(`/`);
    };

    render() {

        const {
            productSortList,
        } = this.props;

        const category = localStorage.getItem('category');

        const logoArray = {
            'https://www.noon.com/saudi-en/': storeLogo3,
            'https://blackbox.com.sa': storeLogo2,
            'https://www.amazon.sa': storeLogo1,
            'https://www.extra.com/ar-sa': storeLogo3,
            'https://www.samma3a.com/saudi-en/': storeLogo1,
            'https://www.bukhamsen.com': storeLogo2,
            'https://www.alsomah.com.sa': storeLogo3,
            'https://redsea.com/en/': storeLogo3,
            'https://www.mystore.com.sa/ar': storeLogo1,
            'https://www.virginmegastore.sa/en/': storeLogo2,
            'https://www.jarir.com/sa-en/': storeLogo3,
            'https://www.electrostores.com/site/': storeLogo1,
            'https://swsg.co/ar/': storeLogo2,
            'https://www.xcite.com.sa/ar/': storeLogo3,
            'https://www.ubuy.com.sa/ar/': storeLogo1,
            'https://www.lowimart.com': storeLogo2
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
                                productSortList && productSortList.map((item, key) => {
                                    if (item.product_category.toLowerCase() === category.toLowerCase()) {
                                        return (
                                            <div>
                                                <div className="w3-card best-match" key={key}>
                                                    <div className="w3-row justify-filter-content">
                                                        <div className="w3-col img-width">
                                                            <a href={item.product_store_address}><img className="products-image" src={item.product_photo}/></a>
                                                        </div>

                                                        <div className="w3-col name-width">
                                                            <div className="product-name">{item.product_name}</div>
                                                            <div className="w3-row justify-filter-content">
                                                                <div className="w3-col l3 m2 s2">
                                                                    <img className="store-logo-icon" src={logoArray[item.product_store_address]} alt="" />
                                                                </div>
                                                                <div className="w3-col l9 m10 s10 description-product">{item.product_description}</div>
                                                            </div>
                                                        </div>

                                                        <div className="w3-col price-width">
                                                            <div className="product-price">${item.product_price}</div>
                                                        </div>

                                                        <div className="w3-col shop-width">
                                                            <div onClick={this.gotoShop}><span className="link-shop">Go to Shop</span><img className="goToShop" src={require("../assets/images/next.png")} alt="" /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
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
    }
};

export default connect(
    mapStateToProps,
    {
        fetchAllProducts,
        SortProduct
    }
)(SearchFilter);

// export default SearchFilter;
