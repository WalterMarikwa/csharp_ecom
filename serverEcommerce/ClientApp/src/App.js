import * as React from 'react';  
import { Route } from 'react-router-dom';  
import { Layout } from './components/Layout';  
import { Home } from './components/Home';  
import { FetchProduct } from './components/FetchProducts';  
import { AddProduct } from './components/AddProduct';  
import { NavMenu } from './components/NavMenu';
import './custom.css'


 class App extends React.Component {
  static displayName = App.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetchproducts' component={FetchProduct} />
        <Route path='/addproducts' component={AddProduct} />
        <Route path='/products/edit/id' component={AddProduct} />
      </Layout>
      </div>
      
    );
  }
}

export default App;