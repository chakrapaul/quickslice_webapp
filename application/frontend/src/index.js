import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Homes from './components/Homes';
import OrderPizza from './components/OrderPizza'
import BuildUrPizza from './components/BuildUrPizza'
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Cartt from './components/Cartt';
import CheckLogin from './components/CheckLogin';
import payment from './components/payment';


ReactDOM.render(
  <BrowserRouter>
    <App />
    <Switch>
      <Route exact path="/" render={() => {
        return (<Redirect to='/Homes' />)
      }
      } />
    </Switch>
    <Route path="/Homes" component={Homes} />
    <Route path="/OrderPizza" component={OrderPizza} />
    <Route path="/BuildUrPizza" component={BuildUrPizza} />
    <Route path="/Login" component={Login} />
    <Route path="/Register" component={Register} />
    <Route path="/Cart" component={Cart} />
    <Route path="/Cartt" component={Cartt} />
    <Route path="/CheckLogin" component={CheckLogin} />
    <Route path="/payment" component={payment} />

  </BrowserRouter>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();