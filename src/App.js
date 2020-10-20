import React from 'react';
import {Provider} from 'react-redux'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store'

class App extends React.Component {
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
            <Filter></Filter>
            <Products></Products>
          </div>
          <div className="sidebar">
            <Cart />
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
