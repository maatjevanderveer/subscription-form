import React from 'react';
import { Field, ErrorMessage } from 'formik';

export class Page1 extends React.Component {
   render() {
       return(
           <React.Fragment>
               <label>Voornaam:
                   <Field type="text"
                          name="firstName"
                          autoComplete="given-name"
                          placeholder="Voornaam"
                          autoFocus={true}/>
               </label>
               <br />
               <label>Achternaam:
                   <Field type="text"
                          name="lastName"
                          autoComplete="family-name"
                          placeholder="Achternaam"/>
               </label>
               <br />
               <label>Geboortedatum:
                   <Field type="numeric"
                          name="bdayDay"
                          autoComplete="bday-day"
                          placeholder="Dag"/>
                   <Field component="select"
                          name="bdayMonth"
                          autoComplete="bday-month"
                          placeholder="Maand">
                       <option value="januari">januari</option>
                       <option value="februari">februari</option>
                       <option value="maart">maart</option>
                       <option value="april">april</option>
                       <option value="mei">mei</option>
                       <option value="juni">juni</option>
                       <option value="juli">juli</option>
                       <option value="augustus">augustus</option>
                       <option value="september">september</option>
                       <option value="oktober">oktober</option>
                       <option value="november">november</option>
                       <option value="december">december</option>
                   </Field>
                   <Field type="numeric"
                          name="bdayYear"
                          autoComplete="bday-year"
                          placeholder="Jaar"/>
               </label>
               <label>Geslacht:
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
                   <Field type="radio"
                          name="gender"
                          value="anders"
                          id="anders" />
                   <label htmlFor="anders">Anders</label>
               </label>
           </React.Fragment>
       )
   }
}