import React, { FC } from 'react';

import useZoomSlider from './useZoomSlider';
import styles from './index.module.css';

type Props = {
  onChange(state: { scale: number, position: number }): void;
}

const ZoomRange: FC<Props> = (props) => {
  const { onChange } = props;

  const { sliderRef, thumbRef, zoomRef } = useZoomSlider(onChange)

  return (
    <div className={styles.container} ref={sliderRef}>
      <div className={styles.zoom} ref={zoomRef}>
        <div className={styles.thumb} ref={thumbRef} />
      </div>
    </div>
  );
}

export default ZoomRange;
