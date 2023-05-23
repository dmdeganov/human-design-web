import React, {useEffect, useRef, useState} from 'react';
import {Ajna, GCenter, Head, Heart, Root, Sacral, Solar, Spleen, Throat} from './centers';

type BodyGraphGripProps = {
  children: React.ReactElement;
};

function BodyGraphGrid({children}: BodyGraphGripProps) {
  return (
    <div className="bodygraph-grid">
      {children}
      <Head />
      <Ajna />
      <Throat />
      <div className="g-heart-centers">
        <GCenter />
        <Heart />
      </div>
      <Spleen />
      <Sacral />
      <Solar />
      <Root />
    </div>
  );
}

export default BodyGraphGrid;
