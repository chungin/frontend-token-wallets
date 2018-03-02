import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, Label, Button, Alert } from 'reactstrap';

import { passwordValidate } from '../../../utils/validators';

import RenderPasswordInput from '../../forms/RenderPasswordInput';

const ChangePaymentPasswordForm = (props) => {
  const {
    handleSubmit,
    invalid,
    error,
    fetching
  } = props;

  const renderButton = () =>
    (fetching
      ? (<Button color="primary" className="px-4" disabled={true}><i className="fa fa-cog fa-spin fa-fw"/> Loading</Button>)
      : (<Button color="primary" className="px-4" disabled={invalid}>Save</Button>));

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Old payment password</Label>

        <Field
          component={RenderPasswordInput}
          icon={<i className="fa fa-lock fa-fw"/>}
          name="oldPaymentPassword"
          type="password"
          placeholder="Old payment password"
          validate={passwordValidate}/>
      </FormGroup>

      <FormGroup>
        <Label>New payment password</Label>

        <Field
          component={RenderPasswordInput}
          icon={<i className="fa fa-lock fa-fw"/>}
          name="newPaymentPassword"
          type="password"
          placeholder="New payment password"
          validate={passwordValidate}/>
      </FormGroup>

      <Alert color="info">
        Password can contain lowercase and uppercase letters, numbers and special characters&emsp;
        {// eslint-disable-next-line
        }<code>&#33;&#34;&#35;&#36;&#37;&#38;&#39;&#40;&#41;&#42;&#43;&#58;&#59;&#60;&#61;&#62;&#63;&#64;&#91;&#93;&#94;&#95;&#96;&#123;&#124;&#125;&#126;</code>
      </Alert>

      {error ? <Alert color="danger">{error}</Alert> : null}

      <FormGroup>
        {renderButton()}
      </FormGroup>
    </Form>
  );
};

const FormComponent = reduxForm({
  form: 'changePaymentPassword',
  initialValues: {
    oldPaymentPassword: '',
    newPaymentPassword: ''
  }
})(ChangePaymentPasswordForm);

export default FormComponent;
