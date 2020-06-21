/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [github, setGithub] = useState("");
  const [techs, setTechs] = useState("");
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/devs", {
      github,
      longitude,
      latitude,
      techs,
    });

    setDevs([...devs, response.data]);
    setGithub("");
    setTechs([]);


    alert("Usuário adicionado com sucesso");
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="">Usuário no GitHub</label>
            <input
              type="text"
              name="github"
              id="github"
              value={github}
              onChange={(event) => setGithub(event.target.value)}
              required
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              type="text"
              name="techs"
              id="techs"
              value={techs}
              onChange={(event) => setTechs(event.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                name="latitude"
                id="latitude"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                name="longitude"
                id="longitude"
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map((dev) => (
            <li className="dev-item" key={dev._id}>
              <header>
                <img
                  src={dev.avatar}
                  alt="GitHub"
                />
                <div className="user-info">
                  <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://www.github.com/${dev.github}`}>Acessar perfil no GitHub</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
