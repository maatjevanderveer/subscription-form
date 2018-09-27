import React from 'react';
import { Field } from 'formik';

export class Page3 extends React.Component {
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
                </label>
                <label>Wachtwoord
                <Field type="text"
                       name="password"
                       placeholder="E-mailadres"/>
                </label>
            </React.Fragment>
        )
    }
}