import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import data from "./data.json"
import Cart from './components/Cart';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      products:data.products,
      cartItems:[],
      size:"",
      sort:""
    }
  }
  filterProducts =(event)=>{
    if(event.target.value ===""){
      this.setState({
        size:event.target.value,
        products:data.products
      })
    }else{
      this.setState({
        size:event.target.value,
        products:data.products.filter(product =>product.availableSizes.indexOf(event.target.value)>=0)
      })
    }
  }
  sortProducts=(event)=>{
    console.log(event.target.value)
    const sort = event.target.value
    this.setState((state)=>({
      sort:sort,
      products:this.state.products
        .slice()
        .sort((a,b)=>
            sort === 'lowest'
              ?a.price > b.price
                ? 1
                :-1
            :sort ==='highest'
            ?a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
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
  };
  removeFromCart =(product)=>{
    const cartItems =this.state.cartItems.slice();
    this.setState({
      cartItems:cartItems.filter((x)=>x._id!== product._id)
    })
  }
  render(){
    return (
    <div className="grid-container">
      <header>
        <a href="/">React shopping Cart</a>
      </header>
      <main>
       <div className="content">
         <div className="main">
           <Filter count={this.state.products.length}
             size={this.state.size}
             sort={this.state.sort}
             filterProducts ={this.filterProducts}
             sortProducts ={this.sortProducts}>
           </Filter>
          <Products products={this.state.products} addtoCart={this.addtoCart}></Products>
         </div>
         <div className="sidebar">
           <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}/>
         </div>
       </div>
      </main>
      <footer>
        All rights is reserved
      </footer>
    </div>
    );
  }
}

export default App;
