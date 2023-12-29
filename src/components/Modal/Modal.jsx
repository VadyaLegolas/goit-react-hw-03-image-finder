import { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export class Modal extends Component {
  render() {
    return (
      <Overlay>
        <ModalWindow>
          <img src="" alt="" />
        </ModalWindow>
      </Overlay>
    );
  }
}
