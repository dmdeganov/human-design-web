import React, {useEffect} from 'react';
import {getDrawAnimatedLine} from '@/modules/body-graph/utils/drawAnimtedLine';
import JsCanvas from "@/modules/body-graph/components/JSCanvas";
import BodyGraphGrid from "@/modules/body-graph/components/BodyGraphGrid";

const TestPage = () => {
  return (
    <BodyGraphGrid>
      <JsCanvas/>
    </BodyGraphGrid>
  );
};

export default TestPage;
