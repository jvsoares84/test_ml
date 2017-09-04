import React from 'react';
import Header from './Header';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

function Item (props) {
	const shipping = props.data.free_shipping ? (<span className="item-shipping"></span>) : "";
	return (
		<li>
			<div className="item-thumbnail">
				<img src={props.data.picture} alt="" />
			</div>
			<div className="item-info">
				<div className="item-detail">
					<span className="item-price">$ {props.data.price.amount}</span>
					{shipping}
				</div>
				<h2 className="item-title"><Link to={'/items/'+props.data.id}>{props.data.title}</Link></h2>
				<span className="item-condition">{props.data.condition=="new" ? "Completo único" : "Usado"}</span>
			</div>
			<div className="item-category">
				{props.category}
			</div>
		</li>
	);
}

class Items extends React.Component {
	constructor() {
		super();
		this.state = {
			data: null
		}
	}

	componentDidMount() {
		const _this = this;
		const search = /search\=(\w+)/.test(location.search) ? RegExp.$1 : "";
		axios.get("http://localhost/api/Items?q="+search)
        .then(function(response) {
            _this.setState({
            	data: response.data
            });
        }).catch(function (error) {
            console.log(error);
        });
	}

	renderItem() {
		const data = this.state.data;
		if (this.state.data) {
			return (
					<main>
					<div className="content">
						<div className="categories">
							{data.categories.join(" | ")}
						</div>
						<ul className="results">
							{data.items.map(function(item) {
							    return <Item key={item.id} data={item} category={data.categories[data.categories.length-1]} />;
							})}
						</ul>
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

withRouter(Items);

export default Items
