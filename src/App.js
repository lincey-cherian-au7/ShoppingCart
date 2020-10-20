import React from 'react';
import {Provider} from 'react-redux'
import Products from './components/Products';
import Filter from './components/Filter';

import Cart from './components/Cart';
import store from './store'

class App extends React.Component {
  constructor(){
    super();
    this.state={
      cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
      
    }
  }
  

  addtoCart =(product)=>{
    let alreadyIncart= false
    const cartItems = this.state.cartItems.slice();
    cartItems.forEach((item)=>{
      if(item._id === product._id){
        item.count++;
        alreadyIncart= true
      }
    });
    if(!alreadyIncart){
      cartItems.push({...product,count:1});
    }
    this.setState({cartItems})
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
  };
  removeFromCart =(product)=>{
    const cartItems =this.state.cartItems.slice();
    this.setState({
      cartItems:cartItems.filter((x)=>x._id!== product._id)
    })
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter((x)=>x._id!== product._id)))
  }
  createOrder =(order)=>{
    alert("Need to save order"+order.name)
  }
  render(){
    return (
      <Provider store={store}>
        <div className="grid-container">
        <header>
          <a href="/">React shopping Cart</a>
        </header>
        <main>
        <div className="content">
          <div className="main">
            <Filter ></Filter>
            <Products  addtoCart={this.addtoCart}></Products>
          </div>
          <div className="sidebar">
            <Cart cartItems={this.state.cartItems} 
            removeFromCart={this.removeFromCart}
            createOrder={this.createOrder}/>
          </div>
        </div>
        </main>
        <footer>
          All rights is reserved
        </footer>
      </div>
    </Provider>
    );
  }
}

export default App;
