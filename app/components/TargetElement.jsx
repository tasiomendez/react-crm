import React from 'react';

import {Panel} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

import { connect } from 'react-redux';
import { expanded } from './../reducers/actions';

class TargetElement extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelect 	= this.handleSelect.bind(this);
        this.empty 			= this.empty.bind(this);
    }

    handleSelect() {
        if (this.props.expanded === this.props.index)
            {this.props.dispatch(expanded(null));}
        else
			{this.props.dispatch(expanded(this.props.index));}
    }

    empty(str) {
        if (str === null || str === '')
            {return true;}
        return false;
    }

    render() {

        let status;
        if (this.props.target.success) {
            status = <span className='status-succeeded'><b>Succeeded</b> <Glyphicon glyph='ok' /></span>;
        } else if (this.props.target.success === null) {
            status = <span className='status-pending'><b>Pending</b> <Glyphicon glyph='time' /></span>;
        } else {
            status = <span className='status-fail'><b>Fail</b> <Glyphicon glyph='remove' /></span>;
        }

        let title = <div><Glyphicon glyph='chevron-right' /> <span><b>{this.props.target.Company.name}</b> ({this.props.target.TargetType.name})</span>{status}</div>;

        return (
			<Panel eventKey={this.props.eventKey} header={title} collapsible onSelect={this.handleSelect} expanded={(this.props.expanded === this.props.index)}>
				<blockquote>
					<span><Glyphicon glyph='envelope' /> 	{(!this.empty(this.props.target.Company.name)) ? this.props.target.Company.name : <span className='empty' />}</span><br/>
					<span><Glyphicon glyph='globe' /> 		{(!this.empty(this.props.target.Company.web1)) ? this.props.target.Company.web1 : <span className='empty' />}</span><br/>
					<span><Glyphicon glyph='info-sign' /> 	{(!this.empty(this.props.target.Company.notes)) ? this.props.target.Company.notes : <span className='empty' />}</span><br/>
				</blockquote>
			</Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        expanded: state.expanded,
    };
}

export default connect(mapStateToProps)(TargetElement);
