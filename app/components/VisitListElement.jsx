import React from 'react';

import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

import { connect } from 'react-redux';
import { select } from './../reducers/actions';

class VisitListElement extends React.Component {
    constructor(props) {
        super(props);
        this.visitClick = this.visitClick.bind(this);
    }

    visitClick(event) {
        this.props.dispatch(select(this.props.index, this.props.data));
    }

    render() {
        let plannedFor 	= new Date(this.props.visit.plannedFor).toLocaleDateString("es-ES");
        let fulfilledAt = (this.props.visit.fulfilledAt !== null) ? new Date(this.props.visit.fulfilledAt).toLocaleDateString("es-ES") : <i>Pending</i>;

        let open = (this.props.visit === this.props.selected) ? 'open text-left' : 'text-left';

        return (
			<Button className={open} onClick={this.visitClick}>
				<Glyphicon glyph='shopping-cart' /> 	<b>Customer:</b> {this.props.visit.Customer.name}<br/>
				<Glyphicon glyph='briefcase' /> 		<b>Salesman:</b> {this.props.visit.Salesman.fullname}<br/>
				<Glyphicon glyph='calendar' /> 			<b>Date:</b> {plannedFor} | {fulfilledAt} <br/>
			</Button>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.visible,
        selected: state.selected,
    };
}

export default connect(mapStateToProps)(VisitListElement);
