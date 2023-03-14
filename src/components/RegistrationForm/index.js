import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    formSubmitted: false,
    showFirstNameError: false,
    showLastNameError: false,
  }

  changeName = event => {
    this.setState({firstName: event.target.value})
  }

  changeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  blurName = () => {
    const {firstName} = this.state
    const isValidFirstName = firstName !== ''

    this.setState({showFirstNameError: !isValidFirstName})
  }

  blurLastName = () => {
    const {lastName} = this.state
    const isValidLastName = lastName !== ''
    this.setState({showLastNameError: !isValidLastName})
  }

  submitButton = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state
    const isValidFirstName = firstName !== ''
    const isValidLastName = lastName !== ''

    if (isValidFirstName && isValidLastName) {
      this.setState({formSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        formSubmitted: false,
      })
    }
  }

  renderFirstNdLastName = () => {
    const {
      firstName,
      lastName,
      showFirstNameError,
      showLastNameError,
    } = this.state

    const firstClassName = showFirstNameError
      ? 'input-area error-field'
      : 'input-area'

    const secondClassName = showLastNameError
      ? 'input-area error-field'
      : 'input-area'
    return (
      <form onSubmit={this.submitButton} className="formContainer">
        <div className="input-container">
          <label htmlFor="First" className="label-input">
            FIRST NAME
          </label>
          <input
            value={firstName}
            id="First"
            className={firstClassName}
            placeholder="First Name"
            onChange={this.changeName}
            onBlur={this.blurName}
          />
          {showFirstNameError && <p className="error-message">Required</p>}
        </div>
        <div className="input-container">
          <label htmlFor="Second" className="label-input">
            LAST NAME
          </label>
          <input
            value={lastName}
            id="Second"
            className={secondClassName}
            placeholder="Last Name"
            onChange={this.changeLastName}
            onBlur={this.blurLastName}
          />
          {showLastNameError && <p className="error-message">Required</p>}
        </div>
        <div className="btnContainer">
          <button type="submit" className="submitBtn">
            Submit
          </button>
        </div>
      </form>
    )
  }

  submitAnotherResponse = () => {
    this.setState(prevState => ({
      formSubmitted: !prevState.formSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  renderSubmitSuccessfully = () => (
    <div className="form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p className="success-title">Submitted Successfully</p>
      <button
        type="button"
        className="submitBtn"
        onClick={this.submitAnotherResponse}
      >
        Submit another response
      </button>
    </div>
  )

  render() {
    const {formSubmitted} = this.state
    return (
      <div className="registration-form">
        <h1 className="heading">Registration Form</h1>
        <div className="form-submitted-container">
          {formSubmitted
            ? this.renderSubmitSuccessfully()
            : this.renderFirstNdLastName()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
