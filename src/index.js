import React from 'react';
import {Formik, Form} from 'formik';
import './styles.css';
import {FormPersonalDetails} from './form-personal-details.js';
import {FormShippingAddress} from './form-shipping-address.js';
import {FormNewAccount} from './form-new-account.js';
import {FormPhoto} from './form-photo.js';
import * as Yup from 'yup';
import _ from 'underscore';

const pages = [<FormPersonalDetails/>, <FormShippingAddress/>, <FormNewAccount/>, <FormPhoto />];

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
        .integer('Vul een geldige geboortedag in')
        .positive('Vul een geldige geboortedag in')
        .max(31, 'Vul een geldige geboortedag in')
        .required('Verplicht'),
    bdayMonth: Yup.number()
        .integer('Vul een geldige geboortemaand in')
        .positive('Vul een geldige geboortemaand in')
        .max(12, 'Vul een geldige geboortemaand in')
        .required('Verplicht'),
    bdayYear: Yup.number()
        .integer('Vul een geldig geboortejaar in')
        .positive('Vul een geldig geboortejaar in')
        .max(2018, 'Ben je in de toekomst geboren?')
        .min(1900, 'Vul een geldig geboortejaar in')
        .required('Verplicht'),
    postalCode: Yup.string()
        .matches(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i, 'Vul hier een geldige postcode in')
        .required('Verplicht'),
    houseNumber: Yup.number()
        .integer('Vul hier een geldig huisnummer in')
        .positive('Vul hier een geldig huisnummer in')
        .required('Verplicht'),
    streetAddress: Yup.string()
        .required('Verplicht'),
    city: Yup.string()
        .required('Verplicht'),
    email: Yup.string()
        .email('Vul hier een geldig e-mailadres in')
        .required('Verplicht'),
    photo: Yup.string().required('Upload hier een foto'),
    consentPhoto: Yup.bool()
        .test('consentPhoto', 'Dit vinkje is verplicht: als je geen toestemming geeft, is het helaas niet mogelijk om een Cineville-abonnement af te sluiten. Jouw Cinevillepas is persoonsgebonden en op deze manier kun je je legitimeren aan de kassa van een filmtheater', value => value === true)
        .required('Dit vinkje is verplicht: als je geen toestemming geeft, is het helaas niet mogelijk om een Cineville-abonnement af te sluiten. Jouw Cinevillepas is persoonsgebonden en op deze manier kun je je legitimeren aan de kassa van een filmtheater'),
});

const fieldsPerPage = [
    ['firstName', 'lastName', 'bdayDay', 'bdayYear'],
    ['postalCode', 'houseNumber', 'streetAddress', 'city'],
    ['email', 'password'],
    ['consentPhoto', 'photo']
];

class SubscriptionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 3,
        };
    };

    hasErrors = (values, errors) => {
        // TODO: Doesn't do anything with values atm, is it necessary though?
        const pageErrors = _.pick(errors, fieldsPerPage[this.state.page]);
        return Object.keys(pageErrors).length !== 0;
    };

    render() {

        return (
            <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => console.log('values:', values)}
                    render={({errors, values }) => (
                        <Form>
                            {pages[this.state.page]}
                            {this.state.page === 0 ? null :
                                <button type="button" onClick={this.previousPage}>Vorige</button>}
                                <button type="button" onClick={this.nextPage}
                                        disabled={this.hasErrors(values, errors)}>Verder</button>
                            {Debug()}
                        </Form>
                    )}
            />
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
    other: '',
    postalCode: '',
    houseNumber: '',
    addition: '',
    streetAddress: '',
    city: '',
    email: '',
    password: '',
    photo: '',
    consentPhoto: '',
};

export default SubscriptionForm;


import {FormikConsumer} from 'formik';

export const Debug = () => (
    <div
        style={{
            margin: '3rem 0',
            borderRadius: 4,
            background: '#f6f8fa',

            boxShadow: '0 0 1px  #eee inset',
        }}
    >
        <div
            style={{
                textTransform: 'uppercase',
                fontSize: 11,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                fontWeight: 500,
                padding: '.5rem',
                background: '#555',
                color: '#fff',
                letterSpacing: '1px',
            }}
        >
            Formik State
        </div>
        <FormikConsumer>
            {({validationSchema, validate, onSubmit, ...rest}) => (
                <pre
                    style={{
                        fontSize: '.65rem',
                        padding: '.25rem .5rem',
                        overflowX: 'scroll',
                        fontSize: 11,
                    }}
                >
          {JSON.stringify(rest, null, 2)}
        </pre>
            )}
        </FormikConsumer>
    </div>
);