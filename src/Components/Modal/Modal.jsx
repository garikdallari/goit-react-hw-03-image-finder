import React, { Component } from "react";
import { createPortal } from "react-dom";
const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div onClick={this.handleOverlayClick} className="Overlay">
        <div className="Modal">{this.props.children}</div>
      </div>,

      modalRoot
    );
  }
}
