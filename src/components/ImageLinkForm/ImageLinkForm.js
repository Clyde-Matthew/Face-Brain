import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
  return (
    <div>
      <p>
        {"This Magic Brain will detect faces in your pictures. Give it a try!"}
      </p>
      <div className="center">
        <div className="styling center form">
          <input className="input" type="text" placeholder="Image Link" onChange={onInputChange} />
          <button className="grow" onClick={onPictureSubmit}>Detect</button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
