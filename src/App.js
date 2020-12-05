import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import logo from './logo.svg'
import ProdList from "./components/prodlist.component";
import NewProd from "./components/newprod.component";
import EditProd from "./components/editprod.component";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
            <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com"/>
          </a>
          <Link to="/" className="navbar-brand">Lion Beard</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/products" className="nav-link">All Products</Link>
              </li>
              <li className="navbar-item">
                <Link to="/products/create" className="nav-link">Create Product</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>

        <Route path="/products" exact component={ProdList} />
        <Route path="/products/create" exact component={NewProd} />
        <Route path="/products/edit/:id" exact component={EditProd} />

      </div>

    </Router>
  );
}

export default App;
