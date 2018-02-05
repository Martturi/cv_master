import React, { Component } from 'react'
import { loadPreview } from './Api'
// import './css/pdf.css'

/* eslint react/no-danger: 0 */
class Preview extends Component {
  state = {
    html: '',
  }

  componentWillReceiveProps(props) {
    if (this.props.text !== props.text) {
      this.updatePreview(props.text)
    }
  }

  updatePreview(text = this.props.text) {
    loadPreview(text).then((resolve) => {
      this.setState({ html: resolve })
    })
  }

  render() {
    return (
      <div className="preview" dangerouslySetInnerHTML={{ __html: this.state.html }} />
    )
  }
}

export default Preview
