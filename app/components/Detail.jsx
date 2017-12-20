import React from 'react';

import VisitDetail from './VisitDetail';
import TargetDetail from './TargetDetail';
import CustomerDetail from './CustomerDetail';
import SalesmanDetail from './SalesmanDetail';

import {Col} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

import { connect } from 'react-redux';
import { error, favourites } from './../reducers/actions';

class Detail extends React.Component {
    constructor(props) {
        super(props);
    	this.favourite 			= this.favourite.bind(this);
    	this.updateFavourites 	= this.updateFavourites.bind(this);
    	this.isFavourite 		= this.isFavourite.bind(this);
    }

    favourite() {
        let url = 'https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/' + this.props.visit.id + '?token=ca092035a9fe8bd421f8';
        if(this.isFavourite(this.props.visit)) {
            url += '&_method=DELETE';
        } else {
            url += '&_method=PUT';
        }
        fetch(url)
		.then((result) 		=> 	{ this.updateFavourites();						},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);
    }

    updateFavourites() {
        fetch('https://dcrmt.herokuapp.com/api/visits?token=ca092035a9fe8bd421f8&favourites=1')
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(favourites(result));		},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);
    }

    isFavourite(visit) {
        let result = false;
        this.props.favourites.map((n_visit, index) => {
            if (n_visit.id === visit.id) {result = true;}
        });
        return result;
    }

    render() {

        if (!this.props.visit) {
            return (
				<Col lg={8} md={8} xs={12} style={{ height: '100%' }}>
		      		<h2 className='col-sm-12'><Glyphicon glyph='info-sign' /> Info</h2>
		      		<Col lg={12} md={12} xs={12} className='centering'>
						<div style={{ fontStyle: 'italic' }}>Select a visit to see its details</div>
					</Col>
				</Col>
            );
        }

        let star = (this.isFavourite(this.props.visit)) ? 'star' : 'star-empty';

        return (
				<Col lg={8} md={8} xs={12} className='info' id='detailList'>
		      		<h2 className='col-sm-12'>
		      			<Glyphicon glyph='info-sign' /> Info
		      			<div id='favourite' className='pull-right'>
			      			<Glyphicon glyph={star} onClick={this.favourite}/>
			      		</div>
		      		</h2>
		      		<div id='details'>
			      		<Col lg={12} md={12} xs={12}>
							<VisitDetail visit={this.props.visit}/>
							<hr />
							<TargetDetail targets={this.props.visit.Targets}/>
							<Row>
								<Col lg={12} md={12} xs={12}>
									<hr />
									<CustomerDetail customer={this.props.visit.Customer}/>
									<SalesmanDetail salesman={this.props.visit.Salesman}/>
								</Col>
							</Row>
						</Col>
					</div>
				</Col>
        );

    }
}

function mapStateToProps(state) {
    return {
        favourites: state.favourites,
    };
}

export default connect(mapStateToProps)(Detail);
