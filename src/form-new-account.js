import React from 'react';
import {Field, ErrorMessage} from 'formik';

export class FormNewAccount extends React.Component {
    render() {
        return (
            <React.Fragment>
                <p>Hier maak je je online account voor cineville.nl. Als Cineviller kun je in je account zien welke
                    films je al bezocht hebt en welke op je wachtlist staan, je maakt </p>
                <p><strong>Heb je al een account?</strong> <em>Log in.</em></p>
                <label>E-mailadres:
                    <Field type="email"
                           name="email"
                           autoComplete="email"
                           placeholder="E-mailadres"
                           autoFocus={true}/>
                    <ErrorMessage name="email">
                        {msq => <div>{msq}</div>}
                    </ErrorMessage>
                </label>
                <label>Wachtwoord
                    <Field type="password"
                           name="password"
                           autoComplete="new-password"
                           placeholder="E-mailadres"/>
                </label>
            </React.Fragment>
        );
    }
}

// TODO: check if email/username is already in use --> hier al implementeren of zodra het in cineville.nl is geimplementeerd?
//
// SERVER:
//
// Meteor.methods({
//   doesUserExist(name) {
//     return Accounts.findUserByUsername(name) != null;
//   }
// });
//
// CLIENT:
//
// Meteor.call('doesUserExist', name, function(error, result) {
//   // `result` is true if the user exists.
// });