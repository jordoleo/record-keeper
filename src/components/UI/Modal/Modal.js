import React from 'react';
import Backdrop from '../../../hoc/Backdrop/Backdrop';
import './Modal.scss';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const modal = (props) => {
    let header = null;

    let style = 'bg-primary';
    if(props.style === 'danger') {
        style = 'bg-danger';
    } else if(props.style === 'success') {
        style = 'bg-success';
    }

    if(props.header) {
        header = (
            <div className="card-header">
                {props.header}
            </div>
        );
    }
    let body = null;
    if(props.body) {
        body = (
            <div className="card-body">
                {props.body}
            </div>
        );
    }
    return (
        <Aux>
            <Backdrop onClick={props.modalClosedHandler}>
                <div className={"card Modal " + style} style={props.additionalStyle} onClick={(e) => {e.stopPropagation()}}>
                    {header}
                    {body}
                </div>
            </Backdrop>
        </Aux>
    );
};

export default modal;