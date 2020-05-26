import React, { useState } from 'react';

import ZoomSlider from './ZoomSlider'
import styles from './index.module.css';
import Timeline from './Timeline'

type State = {
  scale: number
  position: number
}

const initialState = {
  scale: 0,
  position: 0
}

function App() {
  const [state, setState] = useState<State>(initialState)

  return (
    <div className={styles.container}>
      <Timeline {...state} />

      <ZoomSlider onChange={setState} />
    </div>
  );
}

export default App;
