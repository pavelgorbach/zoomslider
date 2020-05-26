import React, { FC } from 'react'

import useTimeline from './useTimeline'
import styles from './index.module.css'

type Props = {
  scale: number
  position: number
}

const Timeline: FC<Props> = (props) => {
  const { containerRef, timelineRef } = useTimeline(props)

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.timeline} ref={timelineRef}>
        <div className={styles.marker} style={{ left: '0px' }}/>
        <div className={styles.marker} style={{ left: '25%' }}/>
        <div className={styles.marker} style={{ left: '49%' }}/>
        <div className={styles.marker} style={{ right: '25%' }}/>
        <div className={styles.marker} style={{ right: '0' }}/>
      </div>
    </div>
  );
}

export default Timeline
