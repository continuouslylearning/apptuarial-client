import React from 'react';
import { reset, reduxForm } from 'redux-form';

export default (formName) => {

  class BaseForm extends React.Component {
    
    constructor(props){
      super(props);
      
      this.state = {
        showSuccess: false
      };
    }

    componentDidUpdate(prevProps){
      if((prevProps.pristine & !this.props.pristine) && this.state.showSuccess){
        this.setState({ showSuccess: false });
      }
    }

    onSubmit(values){
      return this.props.onSubmit(values)
        .then(() => this.setState({ showSuccess: true }));
    }

    render(){
      
      const { pristine, submitting, error, title, children, handleSubmit } = this.props;
      const errorMessage = error ? <span className='form-error'>{error}</span> : null;
      const successMessage = this.state.showSuccess ? <span className='form-success'>Your submission was successful!</span> : null;

      return (
        <div>
          <h2>{title}</h2>
          <form className='form' onSubmit={handleSubmit(values => this.onSubmit(values))}>
            {successMessage}
            {errorMessage}
            {children}
            <button type='submit' disabled={pristine || submitting}>SUBMIT</button>
          </form>
        </div>
      );
    }
  }

  return reduxForm({
    form: formName,
    onSubmitSuccess: (result, dispatch) => dispatch(reset(formName))
  })(BaseForm);
};