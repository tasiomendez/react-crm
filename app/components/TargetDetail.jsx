import React from 'react';

import TargetElement from './TargetElement';

import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Grid} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

export default class TargetDetail extends React.Component {

    render() {

        let targets;
        if (this.props.targets.length > 0) {
            targets = this.props.targets.map((target, index) => {
                return(<TargetElement target={target} key={index} index={index} />);
            });
        } else {
            targets = <span className='empty'/>;
        }

        return (
			<Col lg={12} md={12} xs={12} id='targets'>
				<h3><Glyphicon glyph='pushpin' /> <b>Targets</b></h3>
				<Grid fluid>
					<Row>
						<Col lg={12} md={12} xs={12} >
							{targets}
						</Col>
					</Row>
				</Grid>
			</Col>
        );
    }
}

