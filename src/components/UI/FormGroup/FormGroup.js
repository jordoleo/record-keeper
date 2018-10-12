import React from 'react';
import Input from 'react-validation/build/input';

const formGroup = (props) => {
    let input = null;
    if(props.type === 'input') {
        input = <Input label={props.label} {...props.options} validations={props.validations} className="form-control"/>
    }

    return (
        <div className="form-group">
            <label htmlFor="email" className="control-label">{props.label}</label>
            {input}
        </div>
    );
};

export default formGroup;