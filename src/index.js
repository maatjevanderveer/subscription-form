import React from 'react';
import { Formik, Field, Form } from 'formik';
import './styles.css';
import { Page1 } from './page1.js';
import { Page2 } from './page2.js';
import { Page3 } from './page3.js';

const pages = [<Page1 />, <Page2 />, <Page3 />];

class SubscriptionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        }
    };

    render() {
        return (
            <div>
                <h1>Cineville</h1>
                <Formik initialValues={initialValues}
                        onSubmit={(values) => console.log("values:", values)}>
                    <Form>
                        {pages[this.state.page]}
                        <br />
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
};

export default SubscriptionForm
