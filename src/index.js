import React from 'react';
import {Formik, Form, ErrorMessage, Field} from 'formik';
import './styles.css';
import {FormPersonalDetails} from './form-personal-details.js';
import {FormShippingAddress} from './form-shipping-address.js';
import {FormNewAccount} from './form-new-account.js';
import * as Yup from 'yup';
import _ from 'underscore';

const pages = [<FormPersonalDetails/>, <FormShippingAddress/>, <FormNewAccount/>];


const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Te kort')
        .max(70, 'Te lang')
        .required('Verplicht'),
    lastName: Yup.string()
        .min(2, 'Te kort')
        .max(100, 'Te lang')
        .required('Verplicht'),
    bdayDay: Yup.number()
        .integer('Vul een getal in')
        .positive('Ongeldig')
        .lessThan(32, 'Ongeldig')
        .required('Verplicht'),
    bdayYear: Yup.number()
        .integer('Vul een getal in')
        .positive('Ongeldig')
        .max(2018, 'Ben je in de toekomst geboren?')
        .min(1900, 'Ongeldig')
        .required('Verplicht'),
    postalCode: Yup.string()
        .matches(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i, 'Bijv. 1234AB')
        .required('Verplicht'),
    houseNumber: Yup.number()
        .integer('Vul een getal in')
        .positive('Ongeldig')
        .required('Verplicht'),
    streetAddress: Yup.string(),
    city: Yup.string(),
    email: Yup.string()
        .email('Bijv. email@voorbeeld.nl'),
});

const fieldsPerPage = [
    ['firstName', 'lastName', 'bdayDay', 'bdayYear'],
    ['postalCode', 'houseNumber', 'streetAddress', 'city'],
    ['email', 'password']
];

class SubscriptionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        };
    };

    hasErrors = (values, errors) => {
        const pageErrors = _.pick(errors, fieldsPerPage[this.state.page]);
        if (Object.keys(pageErrors).length !== 0) {
            return true;
        }
        return false;
    };

    render() {

        return (
            <Formik initialValues={initialValues}
                    validate={values => {
                        console.log(values);
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => console.log('values:', values)}
                    render={({errors, values}) => (
                        <Form>
                            {pages[this.state.page]}
                            {this.state.page === 0 ? null :
                                <button type="button" onClick={this.previousPage}>Vorige</button>}
                            {this.state.page === pages.length - 1 ? <button type="submit">Naar betalen</button> :
                                <button type="button" onClick={this.nextPage}
                                        disabled={this.hasErrors(values, errors)}>Verder</button>}
                        </Form>
                    )}
            >
            </Formik>
        );
    };

    previousPage = () => {
        this.setState(state => ({page: state.page - 1}));
    };

    nextPage = () => {
        this.setState(state => ({page: state.page + 1}));
    };
}

const initialValues = {
    firstName: '',
    lastName: '',
    bdayDay: '',
    bdayMonth: '',
    bdayYear: '',
    postalCode: '',
    houseNumber: '',
    addition: '',
    streetAddress: '',
    city: '',
    email: '',
    password: ''
};

export default SubscriptionForm;