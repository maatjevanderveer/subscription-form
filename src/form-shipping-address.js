import React from 'react';
import {Field, ErrorMessage} from 'formik';
import _ from 'lodash';

export class FormShippingAddress extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.timeout = 0;
        this.apiFieldsOnChange = _.debounce(this.apiFieldsOnChange, 250).bind(this);
    }

    apiFieldsOnChange(form) {
        const {errors} = form;
        const {postalCode, houseNumber} = this.state;
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (postalCode && houseNumber && !errors['postalCode'] && !errors['houseNumber']) {
                const url = `https://api.postcodeapi.nu/v2/addresses/?postcode=${postalCode}&number=${houseNumber}`;
                fetch(url, {
                    headers: {
                        'X-Api-Key': 'nsGtnjjCLG8y7VvZcUhQxaJartHIRnf051vXOm2n'
                    }
                }).then(res => res.json()).then(data => {
                    console.log('response', data);
                    form.setFieldValue('streetAddress', _.get(data, '_embedded.addresses[0].street', ''));
                    form.setFieldValue('city', _.get(data, '_embedded.addresses[0].city.label', ''));
                    form.setFieldTouched('streetAddress', true);
                    form.setFieldTouched('city', true);
                });
            }
        }, 300);
    }

    render() {
        return (
            <React.Fragment>
                <label>Postcode:
                    <Field type="numeric"
                           name="postalCode"
                           render={({field, form}) => {
                               return <input
                                   {...field}
                                   onChange={e => {
                                       field.onChange(e);
                                       this.setState({
                                           postalCode: e.target.value
                                       });
                                       this.apiFieldsOnChange(form);
                                   }}
                                   placeholder="Postcode"
                                   autoFocus={true}
                                   maxLength="7"
                                   autoComplete="postal-code"/>;
                           }}/>
                    <ErrorMessage name="postalCode">
                        {msq => <div>{msq}</div>}
                    </ErrorMessage>
                </label>
                <label>Huisnr.
                    <Field type="numeric"
                           name="houseNumber"
                           render={({field, form}) => {
                               return <input
                                   {...field}
                                   onChange={e => {
                                       field.onChange(e);
                                       this.setState({
                                           houseNumber: e.target.value
                                       });
                                       this.apiFieldsOnChange(form);
                                   }}
                                   autoComplete="houseNumber"
                                   placeholder="Nr."/>;
                           }}/>
                    <ErrorMessage name="houseNumber">
                        {msg => <div>{msg}</div>}
                    </ErrorMessage>
                </label>
                <label>Toevoeging
                    <Field type="text"
                           name="addition"
                           placeholder="Toev."/>
                </label>
                <br/>
                <label>Straat
                    <Field type="text"
                           name="streetAddress"
                           autoComplete="address-line1"/>
                    <ErrorMessage name="streetAddress">
                        {msg => <div>{msg}</div>}
                    </ErrorMessage>
                </label>
                <br/>
                <label>Woonplaats
                    <Field type="text"
                           name="city"
                           autoComplete="address-level2"/>
                    <ErrorMessage name="city">
                        {msg => <div>{msg}</div>}
                    </ErrorMessage>
                </label>
            </React.Fragment>
        );
    }
}

const getAddressInformation = function ({postalCode, houseNumber}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({
                '_embedded': {
                    'addresses': [
                        {
                            'id': '0268200000075156',
                            'street': 'Binderskampweg',
                            'number': 29,
                            'letter': 'U',
                            'addition': '31',
                            'postcode': '6545CA',
                            'surface': 144,
                            'nen5825': {
                                'street': 'BINDERSKAMPWEG',
                                'postcode': '6545 CA'
                            },
                            'city': {
                                'id': '1',
                                'label': 'Nijmegen'
                            },
                            'municipality': {
                                'id': '3030',
                                'label': 'Nijmegen'
                            },
                            'province': {
                                'id': '1',
                                'label': 'Gelderland'
                            },
                            'geo': {
                                'center': {
                                    'wgs84': {
                                        'type': 'Point',
                                        'coordinates': [
                                            6.861053257304809,
                                            53.32271304611565
                                        ],
                                        'crs': {
                                            'type': 'name',
                                            'properties': {
                                                'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'
                                            }
                                        }
                                    },
                                    'rd': {
                                        'type': 'Point',
                                        'coordinates': [
                                            253207,
                                            593924
                                        ],
                                        'crs': {
                                            'type': 'name',
                                            'properties': {
                                                'name': 'urn:ogc:def:crs:EPSG::28992'
                                            }
                                        }
                                    }
                                }
                            },
                            'type': 'Verblijfsobject',
                            'purpose': 'woonfunctie',
                            'year': 1987,
                            '_links': {
                                'self': {
                                    'href': 'https://api.postcodeapi.nu/v2/addresses/0268200000075156/'
                                }
                            }
                        }
                    ]
                },
                '_links': {
                    'self': {
                        'href': 'https://api.postcodeapi.nu/v2/addresses/'
                    },
                    'next': {
                        'href': 'https://api.postcodeapi.nu/v2/addresses/?from=0268200000075156'
                    }
                }
            }
        ), 1000);
    });
};