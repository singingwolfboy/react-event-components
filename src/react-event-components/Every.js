import { Component } from 'react'

class Every extends Component {
  constructor(props) {
    super(props)
    this.state = {
      intervalId: null,
      shouldTriggerNextFrame: true,
      lastFrame: Date.now(),
    }
    this.handleEveryFrame = this.handleEveryFrame.bind(this)
  }

  handleEveryFrame() {
    if (!this.state.shouldTriggerNextFrame) { return }
    const now = Date.now()
    const dt = now - this.state.lastFrame
    this.setState({ lastFrame: now })
    this.props.do(dt/1000)
    window.requestAnimationFrame(this.handleEveryFrame)
  }

  componentDidMount() {
    if (this.props.frame) {
      this.handleEveryFrame()
      return
    }
    const interval = ((Number(this.props.s) || 0) * 1000) + (Number(this.props.ms) || 0)
    this.setState({ intervalId: window.setInterval(this.props.do, interval) })
  }

  componentWillUnmount() {
    if (this.props.frame) {
      this.setState({ shouldTriggerNextFrame: false })
      return
    }
    window.clearInterval(this.state.intervalId)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return null
  }
}

export default Every
