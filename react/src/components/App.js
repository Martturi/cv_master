import React, { Component } from 'react'
import './App.css'
import CVEditor from './CVEditor'
import SearchField from './SearchField'
import { saveCV, loadCV } from './Api'
import Preview from './Preview'


class App extends Component {
  state = {
    uid: '0',
    text: '',
    saveStatus: '',
  }

  componentDidMount() {
    this.openCV()
    this.render()
  }

  updateUID(newUid) {
    this.setState({ uid: newUid })
  }

  updateText(text) {
    this.setState({ text })
  }

  openCV() {
    loadCV(this.state.uid)
      .then((res) => {
        this.setState({ text: res })
      })
      .catch(err => console.log(err))
  }

  saveCV() {
    saveCV(this.state.uid, this.state.text)
      .then(res => this.setState({ saveStatus: res }))
      .catch(rej => this.setState({ saveStatus: rej }))
    setTimeout(
      () => { this.setState({ saveStatus: '' }) },
      3000,
    )
  }


  fetchPDF() {
    fetch(`api/${this.state.uid}/pdf`)
      .then(res => res.blob())
      .then((blob) => {
        const file = new File([blob], `${this.state.uid}.pdf`, { type: 'application/pdf' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(file)
        a.download = `${this.state.uid}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <SearchField
          uid={this.state.uid}
          updateUID={uid => this.updateUID(uid)}
          openCV={() => this.openCV()}
        />
        <CVEditor
          text={this.state.text}
          saveStatus={this.state.saveStatus}
          updateText={text => this.updateText(text)}
          saveCV={() => this.saveCV()}
          fetchPDF={() => this.fetchPDF()}
        />
        <Preview
          text={this.state.text}
        />
      </div>
    )
  }
}

export default App
