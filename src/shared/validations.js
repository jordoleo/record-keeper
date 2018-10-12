import React from 'react';
import validator from 'validator';

export const required = (value, props) => {
    if (!value.toString().trim().length) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return `${props.label} is required`;
    }
};

export const email = (value) => {
    if (!validator.isEmail(value)) {
        return `${value} is not a valid email.`
    }
};

export const lt = (value, props) => {
    // get the maxLength from component's props
    if (!value.toString().trim().length > props.max) {
        // Return jsx
        return 'Value exceeded';
    }
};

export const gt = (value, props) => {
    if(value.toString().trim().length < props.min) {
        return `${props.label}'s length must be more than ${props.min}`;
    }
};

export const equalsTo = (value, props, components) => {
    if (value.toString() !== components[props.same][0].value) {
        return `${props.label} must be the same with ${components[props.same][0].label}`;
    }
};

export const password = (value, props, components) => {

    // NOTE: Tricky place. The 'value' argument is always current component's value.
    // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
    // But if we're changing 'confirm' component - the condition will always be true
    // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
    if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
        // 'confirm' - name of input
        // components['confirm'] - array of same-name components because of checkboxes and radios
        return <span className="error">Passwords are not equal.</span>
    }
};
