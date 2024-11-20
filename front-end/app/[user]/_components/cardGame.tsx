'use client'

import { useState } from "react"
import { Game } from "../../_models/game"
import Modal from "./modalGame"

interface CardGameProps {
    game: Game
}

export default function CardGame({ game }: CardGameProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="max-w-sm h-[420px] p-0 m-0 border rounded-lg shadow bg-gray-800 border-gray-700 relative hover:outline hover:outline-violet-400"
            >
                <img
                    className="rounded-t-lg absolute top-0"
                    src={game["Header image"]}
                    alt={game.Name}
                />

                <div className="p-5 space-y-5 absolute top-44">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-50">{game.Name}</h5>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-violet-300">{game["Release date"]}</span>
                            <p className="text-sm">
                                <span className="text-violet-300">Required age </span>
                                {game["Required age"].toFixed(0)}
                            </p>
                        </div>
                    </div>

                    <p className="pr-3 text-left font-normal text-zinc-300 h-28 overflow-hidden text-ellipsis">
                        {game["About the game"]}
                    </p>
                </div>
                <div className="absolute bottom-0 rounded-lg left-0 right-0 h-1/2 w-full bg-gradient-to-t from-black/80 to-black/0 pointer-events-none" />
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                game={game}
            />
        </>
    )
}
