import React from 'react'
import useLockBodyScroll from "../packages/use-lock-body-scroll/test/useLockBodyScroll.test";

const Modal = ({ isOpen }) => {
  useLockBodyScroll(isOpen);

  return isOpen ? <div className="modal">Modal Content</div> : null;
};