import axios from 'axios';
import { useEffect, useState } from 'react';
import { Player } from './interfaces/balldontlie';
import { Link } from "react-router-dom"

export default function GalleryView() {

    const [players, setPlayers] = useState<Player[]>([]);
    
    const [position, setPosition] = useState('');

    function filterPosition(input: string) {
        setPosition(input)
    }

    useEffect(() => {
        console.log("hello")
        axios.get('https://www.balldontlie.io/api/v1/players?per_page=100')
            .then(response => {
                setPlayers(response.data.data)
            })
            .catch(error => {
                console.error("error fetching players data", error)
            })
    }, [])



    return (
        <div>
            <div className="postion_toggle">
                <button onClick={() => filterPosition('')}>All Positions</button>
                <button onClick={() => filterPosition('G')}>G</button>
                <button onClick={() => filterPosition('G-F')}>G-F</button>
                <button onClick={() => filterPosition('F')}>F</button>
                <button onClick={() => filterPosition('F-C')}>F-C</button>
                <button onClick={() => filterPosition('C')}>C</button>
            </div>
            {
                players.length? players
                    .filter(player => player.position.includes(position))
                    .map(player => {
                            return <div className="card" key={player.id}>
                                        <Link to={`/player/${player.id}`}>
                                            <div className="player-data">
                                                <img src='paw.jpg' alt="player"></img>
                                                <p>{player.first_name} {player.last_name}</p>
                                            </div>
                                        </Link>
                                    </div>
                        }
                    ) : <></>
            }
        </div>
    );
}