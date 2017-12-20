import React from 'react';

import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

export default class SalesmanDetail extends React.Component {
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
			<Col lg={6} md={6} xs={6} className='salesman-info'>
				<Col lg={12} md={12} xs={12}>
					<h3><Glyphicon glyph='briefcase' /> <b>Salesman</b></h3>
				</Col>
				<Row>
					<Col lg={12} md={12} xs={12}>
						<Glyphicon glyph='user' /> {(!this.empty(this.props.salesman.fullname)) ? this.props.salesman.fullname : <span className='empty' />}
					</Col>
					<Col lg={12} md={12} xs={12}>
						<div className='img-frame'>
							<img src={this.props.salesman.Photo.url} className='salesman-photo' alt='profile'/>
						</div>
					</Col>
					<Col lg={12} md={12} xs={12}>
						<Glyphicon glyph='envelope' /> {(!this.empty(this.props.salesman.email1)) ? this.props.salesman.email1 : <span className='empty' />}
					</Col>
					<Col lg={12} md={12} xs={12}>
						<Glyphicon glyph='earphone' /> {(!this.empty(this.props.salesman.phone1)) ? this.props.salesman.phone1 : <span className='empty' />}
					</Col>
				</Row>
			</Col>
        );
    }
}
