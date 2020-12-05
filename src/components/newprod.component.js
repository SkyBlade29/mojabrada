import React, {Component} from "react";
import axios from "axios"

export default class NewProd extends Component {

    constructor(props){
        super(props);

        this.state = {
            prod_name: '',
            prod_desc: '',
            prod_price: 0,
            prod_disc: 0,
        };

        this.onChangeProdName = this.onChangeProdName.bind(this);
        this.onChangeProdDesc = this.onChangeProdDesc.bind(this);
        this.onChangeProdPrice = this.onChangeProdPrice.bind(this);
        this.onChangeProdDisc = this.onChangeProdDisc.bind(this);
        this.onSubmit =this.onSubmit.bind(this);
    }

    onChangeProdName(e){
        this.setState({
            prod_name: e.target.value
        });
    }
    onChangeProdDesc(e){
        this.setState({
            prod_desc: e.target.value
        });
    }
    onChangeProdPrice(e){
        this.setState({
            prod_price: e.target.value
        });
    }
    onChangeProdDisc(e){
        this.setState({
            prod_disc: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        console.log('Form submitted');
        console.log(`Product Name: ${this.state.prod_name}`);
        console.log(`Product Description: ${this.state.prod_desc}`);
        console.log(`Product Price: ${this.state.prod_price}`);
        console.log(`Product Discount: ${this.state.prod_disc}`);

        const newProd = {
            prod_name: this.state.prod_name,
            prod_desc: this.state.prod_desc,
            prod_price: this.state.prod_price,
            prod_disc: this.state.prod_disc
        };

        axios.post('http://localhost:4000/products/add', newProd)
            .then(res => console.log(res.data));

        this.setState({
            prod_name: '',
            prod_desc: '',
            prod_price: 0,
            prod_disc: 0,
        })
    }

    render() {
        return(
            <div style={{marginTop: 10}}>
                <h3>Create New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.prod_name}
                                onChange={this.onChangeProdName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.prod_desc}
                            onChange={this.onChangeProdDesc}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.prod_price}
                            onChange={this.onChangeProdPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Discount: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.prod_disc}
                            onChange={this.onChangeProdDisc}
                        />
                    </div>0

                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}