import { useEffect, useRef } from 'react';

type OnChange = (state: { scale: number, position: number }) => void

const useZoomSlider = (onChange: OnChange) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const thumb = thumbRef.current;
    const zoom = zoomRef.current;

    if(slider !== null && thumb !== null && zoom !== null) {
      thumb.onmousedown = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let shiftX = event.clientX - zoom.getBoundingClientRect().left;

        const onMouseMove = (event: MouseEvent) => {
          let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

          if (newLeft < 0) {
            newLeft = 0;
          }

          let rightEdge = slider.offsetWidth - zoom.offsetWidth;

          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }

          zoom.style.left = newLeft + 'px';
          const scale = slider.offsetWidth / zoom.offsetWidth;
          onChange({ scale, position: newLeft })
        }

        const onMouseUp = () => {
          document.removeEventListener('mouseup', onMouseUp);
          document.removeEventListener('mousemove', onMouseMove);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }

      thumb.ondragstart = () => false

      zoom.onmousedown = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const clientX = event.clientX;
        const leftGrab = clientX < thumb.getBoundingClientRect().left;
        const shiftX = clientX - zoom.getBoundingClientRect().left;
        const zoomInitialWidth = zoom.offsetWidth;

        const onMouseMove = (event: MouseEvent) => {
          let newLeft = zoom.getBoundingClientRect().left - slider.getBoundingClientRect().left;
          let newWidth = zoomInitialWidth + (event.clientX - clientX)

          if(leftGrab) {
            newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
            newWidth = zoomInitialWidth - (event.clientX - clientX)
          }

          if (newLeft < 0) {
            newLeft = 0;
          }

          let rightEdge = slider.offsetWidth - zoom.offsetWidth;

          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }

          if(newWidth > slider.offsetWidth) {
            newWidth = slider.offsetWidth;
          }

          zoom.style.left = `${newLeft}px`;
          zoom.style.width = `${newWidth}px`;
          const scale = slider.offsetWidth / zoom.offsetWidth;
          onChange({ scale, position: newLeft })
        }

        const onMouseUp = () => {
          document.removeEventListener('mouseup', onMouseUp);
          document.removeEventListener('mousemove', onMouseMove);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }

      zoom.ondragstart = () => false
    }
  }, [onChange])

  return {
    sliderRef,
    thumbRef,
    zoomRef
  }
};

export default useZoomSlider;