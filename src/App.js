import React, {Component} from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products,
        }
    }

    addToCart = (id) => () => {
        console.log("addToCart id", id)
        const { cart, products } = this.state;
        const prod = products.find(p => p.id === id);
        cart.items.push({ id: prod.id, item: prod.name, quantity: 1 });
        console.log("addToCart cart", cart)
        this.setState({ cart });
    }

    increaseQty = (id) => () => {
        console.log("increaseQty", id)
        const { cart } = this.state;
        const prodIndex = cart.items.findIndex(p => p.id === id);
        console.log("increaseQty prodIndex", prodIndex)
        if(prodIndex !== -1) {
            const prodQty = cart.items[prodIndex].quantity;
            console.log("increaseQty prodQty", prodQty)
            cart.items[prodIndex].quantity = prodQty + 1;
            console.log("increaseQty cart", cart)
            this.setState({ cart });
        }
    }

    decreaseQty = (id) => () => {
        console.log("decreaseQty", id)
        const { cart } = this.state;
        const prodIndex = cart.items.findIndex(p => p.id === id);
        console.log("decreaseQty prodIndex", prodIndex)
        if(prodIndex !== -1) {
            const prodQty = cart.items[prodIndex].quantity;
            console.log("decreaseQty prodQty", prodQty)
            if(prodQty > 1) {
                cart.items[prodIndex].quantity = prodQty - 1;
            } else {
                cart.items.splice(prodIndex, 1);
            }
            console.log("decreaseQty cart", cart)
            this.setState({ cart });
        }
    }

    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList
                        products={this.state.products}
                        cart={this.state.cart}
                        addToCart={this.addToCart}
                        increaseQty={this.increaseQty}
                        decreaseQty={this.decreaseQty}
                    />
                    <Cart cart={this.state.cart}/>
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
