import React, { Component } from 'react'

import FluidAnimation, { defaultConfig } from './fluid-animation'

class ReactFluidAnimation extends Component {
  static defaultProps = {
    config: defaultConfig,
    style: { }
  }

  componentDidUpdate(prevProps) {
    if (this.props.config !== prevProps.config) {
      this._onResize();
    }

    this._animation.config = {
      ...this._animation.config,
      defaultConfig
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize)
    this._reset(this.props)
    this._tick()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize)
    if (this._tickRaf) {
      cancelAnimationFrame(this._tickRaf)
      this._tickRaf = null
    }
  }

  render() {
    const {
      content,
      config,
      animationRef,
      style,
      ...rest
    } = this.props

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          ...style
        }}
        {...rest}
        ref={this._containerRef}
      >
        <canvas
          ref={this._canvasRef}
          onMouseDown={this._onMouseDown}
          onMouseMove={this._onMouseMove}
          onMouseUp={this._onMouseUp}
          onTouchStart={this._onTouchStart}
          onTouchMove={this._onTouchMove}
          onTouchEnd={this._onTouchEnd}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    )
  }

  _containerRef = (ref) => {
    this._container = ref
  }

  _canvasRef = (ref) => {
    this._canvas = ref
  }

  _onMouseDown = (event) => {
    event.preventDefault()
    this._animation.onMouseDown(event.nativeEvent)
  }

  _onMouseMove = (event) => {
    event.preventDefault()
    this._animation.onMouseMove(event.nativeEvent)
  }

  _onMouseUp = (event) => {
    event.preventDefault()
    this._animation.onMouseUp(event.nativeEvent)
  }

  _onTouchStart = (event) => {
    this._animation.onTouchStart(event.nativeEvent)
  }

  _onTouchMove = (event) => {
    this._animation.onTouchMove(event.nativeEvent)
  }

  _onTouchEnd = (event) => {
    this._animation.onTouchEnd(event.nativeEvent)
  }

  _onResize = () => {
    this._canvas.width = this._container.clientWidth
    this._canvas.height = this._container.clientHeight

    if (this._animation) {
      this._animation.resize()
    }
  }

  _tick = () => {
    if (this._animation) {
      this._animation.update()
    }

    this._tickRaf = requestAnimationFrame(this._tick)
  }

  _reset(props) {
    const {
      animationRef,
      content,
      config
    } = props

    this._onResize()

    this._animation = new FluidAnimation({
      canvas: this._canvas,
      content,
      config
    })

    if (animationRef) {
      animationRef(this._animation)
      // this._animation.addRandomSplats(parseInt(Math.random() * 20) + 5)
    }
  }
}

// Sizing is handled by the window resize listener; react-sizeme relied on findDOMNode, which React 19 removed.
export default ReactFluidAnimation

