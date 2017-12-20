import React from 'react';

import {Col} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

export default class VisitDetail extends React.Component {

    render() {
        let plannedFor = new Date(this.props.visit.plannedFor).toLocaleDateString("es-ES");
        let fulfilledAt = (this.props.visit.fulfilledAt !== null) ? new Date(this.props.visit.fulfilledAt).toLocaleDateString("es-ES") : <i>Pending</i>;

        return (
			<Row id='visitDetail'>
				<Col lg={6} md={6} xs={6}>
					<Glyphicon glyph='calendar' /> <b>Planned for:</b> {plannedFor}
				</Col>
				<Col lg={6} md={6} xs={6}>
					<Glyphicon glyph='calendar' /> <b>Fulfilled at:</b> {fulfilledAt}
				</Col>
			</Row>
        );
    }
}
