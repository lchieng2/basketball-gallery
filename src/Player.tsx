import axios from 'axios';
import { useEffect, useState } from 'react';
import { Player } from './interfaces/balldontlie';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom"


export default function PlayerView() {
    const [player, setPlayer] = useState<Player>(Object)
    const params = useParams();
    const location = useLocation();


    const api = axios.create({
        baseURL: 'https://www.balldontlie.io/api/v1/'
    })
    
    useEffect(() => {
        api.get(`players/${params.playerId}`)
            .then(response => {
                setPlayer(response.data)
            })
            .catch(error => {
                console.error("error fetching players data", error)
            })
    }, [location.key])

    return (
        <div className="player-detail">
            <div className="move_arrows">
                <Link to={`/player/${player.id - 1}`}> {"<"} </Link>
                <Link to={`/player/${player.id + 1}`}> {">"} </Link>
            </div>
            <div>
                <img src='../paw.jpg' alt="player"></img>
                <h1>{player.first_name} {player.last_name}</h1>
                {player.team ? <h3>{player.team.full_name}</h3> : <></>}
                <p>Height: {player.height_feet}-{player.height_inches}</p>
                <p>Weight: {player.weight_pounds}lbs</p>
                <p>Position: {player.position}</p>          
            </div>
        </div>
    );
}