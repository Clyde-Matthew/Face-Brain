import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React, { useCallback, useState } from "react";
import particlesOptions from "./particles.json";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";




function App(props) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBox] = useState([]);
  const [route, setState] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    entries: 0,
    joined: '',

  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      email: data.email,
      name: data.name,
      entries: data.entries,
      joined: data.joined,
    });
  };




  const calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    const clarifaiFace = data.outputs[0].data.regions.map((arr) => {
      return arr.region_info.bounding_box;
    });

    return clarifaiFace.map((element) => {
      return {
        leftCol: element.left_col * width,
        topRow: element.top_row * height,
        rightCol: width - element.right_col * width,
        bottomRow: height - element.bottom_row * height,
      };
    });
  };

  const displayFaceBox = (mappedArray) => {
    setBox(mappedArray);
  };

  const onInputChange = (event) => {
    // console.log(event.target.value);
    setInput(event.target.value);
  };

  const onPictureSubmit = () => {
    setImageUrl({ imageUrl: input });
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
        }),
    })
    .then((response) => response.json())
        .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
              }),
          })
            .then((response) => response.json())
            .then((count) => {
                setUser({ ...user, entries: count });
            });
          }    

        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => console.log(err));
  };

  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);

  const onRouteChange = (route) => {
      if (route === "signout") {
      setIsSignedIn(false);
      setImageUrl("");
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setState(route);
  };

  return (
    <div className="App">
      <Particles options={particlesOptions} init={particlesInit} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" 
      ? 
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </div>
        :(
          route === "signin" ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
        
       : route === "signout" 
       ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
       : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
