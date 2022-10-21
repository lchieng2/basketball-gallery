export interface Team {
    id: number
    abbreviation: string
    city: string
    conference: string
    division: number
    full_name: number
    name: number
}
export interface Player {
    id: number
    first_name: string
    last_name: string
    position: string
    height_feet: number
    height_inches: number
    weight_pounds: number
    team: {
        id: number
        full_name: string
    }
}
