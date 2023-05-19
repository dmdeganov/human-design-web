import React from 'react';
import {Ajna, GCenter, Head, Heart, Root, Sacral, Solar, Spleen, Throat} from './centers';

type BodyGraphGripProps = {
  children: React.ReactElement;
};

function BodyGraphGrid(props: BodyGraphGripProps) {
  return (
    <div className="body-graph-grid">
      {props.children}
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
