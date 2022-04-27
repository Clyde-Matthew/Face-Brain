import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
   const faces = boxes.map((box, i) => {
    const { topRow, rightCol, bottomRow, leftCol } = box;
    return (
      <div
        key={i}
        className="boundingBox"
        style={{
          top: topRow,
          right: rightCol,
          bottom: bottomRow,
          left: leftCol,
        }}
      />
    );
  });

  return (
    <div className="center">
      <div className="cont">
        <img
          id="inputimage"
          src={imageUrl.imageUrl}
          alt=""
          width="600px"
          height="auto"
        />        
        <div className="bounding-box container>">{faces}</div>
     </div>
    </div>
  );
};

export default FaceRecognition;
