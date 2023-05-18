import React, {useContext} from 'react';
import {renderGates} from "./renderGates";
import {ActiveGatesContext} from "../../BodyGraph";

const gates = [[47, 24, 4], [17, 11], [43]];

const Ajna = () => {
  const activeGates = useContext(ActiveGatesContext);

  return (
    <div className="triangle triangle--down ajna">
      <p className="label">ajna</p>

      {renderGates(gates, activeGates)}
    </div>
  );
};

export default Ajna;
