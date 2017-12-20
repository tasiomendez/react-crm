import React from 'react';
import './../assets/scss/main.scss';
// import { visits } from './../assets/mock.data.js';

import VisitList from './VisitList';
import Detail from './Detail';
import Search from './Search';
import Settings from './Settings';

import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Grid} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

import { connect } from 'react-redux';
import { download, updateVisible, error, favourites, customers, salesmen } from './../reducers/actions';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.downloadFrom 	= this.downloadFrom.bind(this);

		// Descargar las visitas favoritas para almacenarlas al inicial la app
        fetch('https://dcrmt.herokuapp.com/api/visits?token=ca092035a9fe8bd421f8&favourites=1')
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(favourites(result));		},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);

		// Descargar todos los vendedores
        fetch('https://dcrmt.herokuapp.com/api/salesmen?token=ca092035a9fe8bd421f8')
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(salesmen(result));		},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);

		// Descargar todos los clientes
        fetch('https://dcrmt.herokuapp.com/api/customers?token=ca092035a9fe8bd421f8')
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(customers(result));		},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);
    }

    downloadFrom(url) {
        fetch(url)
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(download(result, true));	},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);
    }

    componentDidMount() {
        console.log('Downloading...');
        let url = 'https://dcrmt.herokuapp.com/api/visits/flattened?token=ca092035a9fe8bd421f8';
        url += location.search.replace('?', '&');

	    this.downloadFrom(url);
    }

  	render() {

  		let main;
  		if (this.props.error) {
	      	main = <Col lg={12} md={12} xs={12} className='centering'>
	      				<div className='error'>Error: {this.props.error.message}</div>
	      			</Col>;

	    } else if (!this.props.isLoaded) {
	      	main = 	<Col lg={12} md={12} xs={12} className='centering'>
	      				<div className='loader'/>
	      			</Col>;

	    } else {
	    	main = 	<Grid fluid className='col-lg-10 col-lg-offset-1'>
			      		<Row>
			      			<VisitList visits={this.props.visible} />
			      			<Detail visit={this.props.selected} />
			      		</Row>
			      	</Grid>;
    	}

    	return (
    		<div className='root'>
		      	<Navbar fluid>
		      		<div className='col-lg-10 col-lg-offset-1'>
			      		<Navbar.Header>
			      			<Navbar.Brand>CRM - IWEB</Navbar.Brand>
							<Navbar.Form pullRight className='settings'>
								<Search />
			      				<Button id='open_modal' className='pull-right'><Glyphicon glyph='filter' /></Button>
							</Navbar.Form>
			      		</Navbar.Header>
			      	</div>
		      	</Navbar>
		      	{main}
		      	<Settings button='open_modal' title='Filters' glyph='filter'/>
		    </div>
      	);

  	}

}

function mapStateToProps(state) {
    return {
        selected: state.selected,
        visible: state.visible,
        isLoaded: state.isLoaded,
        error: state.error,
    };
}

export default connect(mapStateToProps)(App);
