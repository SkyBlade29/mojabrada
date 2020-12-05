import React, {Component} from "react";
import { Link } from "react-router-dom"
import axios from "axios"

const Product = props => (
    <tr>
        <td>{props.product.prod_name}</td>
        <td>{props.product.prod_desc}</td>
        <td>{props.product.prod_price}</td>
        <td>{props.product.prod_disc}</td>
        <td>
            <Link to={"/edit/"+props.product._id}>Edit</Link>
        </td>
    </tr>
);

const Category = props => (
    <Link to="/products/:cat_name" className="nav-item d-flex">
        {props.category.cat_name}
    </Link>
);

export default class ProdList extends Component {

    constructor(props){
        super(props);
        this.state = {products: [], categories: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products')
            .then(response => {
                this.setState({products: response.data})
            }).catch(function(error){
            console.log(error)
        });
        axios.get('http://localhost:4000/categories')
            .then(response => {
                this.setState({categories: response.data})
            }).catch(function(error){
                console.log(error)
        });
    }

    render() {
        return(
            <div className="container d-flex flex-row">
                <div className="nav d-flex flex-column">
                    {this.catList()}
                </div>
                <div className="container d-flex">
                    <h3>Products List</h3>
                    <table className="table table-striped" style={{ marginTop: 20 }} >
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Discount</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.prodList() }
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }

    catList() {
        return this.state.categories.map(function(currentCat, i){
            return <Category category={currentCat} key={i} />
        })
    }

    prodList() {
        return this.state.products.map(function(currentProd, i){
            return <Product product={currentProd} key={i} />;
        })
    }
}