import React from 'react';
import Header from './Header';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function Item(props) {
	const condition = (props.data.item.condition=="new" ? "Nuevo" : "Usado") + " - " + props.data.sold_quantity + " vendidos";
	return (
		<div className="product-info">
			<div className="product-image">
				<img src={props.data.item.picture} />
				<div className="product-description">
					<h3>Descriptión del producto</h3>
					{props.data.description}
				</div>
			</div>
			<div className="product-detail">
				<span className="product-sales">{condition}</span>
				<h2 className="product-title">{props.data.item.title}</h2>
				<div className="product-price">$ {props.data.item.price.amount}<span>{("0"+props.data.item.price.decimals).replace(/(.{2})$/,"$1")}</span></div>
				<button className="button-buy">Comprar</button>
			</div>
		</div>
	);
}

class ItemsId extends React.Component {
	constructor() {
		super();
		this.state = {
			data: null
		}
	}

	componentDidMount() {
		const _this = this;
		console.log(location.href.replace(/.*items\/(.*)/,"$1"))
		axios.get("http://localhost/api/items/"+location.href.replace(/.*items\/(.*)/,"$1"))
        .then(function(response) {
            _this.setState({
            	data: response.data
            });
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
	}

	renderItem() {
		if (this.state.data) {
			return (
				<main>
					<div className="content">
						<div className="product">
							<Item data={this.state.data} />
						</div>
					</div>
				</main>
			);
		} else {
			return "";
		}
	}
	render() {
		return (
			<div>
				<Header {...this.props} />
				{this.renderItem()}
			</div>
		);
	}
}

withRouter(ItemsId);

export default ItemsId
