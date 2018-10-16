import React from 'react';
import {Field, ErrorMessage} from 'formik';
import PropTypes from 'prop-types';



export class FormPersonalDetails extends React.Component {
    render() {
        return (
            <React.Fragment>
                <label>Voornaam:
                    <Field type="text"
                           name="firstName"
                           autoComplete="given-name"
                           placeholder="Voornaam"
                           autoFocus={true}/>
                    <ErrorMessage name="firstName">
                        {msq => <div>{msq}</div>}
                    </ErrorMessage>
                </label>
                <br/>
                <label>Achternaam:
                    <Field type="text"
                           name="lastName"
                           autoComplete="family-name"
                           placeholder="Achternaam"/>
                    <ErrorMessage name="lastName">
                        {msq => <div>{msq}</div>}
                    </ErrorMessage>
                </label>
                <br/>
                <label>Geboortedatum:
                    <Field type="numeric"
                           name="bdayDay"
                           autoComplete="bday-day"
                           placeholder="DD"
                           maxLength="2"/>
                    <ErrorMessage name="bdayDay">
                        {msq => <div>{msq}</div>}
                    </ErrorMessage>
                    <Field type="numeric"
                           name="bdayMonth"
                           autoComplete="bday-month"
                           placeholder="MM"
                           maxLength="2">
                    </Field>
                    <ErrorMessage name="bdayMonth">
                        {msq => <div>{msq}</div>}
                    </ErrorMessage>
                    <Field type="numeric"
                           name="bdayYear"
                           autoComplete="bday-year"
                           placeholder="JJJJ"
                           maxLength="4"/>
                    <ErrorMessage name="bdayYear">
                        {msq => <div>{msq}</div>}
                    </ErrorMessage>
                </label>
                <br/>
                <label>Geslacht - optioneel:
                    <Field type="radio"
                           name="gender"
                           value="vrouw"
                           id="vrouw"/>
                    <label htmlFor="vrouw">Vrouw</label>
                    <Field type="radio"
                           name="gender"
                           value="man"
                           id="man"/>
                    <label htmlFor="man">Man</label>
                    <Field type="text"
                           name="other"
                           placeholder="anders"
                           id="anders"/>
                </label>
                <br/>
            </React.Fragment>
        );
    }
}

FormPersonalDetails.propTypes = {
    errors: PropTypes.bool,
    touched: PropTypes.string
};
