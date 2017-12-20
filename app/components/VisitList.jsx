import React from 'react';
import VisitListElement from './VisitListElement';

import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

export default class VisitList extends React.Component {

    render() {
        let list = this.props.visits.map((visit, index) => {
            return(<VisitListElement visit={visit} key={index} index={index} />);
        });
        if (this.props.visits.length < 1) {
            return (
				<Col lg={4} md={4} xs={12} id='visitList'>
		      		<h2 className='col-sm-12'><Glyphicon glyph='th-list' /> Visits</h2>
		      		<Col lg={12} md={12} xs={12}>
						<Search />
					</Col>
		      		<h4 className='col-sm-12'><i>No Results</i></h4>
				</Col>
            );
        }
        return (
				<Col lg={4} md={4} xs={12} id='visitList'>
		      		<h2 className='col-sm-12'>
		      			<Glyphicon glyph='th-list' /> Visits
		      		</h2>
		      		<ButtonGroup vertical className='col-sm-12'>{list}</ButtonGroup>
				</Col>
        );

    }
}
