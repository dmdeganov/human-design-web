import React, {ReactNode, useEffect, useRef} from 'react';
import ReactPortal from '@/components/modal/ReactPortal';
import {CSSTransition} from 'react-transition-group';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
  fullScreenContent: boolean;
  className?: string;
}

export default function Modal({isOpen, close,fullScreenContent, className, children}: ModalType) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? close() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [close]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition in={isOpen} timeout={{enter: 0, exit: 300}} unmountOnExit classNames="modal" nodeRef={nodeRef}>
        <div className={`modal${className ? ` ${className}`: ''}`} ref={nodeRef}>
          <div className={`modal__content${fullScreenContent ? ' modal__content--fullscreen': ''}`}>{children}</div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
