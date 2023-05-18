import React, {useEffect} from 'react';
import ActiveLine from '@/modules/body-graph/components/lines/ActiveLine';
import { drawLine} from '@/pages/test/draw';



const TestPage = () => {
  useEffect(() => {
    drawLine();
  }, []);

  return (
    <div className="content" id="2d">
      <canvas width="500" height="500" />
    </div>
  );
};

export default TestPage;
