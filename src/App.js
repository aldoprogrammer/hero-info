import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [searchText, setSearchText] = useState("")
  const API_KEY = "RGAPI-3e414bb4-c6ba-45fa-87c3-c29a6dc5257f";
  const [playerData, setPlayerData] = useState({});
  
  function searchForPlayer(event) {
    var APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText + "?api_key=" + API_KEY;
    
    axios.get(APICallString).then(function (response){
      // berhasil
      setPlayerData(response.data);
    }).catch(function (error){
      console.log(error);
    });
  }

  console.log(playerData);
  
  return (
    <div className="App">
      <div className="container">
        <h5>League of Legends</h5>
        <input type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button onClick={e => searchForPlayer(e)}>Search For Players</button>
      </div>
      {JSON.stringify(playerData) != '{}' ?
      <><p>{playerData.name}</p>
        <img width="100" height="100" src={"http://ddragon.leaguoflegends.com/cdn/11.21.1/img/profileicon/" + playerData.profileIconId + ".png" }></img>
        <p>Summoner Level{playerData.summonerLevel}</p>
      </>
      :
      <><p>No hero with that name</p></>
      }
    </div>
  );
}

export default App;
