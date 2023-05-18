import {allPossibleLines} from '../static/allPosibleLines';

export const findMatchingGate = (gateId: number) => {
  const matchingLine = allPossibleLines.find(([gateFrom, gateTo]) => gateFrom === gateId || gateTo === gateId);
  if(!matchingLine) return null
  return matchingLine.find(id => id !== gateId)
};
