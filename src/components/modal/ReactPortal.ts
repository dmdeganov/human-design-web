import {createPortal} from 'react-dom';
import React from 'react';

interface Props {
  children: React.ReactNode;
  wrapperId?: string
}
function ReactPortal({children, wrapperId = "react-portal-wrapper"}: Props) {
  let element = document.getElementById(wrapperId);
  if (!element) {
    element = createWrapperAndAppendToBody(wrapperId);
  }
  return createPortal(children, document.getElementById(wrapperId) as HTMLElement);
}
export default ReactPortal;

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
