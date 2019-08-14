import React, { Component } from 'react';
import Button from 'components/Button.js'
import { githubApiPost } from 'utils/Helpers.js';
import { withRouter } from 'react-router-dom';



class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      sending: false,
      requestFailed: false,
      play: false

    };

    this.changeHandler = this.changeHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    document.body.classList.toggle('noscroll', true);

  }


  componentWillUnmount() {
    document.body.classList.toggle('noscroll', false);
  }

  changeHandler(e) {
    this.setState({ input: e.target.value });
  }

  closeHandler() {
    this.setState({
      focused: false,
      sending: false,
      requestFailed: false,
      input: "",
    })
    this.props.history.push("/");

  }

  submitHandler() {
    if (!this.checkInput()) return;

    this.setState({
      requestFailed: false,
      sending: true
    })

    this.setState({ play: true })

    githubApiPost("issues", { title: this.state.input })
      .then(d => {
        setTimeout(() => {
          this.setState({
            input: "",
            focused: false,
            sending: false
          })
          this.props.history.push("/thanks");
        }, 3000)

      }, () => {
        this.setState({
          requestFailed: true,
          sending: false,
        });

      });
  }

  getSendButtonText() {
    if (this.state.requestFailed) return "resend?"
    if (this.state.sending) return "sending..."
    else return "send"
  }



  getHeadlineText() {
    if (this.state.requestFailed) return "Your message could not been sent."
    if (this.state.sending) return "Thanks for your question!"
    else return "Ask us anything."
  }

  checkInput() {
    return this.state.input.length > 5;
  }

  getSendButtonStatus() {
    return !this.checkInput() || this.state.sending;
  }

  getCancelButtonStatus() {
    return this.state.sending;
  }

  getClassName() {
    return `input${(this.state.focused ? " selected" : "")}`;
  }

  render() {

    let questionMarks = new Array(25).fill(0).map((elem, i) => {
      let z = Math.random();
      let x = Math.random();
      let d = Math.random();
      let q = <span key={i} style={{ "--z": z, "--x": x, "--d": d }} />
      //q.refs.style.setProperty("size", r);

      return (
        q
      )
    });

    return (
      <div className="wrapper">
        <h2 className="dashed-underline">{this.getHeadlineText()}</h2>
        <textarea rows="5" autoFocus style={{ resize: "none" }} className="input-area" placeholder="" value={this.state.input} onChange={this.changeHandler} type="text"></textarea>
        {this.checkInput() && <Button onPress={this.submitHandler} styleClass="button-send" disabled={this.getSendButtonStatus()} text={this.getSendButtonText()}></Button>}
        {!this.checkInput() && <Button onPress={this.closeHandler} disabled={this.getCancelButtonStatus()} text="back to the list"></Button>}
        <div className={"questionmark-animation " + (this.state.play ? "play" : "")}>
          {questionMarks}
        </div>
      </div>
    );
  }
}

export default withRouter(Input);

