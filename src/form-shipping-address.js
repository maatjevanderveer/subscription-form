import React from 'react';
import { Field, ErrorMessage } from 'formik';

export class FormShippingAddress extends React.Component {
    render() {
        return (
            <React.Fragment>
                <label>Postcode:
                <Field type="numeric"
                       name="postalCode"
                       autoComplete="postal-code"
                       placeholder="Postcode"
                       autoFocus={true}
                       maxLength="7"/>
                    <ErrorMessage name="postalCode">
                        {msq => <div>{msq}</div>}
                    </ErrorMessage>
                </label>
                <label>Huisnr.
                <Field type="numeric"
                       name="houseNumber"
                       autoComplete="houseNumber"
                       placeholder="Nr."/>
                    <ErrorMessage name="houseNumber">
                        {msg => <div>{msg}</div>}
                    </ErrorMessage>
                </label>
                <label>Toevoeging
                <Field type="text"
                       name="addition"
                       placeholder="Toev."/>
                </label>
                <br />
                <label>Straat
                <Field type="text"
                       name="streetAddress"
                       autoComplete="address-line1"/>
                    <ErrorMessage name="streetAddress">
                        {msg => <div>{msg}</div>}
                    </ErrorMessage>
                </label>
                <br />
                <label>Woonplaats
                <Field type="text"
                       name="city"
                       autoComplete="address-level2"/>
                    <ErrorMessage name="city">
                        {msg => <div>{msg}</div>}
                    </ErrorMessage>
                </label>
            </React.Fragment>
        )
    }
}
