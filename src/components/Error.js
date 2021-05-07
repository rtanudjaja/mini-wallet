import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export class Error extends Component {
  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    let _errorMsg = this.props.history.location.state ? this.props.history.location.state.error : null;
    return (
      <div className="h-100 d-flex flex-column align-items-center justify-content-center">
        {_errorMsg ? (<h1>{_errorMsg}</h1>) : (<h1>Error</h1>)}
        <Button size="lg" onClick={() => this.goBack()}>BACK</Button>
      </div>
    )
  }
}

export default Error
