"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { gamesMock } from "../../mocks/GameMock"
import { Game } from "../_models/game"
import CardGame from "./_components/cardGame"
import Loading from "../_components/loading"
import { useParams } from "next/navigation"

type Params = {
    user: string
}

const getRecommenderGames = async (user: string): Promise<Game[]> => {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/games/${user}/recommendations`, {
            method: "GET",
            // cache: "no-store",
        })

        if (!response.ok) {
            return []
        }

        return (await response.json()) as Game[]
    } catch {
        return gamesMock
    }
}

export default function RecommendedGames() {
    
    const params = useParams<Params>()
    const user = params.user

    const [games, setGames] = useState<Game[] | null>(null) 
    const [isLoading, setIsLoading] = useState(true) 

    useEffect(() => {
        const fetchGames = async () => {
            const recommendedGames = await getRecommenderGames(user)
            setGames(recommendedGames)
            setIsLoading(false) 
        }

        fetchGames()
    }, [user])

    return (
        <div className="container mx-auto">
            <header className="my-8 border-b pb-5 border-zinc-600 flex justify-between flex-wrap flex-col-reverse items-center text-center gap-4 sm:flex-row sm:text-left">
                <div>
                    <h2 className="text-3xl">
                        Hello, <span className="text-violet-400 font-semibold">{user}</span>
                    </h2>
                    <p className="text-lg">These are the recommended games for you.</p>
                </div>
                <Link href="/">
                    <div className="order-1">
                        <h1 className="text-3xl text-violet-500 font-bold hover:text-violet-400">Steam-IA</h1>
                        <h2 className="text-lg font-semibold text-violet-300">Game Recommender</h2>
                    </div>
                </Link>
            </header>

            <main className="mx-3 mb-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="absolute top-0 right-[50%]">
                        <Loading /> 
                    </div>
                ) : games?.length === 0 ? (
                    <h2 className="text-xl">Sorry, we were unable to recommend any games.</h2>
                ) : (
                    games?.map((game) => <CardGame key={game.Name} game={game} />)
                )}
            </main>
        </div>
    )
}
