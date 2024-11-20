import { ArrowRight } from "lucide-react";
import { Game } from "../../_models/game";

interface CardGameProps {
    game: Game
}

export default function CardGame({ game } : CardGameProps) {
    return (
        <div className="max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700">
            <img className="rounded-t-lg" src={game["Header image"]} alt="game image" />

            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-50">{game.Name}</h5>
                
                <p className="mb-3 font-normal text-zinc-300">
                    {game["About the game"]}
                </p>
                <a href="https://store.steampowered.com/app/990080/Hogwarts_Legacy/" className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center bg-violet-600 rounded-lg hover:bg-violet-700 ">
                    Acesse o jogo
                    <ArrowRight size={20} />
                </a>
            </div>
        </div>
    )
}