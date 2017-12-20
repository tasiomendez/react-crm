import React from 'react';

import {Col} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

export default class CustomerDetail extends React.Component {
    constructor(props) {
        super(props);

        this.empty = this.empty.bind(this);
    }

    empty(str) {
        if (str === null || str === '')
            {return true;}
        return false;
    }

    render() {
        return (
			<Col lg={6} md={6} xs={6} className='customer-info'>
				<Col lg={12} md={12} xs={12}>
					<h3><Glyphicon glyph='shopping-cart' /> <b>Customer</b></h3>
				</Col>
				<Row>
					<Col lg={12} md={12} xs={12}>
						<Glyphicon glyph='user' /> {(!this.empty(this.props.customer.name)) ? this.props.customer.name : <span className='empty' />}
					</Col>
					<Col lg={12} md={12} xs={12}>
						<Glyphicon glyph='barcode' /> {(!this.empty(this.props.customer.code)) ? this.props.customer.code : <span className='empty' />}
					</Col>
					<Col lg={12} md={12} xs={12}>
						<Glyphicon glyph='tags' /> {(!this.empty(this.props.customer.cif)) ? this.props.customer.cif : <span className='empty' />}
					</Col>
					<Col lg={12} md={12} xs={12}>
						<Glyphicon glyph='envelope' /> {(!this.empty(this.props.customer.email1)) ? this.props.customer.email1 : <span className='empty' />}
					</Col>
					<Col lg={12} md={12} xs={12}>
						<Glyphicon glyph='home' /> {(!this.empty(this.props.customer.address1)) ? this.props.customer.address1 : <span className='empty' />}
					</Col>
					<Col lg={12} md={12} xs={12}>
						<Glyphicon glyph='globe' /> {(!this.empty(this.props.customer.web)) ? this.props.customer.web : <span className='empty' />}
					</Col>
					<Col lg={12} md={12} xs={12}>
						<Glyphicon glyph='earphone' /> {(!this.empty(this.props.customer.phone1)) ? this.props.customer.phone1 : <span className='empty' />}
					</Col>
				</Row>
			</Col>
        );
    }
}
