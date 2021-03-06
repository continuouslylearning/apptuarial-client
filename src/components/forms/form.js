import React from 'react';
import { reset, reduxForm } from 'redux-form';
import './form.css';


export class BaseForm extends React.Component {
    
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
      .then(() => {
        if(this.props.login) return;
        this.setState({ showSuccess: true });
      });
  }

  render(){
    
    const { pristine, submitting, error, title, children, handleSubmit } = this.props;
    const errorMessage = error ? <span className='form-error'>{error}</span> : null;
    const successMessage = this.state.showSuccess ? <span className='form-success'>Your submission was successful!</span> : null;

    return (
      <div>
        <h2>{title}</h2>
        <form className='form' onSubmit={handleSubmit(values => this.onSubmit(values))}>
          <div aria-live='polite'>
            {successMessage}
            {errorMessage}    
          </div>
          {children}
          <button type='submit' disabled={pristine || submitting}>SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default (formName) => {

  return reduxForm({
    form: formName,
    onSubmitSuccess: (result, dispatch) => dispatch(reset(formName))
  })(BaseForm);
};
