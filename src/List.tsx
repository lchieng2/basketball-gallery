import axios from 'axios';
import { useEffect, useState } from 'react';
import { Player } from './interfaces/balldontlie';
import { Link } from "react-router-dom"

export default function ListView() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [isAsc, setIsAsc] = useState(true);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState("first_name")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    function sortAsc(value: string) {
        let players_sorted;
        if (value === "first_name") {
            players_sorted = [...players].sort((a, b) => a.first_name.localeCompare(b.first_name))
        } else if (value === "last_name") {
            players_sorted = [...players].sort((a, b) => a.last_name.localeCompare(b.last_name))
        } else if (value === "position") {
            players_sorted = [...players].sort((a, b) => a.position.localeCompare(b.position))
        } else {
            players_sorted = [...players].sort((a, b) => a.team.full_name.localeCompare(b.team.full_name))
        }
        setPlayers(players_sorted)
    }

    function sortDesc(value: string) {
        let players_sorted;
        if (value === "first_name") {
            players_sorted = [...players].sort((a, b) => b.first_name.localeCompare(a.first_name))
        } else if (value === "last_name") {
            players_sorted = [...players].sort((a, b) => b.last_name.localeCompare(a.last_name))
        } else if (value === "position") {
            players_sorted = [...players].sort((a, b) => b.position.localeCompare(a.position))
        } else {
            players_sorted = [...players].sort((a, b) => b.team.full_name.localeCompare(a.team.full_name))
        }
        setPlayers(players_sorted)
    }

    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        setSortBy(e.target.value)
        

        if (isAsc) {
            sortAsc(e.target.value)
        } else {
            sortDesc(e.target.value)
        }
    }

    const handleToggle = () => {
        if (isAsc) {
            sortDesc(sortBy)
        } else {
            sortAsc(sortBy)
        }
        setIsAsc(!isAsc)
    }

    const api = axios.create({
        baseURL: 'https://www.balldontlie.io/api/v1/'
    })

    useEffect(() => {
        api.get('players?per_page=100')
            .then(response => {
                setPlayers(response.data.data)
            })
            .catch(error => {
                console.error("error fetching players data", error)
            })

    }, [api])


    return (
        <div className="list-container">
            <div className="search">
                <input type="search" placeholder="search name here..." value={search} onChange={handleSearch}/>
                <div>
                    <select onChange={handleSortBy}>
                        <option value="first_name">first name</option>
                        <option value="last_name">last name</option>
                        <option value="team_name">team</option>
                        <option value="position">position</option>
                    </select>
                </div>
                <div>
                    <button className="toggle-button" onClick={() => handleToggle()}>{isAsc ? "ascending" : "descending"}</button>
                </div>
            </div>
            {
                players.length ? players
                    .filter(player => player.first_name.toLowerCase().startsWith(search.toLowerCase()) 
                                    || player.last_name.toLowerCase().startsWith(search.toLowerCase()) 
                                    || (player.first_name + ' ' + player.last_name).toLowerCase().startsWith(search.toLowerCase()))
                    .map(player => {
                            return  <div className="player-container" key={player.id}>
                                        <Link to={`/player/${player.id}`}>
                                            <li>
                                                <img src="paw.jpg" alt="player" className="player-image"></img>
                                                <div className="player-info">
                                                    <div className="player-name">{player.first_name} {player.last_name}</div>
                                                    <div className="player-team">{player.team.full_name}</div>
                                                    <div className="player-position">Position: {player.position}</div>
                                                </div>

                                            </li>
                                        </Link>
                                    </div>
                        }
                    ) : <></>
            }
        </div>
    );
}