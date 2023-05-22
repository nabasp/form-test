import React, { useEffect } from "react";
import AppRoute from "./route";
import axios from "axios";
import { baseUrl } from "./workflows/constants";

function App() {
  useEffect(() => {
    const postData = async () => {
      await axios
        .post(`${baseUrl}/save-device-info`)
        .then((response) => {
          console.log("res", response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    postData(); // Call the function once on component load
  }, []);

  return <AppRoute />;
}

export default App;
