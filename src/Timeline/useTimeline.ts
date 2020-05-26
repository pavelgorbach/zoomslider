import { useEffect, useRef } from 'react'

type Props = {
  scale: number
  position: number
}

const useTimeline = (props: Props) => {
  const { position, scale } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const timeline = timelineRef.current

    if(container !== null && timeline !== null) {
      container.scrollLeft = position * scale
      timeline.style.width = 100 * (scale || 1) + '%'
    }
  }, [position, scale])

  return {
    containerRef,
    timelineRef
  }
}

export default useTimeline;
