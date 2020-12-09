import React, {Component} from "react";
import "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
import {CardDeck, Card, CardImg, Button, NavLink, Row, Col} from "react-bootstrap";

const Product = props => (
    <Col className={'mb-4'}><Card className={'h-100'}>
        <CardImg variant={"top"} className={'h-30'} src={props.product.prod_img_path} alt={''} />
        <div className={'card-body d-flex flex-column pb-1'}>
            <Link to={''}><h6 className={'card-title'}>{props.product.prod_name}</h6></Link>
            {
                props.product.prod_disc !== 0 ?
                    <p className={'mt-auto'}><s>{props.product.prod_price}</s></p> :
                    <p className={'mt-auto'}>{}</p>
            }
            {
                props.product.prod_disc !== 0 ?
                    <h6>{props.product.prod_price*props.product.prod_disc}</h6> :
                    <h6>{props.product.prod_price}</h6>
            }
            <Button variant={'danger'} className={'btn-block btn-lg'}>
                <Link to={"/edit/"+props.product._id}>Add to Cart</Link>
            </Button></div>
    </Card></Col>
);

const Category = props => (
    <Link className={'btn btn-light btn-lg'} to={'/products/'+props.category.cat_name}>
        {props.category.cat_name}
    </Link>
);

export default class ProdList extends Component {

    constructor(props){
        super(props);
        this.state =
            {
                products: [],
                categories: [],
                filter: ''
            }
    }
    fetchData(products, categories){
        console.log(this.props.match.params.filter);
        if(this.props.match.params.filter === undefined){
            try {
                console.log('filter is undefined');
                axios.get('http://localhost:4000/products')
                    .then(response => {
                        this.setState({products : response.data})
                    })
                    .catch(function(error){
                        console.log(error)
                    })
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                console.log('filter is not null: '+this.props.match.params.filter);
                axios.get('http://localhost:4000/categories/'+this.props.match.params.filter)
                    .then(response => {
                        this.setState({products: response.data})
                    })
                    .catch(function(error){
                        console.log(error)
                    })
            } catch (e) {
                console.log(e)
            }
        }
        axios.get('http://localhost:4000/categories')
            .then(response => {
                this.setState({categories: response.data})
            }).catch(function(error){
            console.log(error)
        });
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.filter !== this.props.match.params.filter){
            this.fetchData()
        }
    }

    render() {
        return(
            <div className="container d-flex flex-row">
                <div className="btn-group-vertical col-3 align-self-start">
                    {this.catList()}
                </div>
                <div className="container d-flex flex-column">
                    <Row className={'row-cols-4'}>
                        { this.prodList() }
                    </Row>
                </div>
            </div>

        )
    }

    catList() {
        return this.state.categories.map((currentCat, i) => {
            return <Category category={currentCat} key={i} />
        })
    }

    rowWrap(prodList){
        return <CardDeck>prodList</CardDeck>;
    }

    prodList() {
        return this.state.products.map((currentProd, i) => {
                return <Product product={currentProd} key={i} />;
        })
    }
}