import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Checkbox} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {DayPickerRangeController} from 'react-dates';

import { connect } from 'react-redux';
import { download, error, reset } from './../reducers/actions';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
            focusedInput: props.autoFocusEndDate ? 'endDate' : 'startDate',

            favourites: false,
            customer: null,
            salesman: null,
        };

        this.close 			= this.close.bind(this);
        this.open 			= this.open.bind(this);
        this.reload 		= this.reload.bind(this);
        this.downloadFrom 	= this.downloadFrom.bind(this);

        this.onDatesChange 	= this.onDatesChange.bind(this);
    	this.onFocusChange 	= this.onFocusChange.bind(this);
    	this.reset 	        = this.reset.bind(this);

    	this.handleChangeFavourites	= this.handleChangeFavourites.bind(this);
    	this.handleChangeCustomers	= this.handleChangeCustomers.bind(this);
    	this.handleChangeSalesmen	= this.handleChangeSalesmen.bind(this);
    }

    componentDidMount() {
        document.getElementById(this.props.button).addEventListener('click', this.open);
    }

    downloadFrom(url) {
        fetch(url)
		.then((res) 			=> 	res.json())
		.then((result) 		    => 	{ this.props.dispatch(download(result, true));	},
				(error_message) =>  { this.props.dispatch(error(error_message)); 	}
		);
    }

    close() {
    	this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    reload() {
        this.close();
        this.props.dispatch(reset());

        let url = 'https://dcrmt.herokuapp.com/api/visits/flattened?token=ca092035a9fe8bd421f8';
        if (this.state.startDate)
            {url += '&dateafter=' + this.state.startDate.format('YYYY-MM-DD');}

        if (this.state.endDate)
            {url += '&datebefore=' + this.state.endDate.format('YYYY-MM-DD');}

        if (this.state.favourites)
            {url += '&favourites=1';}

        if (this.state.customer && this.state.customer !== 'default')
            {url += '&customer=' + this.state.customer;}

        if (this.state.salesman && this.state.salesman !== 'default')
            {url += '&salesman=' + this.state.salesman;}

	    this.downloadFrom(url);
    }

    onDatesChange({ startDate, endDate }) {
    	this.setState({
    		startDate: startDate,
    		endDate: endDate,
    	});
  	}

    onFocusChange(focusedInput) {
	    this.setState({
	      	// Force the focusedInput to always be truthy so that dates are always selectable
	      	focusedInput: !focusedInput ? 'startDate' : focusedInput,
	    });
    }

    reset() {
        this.setState({
            startDate: null,
            endDate:   null,
            customer:  null,
            salesman:  null,
        });
        setTimeout(() => {
            this.reload();
        }, 10);
    }

    handleChangeFavourites() {
        this.setState({ favourites: !this.state.favourites });
    }

    handleChangeCustomers(event) {
        this.setState({ customer: event.target.value });
    }

    handleChangeSalesmen(event) {
        this.setState({ salesman: event.target.value });
    }

    render() {
        const props = {
  			// calendar presentation and interaction related props
            orientation: 'horizontal',
            numberOfMonths: 2,
  		};

  		let salesmen = this.props.salesmen.map((salesman, index) => {
  			return(<option value={salesman.fullname} key={index}>{salesman.fullname}</option>);
  		});

  		let customers = this.props.customers.map((customer, index) => {
  			return(<option value={customer.name} key={index}>{customer.name}</option>);
  		});

  		return (
			<Modal show={this.state.showModal} onHide={this.close} dialogClassName="custom-modal">
	        	<Modal.Header closeButton>
	            	<Modal.Title><Glyphicon glyph={this.props.glyph || 'cog'} /> {this.props.title || 'Settings'}</Modal.Title>
	        	</Modal.Header>
	    		<Modal.Body>
	        		<h5>Show visits between selected dates.</h5>
	        		<DayPickerRangeController
	        			{...props}
						onDatesChange={this.onDatesChange}
						onFocusChange={this.onFocusChange}
						focusedInput={this.state.focusedInput}
						startDate={this.state.startDate}
						endDate={this.state.endDate}
					/>
					<hr />
					<Row>
						<Col lg={4} md={4} xs={4}>
							<FormControl componentClass="select" placeholder="Customers" onChange={this.handleChangeCustomers} value={(this.state.customer) ? this.state.customer : ''}>
								<option value="default">Customers</option>
								{customers}
							</FormControl>
						</Col>
						<Col lg={4} md={4} xs={4}>
							<FormControl componentClass="select" placeholder="Salesmen" onChange={this.handleChangeSalesmen} value={(this.state.salesman) ? this.state.salesman : ''}>
								<option value="default">Salesmen</option>
								{salesmen}
							</FormControl>
						</Col>
						<Col lg={4} md={4} xs={4}>
							<Checkbox inline onChange={this.handleChangeFavourites} checked={this.state.favourites}> Favourites</Checkbox>
						</Col>
					</Row>
	        	</Modal.Body>
	      		<Modal.Footer>
	        		<Button bsStyle='danger' onClick={this.reset}>Reset</Button>
	        		<Button bsStyle='success' onClick={this.reload}>Apply</Button>
	      		</Modal.Footer>
	        </Modal>
	    );
    }
}

function mapStateToProps(state) {
    return {
        customers: state.customers,
        salesmen: state.salesmen,
    };
}

export default connect(mapStateToProps)(Settings);
