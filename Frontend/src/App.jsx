import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jokes, setjokes] = useState([]);

  useEffect(() => {
    axios.get("/api/jokes")
      .then((response) => {
        setjokes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Jokes</h1>
      <h2>{jokes.length}</h2>
      {
        jokes.map((joke, index) => (
          <div key={joke.id}>
            <h1>{joke.title}</h1>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </>
  );
}

export default App;
