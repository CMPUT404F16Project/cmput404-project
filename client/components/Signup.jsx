import React from 'react';
import {connect} from 'react-redux';
import { Modal, Button, FormGroup, FormControl, InputGroup, Col, PageHeader, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'

export class Signup extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            attempt: false,
            status: false
        }
        this.formSubmit = this.formSubmit.bind(this);
    }

    render() {
        console.log("redner", this.state);
        return (
            <div className="auth-form">
                <PageHeader> σ ﾟ∀ ﾟ) ﾟ∀ﾟ)σ Sign Up </PageHeader>
                <div className={(!this.props.status && this.props.signupAttempt ? "elementToFadeInAndOut" : "good-for-nothing-placeholder") + " auth-error"}>Username and/or password is invalid. Go figure.</div>
                <Form horizontal onSubmit={this.props.handleSubmit(this.formSubmit)}>
                    <Col smOffset={2} sm={10}>
                        <Field name="username" component={AuthorsignupName} />
                    </Col>
                    <Col smOffset={2} sm={10}>
                        <Field name="password" component={AuthorsignupPass} />
                    </Col>
                    <FormGroup className="button-center">
                        <Button bsStyle="default" type="submit"> Sign Me Up! </Button>
                    </FormGroup>
                </Form>
                <div className="evil-thoughts">
                    <span>(≧ロ≦): Just wait until my first post! I'll be post queen or king, whatever. I shall rule all the authors.</span>
                </div>
            </div>
        );

    }

    formSubmit(form) {
        console.log(form);
        this.props.dispatch({
            type: "authSignup",
            username: form.username,
            password: form.password
        });
    }
}

class AuthorsignupName extends React.Component {
    render() {
        return (
            <FormGroup>
                <Col sm={2}>Username</Col>
                <InputGroup>
                    <FormControl {...this.props.input} required={true} id="username" type="text" />
                </InputGroup>
            </FormGroup>
        );
    }
}

class AuthorsignupPass extends React.Component {
    render() {
        return (
            <FormGroup>
                <Col sm={2}>Password</Col>
                    <InputGroup>
                        <FormControl {...this.props.input} required={true} id="password" type="password" placeholder="password"/>
                    </InputGroup>
            </FormGroup>
        )
    }
}

const validate = (values) => {
    const errors = {};
    console.log("validate");
    console.log(values);
    return errors;
}

const signupForm = reduxForm({
    form: 'signup',
    validate: validate
})(Signup);

// export the connected class
function mapStateToProps(state) {
    return {
        status: state.auth.signup,
        signupAttempt: state.auth.signupAttempt,
        error: state.auth.error
    }
}

export default connect(mapStateToProps)(signupForm);
