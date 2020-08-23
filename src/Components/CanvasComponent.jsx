
import React, { useEffect, useRef, useState } from 'react';
import { post } from '../utils/ApiCaller';
import { Chip } from '@material-ui/core';

const CanvasComponent = ({ imageUrl, service }) => {
  const canvasElement = useRef(null);
  const imageElement = useRef(null);
  const [metadata, setMetadata] = useState();
  const [captions, setCaptions] = useState([]);
  const [tags, setTags] = useState([]);
  // const [lang, setLang] = useState('');
  // const [sentences, setSentences] = useState([]);

  const sendImageToAIService = async (fileUrl) => {
    const endpoint = `https://computervisiondemo123123.cognitiveservices.azure.com/vision/v3.0/${service}`;
    const response = await post(endpoint, { url: fileUrl });
    console.log(response?.data);
    setMetadata(response?.data?.metadata);
    if (service == 'detect') {
      setCaptions([]);
      setTags([]);
      updateCanvas(response?.data?.objects);
    } else if (service.indexOf('description')) {
      setCaptions(response?.data?.description?.captions);
      setTags(response?.data?.tags);
    }
    // else if (service == 'ocr') {
    //   setLang(response?.data?.language);
    //   setSentences(response?.data?.regions?.lines);
    // }

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

      {
        captions.map((caption) =>
          <p>{caption.text}: {caption.confidence.toFixed(2) * 100}%</p>
        )
      }
      {
        tags.map((tag) => (
          <Chip size='medium' label={`${tag.name}:${(tag.confidence * 100).toFixed(2)}%`} />
        ))
      }
      {/* <div>
        {sentences.map((sentence) => {
          return sentence.words.map((word) =>
            <span>{word.text} </span>
          )
        })}
      </div> */}
    </div >
  );
}

export default CanvasComponent
