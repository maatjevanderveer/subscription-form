import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import './styles.css';
import { FormPersonalDetails } from './form-personal-details.js';
import { FormShippingAddress } from './form-shipping-address.js';
import { FormNewAccount } from './form-new-account.js';
import * as Yup from 'yup';

const pages = [<FormPersonalDetails />, <FormShippingAddress />, <FormNewAccount />];

class SubscriptionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        }
    };

    render() {
        const validationSchema = Yup.object().shape({
            firstName: Yup.string()
                .min(2, "Te kort")
                .max(70, "Te lang")
                .required("Verplicht"),
            lastName: Yup.string()
                .min(2, "Te kort")
                .max(100, "Te lang")
                .required("Verplicht"),
            bdayDay: Yup.number()
                .integer("Vul een getal in")
                .positive("Ongeldig")
                .lessThan(32, "Ongeldig")
                .required("verplicht"),
            bdayYear: Yup.number()
                .integer("Vul een getal in")
                .positive("Ongeldig")
                .max(2018, "Ben je in de toekomst geboren?")
                .min(1900, "Ongeldig")
                .required("Verplicht"),
            postalCode: Yup.string()
                .matches(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i, "Bijv. 1234AB")
                .required(),
            houseNumber: Yup.number()
                .integer("Vul een getal in")
                .positive("Ongeldig")
                .required(),
            streetAddress: Yup.string()
                .required(),
            city: Yup.string()
                .required(),
            email: Yup.string()
                .email("Bijv. email@voorbeeld.nl")
                .required()
        });

        return (
            <div>
                <h1>Cineville</h1>
                <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => console.log("values:", values)}>

                        <Form>
                            {pages[this.state.page]}
                            {this.state.page === 0 ? null : <button type="button" onClick={this.previousPage}>Vorige</button>}
                            {this.state.page === pages.length -1 ? <button type="submit">Naar betalen</button> : <button type="button" onClick={this.nextPage}>Verder</button>}
                        </Form>

                </Formik>
            </div>
        )
    };

    previousPage = () => {
        this.setState(state => ({ page: state.page -1}))
    };

    nextPage = () => {
        this.setState(state => ({ page: state.page + 1 }));
    }
}

const initialValues = {
    firstName: "",
    lastName: "",
    bdayDay: "",
    bdayMonth: "",
    bdayYear: "",
    postalCode: "",
    houseNumber: "",
    addition: "",
    streetAddress: "",
    city: "",
    email: "",
    password: ""
};

export default SubscriptionForm