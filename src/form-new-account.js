import React from 'react';
import { Field, ErrorMessage } from 'formik';

export class FormNewAccount extends React.Component {
    render() {
        return(
            <React.Fragment>
                <p>Maak hier je account aan voor <strong>cineville.nl</strong>: dan regel je makkelijk alles zelf, zoals
                    het bijhouden van je watchlist en het maken van reserveringen.</p>
                <p><strong>Heb je al een account?</strong> <em>Log hier in.</em></p>
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
                       placeholder="E-mailadres"/>
                </label>
            </React.Fragment>
        )
    }
}