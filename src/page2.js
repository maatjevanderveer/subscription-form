import React from 'react';
import { Field } from 'formik';

export class Page2 extends React.Component {
    render() {
        return (
            <React.Fragment>
                <label>Postcode:
                <Field type="numeric"
                       name="postalCode"
                       autoComplete="postal-code"
                       placeholder="Postcode"
                       autoFocus={true}/>
                </label>
                <label>Huisnr.
                <Field type="numeric"
                       name="houseNumber"
                       autoComplete="houseNumber"
                       placeholder="Nr."/>
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
                </label>
                <br />
                <label>Woonplaats
                <Field type="text"
                       name="city"
                       autoComplete="address-level2"/>
                </label>
            </React.Fragment>
        )
    }
};
