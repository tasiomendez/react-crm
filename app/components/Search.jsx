import React from 'react';

import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

import { connect } from 'react-redux';
import { updateVisible } from './../reducers/actions';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.search 		= this.search.bind(this);
        this.handleKeyDown 	= this.handleKeyDown.bind(this);
    }

    componentDidMount() {
	    this.timer = null;
    }

    search(e) {
        clearTimeout(this.timer);

        let search = [];
        this.props.data.map((visit, index) => {
            if (JSON.stringify(visit.Customer).toUpperCase().includes(e.target.value.toUpperCase()) ||
				 JSON.stringify(visit.Salesman).toUpperCase().includes(e.target.value.toUpperCase())) {
                search.push(visit);
            }
        });

        this.timer = setTimeout(() => {
            this.props.dispatch(updateVisible(search));
        }, 500);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13)
            {this.search(e);}
    }

    render() {

        return (
			<InputGroup>
		    	<FormControl
		            type='text'
		            placeholder={this.props.search || 'Search...'}
		            onChange={this.search}
		            onKeyDown={this.handleKeyDown}
	        	/>
		    	<InputGroup.Addon><Glyphicon glyph='search' /></InputGroup.Addon>
		    </InputGroup>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data,
    };
}

export default connect(mapStateToProps)(Search);
