import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {

	constructor() {
		super();
		this.state = {
			search: "",
			redirect: false
		}
	}

	handleChange(value) {
		this.setState({
			search: value
		});
	}

	render() {
		return (
			<header>
				<div className="navbar-wrapper">
					<a className="logo" href="index.html"></a>
					<div className="search-wrapper">
						<input type="text" placeholder="Nunca dejes de buscar" onChange={e => this.handleChange(e.target.value)} />
						<button onClick={() => {this.props.history.push('/items?search='+this.state.search)}}></button>
					</div>
				</div>
			</header>
		);
	}
}

withRouter(Header);

export default Header
