import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalImage, ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handlePressESC);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handlePressESC);
  };

  handlePressESC = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) this.props.onClose();
  };

  render() {
    const { largeImage, tag } = this.props.image;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <ModalImage src={largeImage} alt={tag} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
