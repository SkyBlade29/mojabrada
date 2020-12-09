import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React from "react";
import logo from './logo.svg'
import ProdList from "./components/prodlist.component";
import NewProd from "./components/newprod.component";
import EditProd from "./components/editprod.component";
import {Container} from "react-bootstrap";

function App() {
  return (
    <Router>
      <div className="container-fluid m-0 mt-3 p-0 ">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                <Link to="/admin/products/create" className="nav-link">Create Product</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>


      </div>
      <Container>
        <Route path="/products/:filter?" exact component={ProdList} />
        <Route path="/admin/products/create" exact component={NewProd} />
        <Route path="/admin/products/edit/:id" exact component={EditProd} />
      </Container>
    </Router>
  );
}

export default App;
