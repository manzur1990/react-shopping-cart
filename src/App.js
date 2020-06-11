import React, { useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import data from './data';
 


// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

//Context
import ProductContext from './context/ProductContext'
import CartContext from './context/CartContext'

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);
	const [empty] = useState([])


	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	const addItem = item => {
		setCart([...cart, item]);
	};

	const removeItem = itemId => {
		setCart(cart.filter(item => item.id !== itemId));
	  };
	
	  function clearCart() {
		setCart(empty);
	  }

	return (
		<div className="App">
			<CartContext.Provider value={{cart, setCart}}>
			<Navigation />
			</CartContext.Provider>

			{/* Routes */}
			<ProductContext.Provider
			value={{products, addItem}}> 
			<Route exact path="/">
				<Products/>
			</Route>
			</ProductContext.Provider>

			<CartContext.Provider value={{cart, clearCart, setCart, removeItem}}>
			<Route path="/cart">
				<ShoppingCart/>
			</Route>
			</CartContext.Provider>
		</div>
	);
}

export default App;
