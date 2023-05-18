import React, {useContext} from 'react';
import {renderGates} from "./renderGates";
import {ActiveGatesContext} from "../../BodyGraph";

const gates = [[64, 61, 63]];

const Head = () => {
  const activeGates = useContext(ActiveGatesContext);

  return (
    <div className="triangle triangle--up head">
      <p className="label">head</p>
      {renderGates(gates, activeGates)}
    </div>
  );
};

export default Head;
