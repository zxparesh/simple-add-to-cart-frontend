import React, {Component} from "react";
import "./index.css";

export default class ProductList extends Component {
    constructor() {
        super();
    }

    render() {
        const { cart, addToCart, increaseQty, decreaseQty } = this.props;
        const cartMap = cart.items.reduce((obj, item) => ({...obj, [item.id]: item}), {});
        console.log("render cartMap", cartMap);
        return (
            <div className="layout-row wrap justify-content-center flex-70 app-product-list">
                {this.props.products.map((product, i) => {
                    return (
                        <section className="w-30"
                                 data-testid={'product-item-' + i}
                                 key={product.id}>
                            <div className="card ma-16">
                                <img alt="Your Cart" src={product.image}
                                     className="d-inline-block align-top product-image"/>
                                <div className="card-text pa-4">
                                    <h5 className="ma-0 text-center">{product.name}</h5>
                                    <p className="ma-0 mt-8 text-center">${product.price}</p>
                                </div>
                                <div className="card-actions justify-content-center pa-4">

                                    {!cartMap[product.id] &&
                                        <button className="x-small outlined" data-testid="btn-item-add" onClick={addToCart(product.id)}>
                                            Add To Cart
                                        </button>}

                                    {cartMap[product.id] &&
                                        <div className="layout-row justify-content-between align-items-center">
                                            <button className="x-small icon-only outlined"
                                                    data-testid="btn-quantity-subtract"
                                                    onClick={decreaseQty(product.id)}>
                                                <i className="material-icons">remove</i>
                                            </button>

                                            <input type="number"
                                                disabled
                                                value={cartMap[product.id].quantity}
                                                className="cart-quantity"
                                                data-testid="cart-quantity"/>

                                            <button className="x-small icon-only outlined"
                                                    data-testid="btn-quantity-add"
                                                    onClick={increaseQty(product.id)}>
                                                <i className="material-icons">add</i>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </section>
                    )
                })}

            </div>

        );
    }
}

export const UpdateMode = {
    ADD: 1,
    SUBTRACT: 0
}
