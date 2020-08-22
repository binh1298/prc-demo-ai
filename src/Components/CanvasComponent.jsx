
import React, { useEffect, useRef, useState } from 'react';
import { post } from '../utils/ApiCaller';

const CanvasComponent = ({ imageUrl }) => {
  const canvasElement = useRef(null);
  const imageElement = useRef(null);
  const [metadata, setMetadata] = useState();
  const sendImageToAIService = async (fileUrl) => {
    const endpoint = 'https://computervisiondemo123123.cognitiveservices.azure.com/vision/v3.0/detect';
    const response = await post(endpoint, { url: fileUrl });
    console.log(response?.data?.objects);
    setMetadata(response?.data?.metadata);
    updateCanvas(response?.data?.objects);
  }

  const updateCanvas = (objects) => {
    if (objects) {
      const ctx = canvasElement.current.getContext('2d');
      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      objects.forEach((object) => {
        const { x, y, w, h } = object.rectangle;
        ctx.rect(x + 30, y + 30, w, h);
        ctx.fillText(object.object + ' (' + object.confidence * 100 + '%)', x + 30, y + 30);
      })
      ctx.stroke();
    }
  }

  useEffect(() => {
    sendImageToAIService(imageUrl);
  },
    [imageUrl]);
  return (
    <div style={{ position: 'relative' }}>
      <img src={imageUrl} ref={imageElement} />

      <canvas
        style={{ position: 'absolute', left: -30, top: -30 }}
        ref={canvasElement}
        width={metadata?.width + 60}
        height={metadata?.height + 60} />
    </div>
  );
}

export default CanvasComponent
