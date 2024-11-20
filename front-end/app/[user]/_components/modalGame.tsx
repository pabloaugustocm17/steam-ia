import { Game } from "../../_models/game"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    game: Game
}

export default function Modal({ isOpen, onClose, game }: ModalProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 h-full bg-black/80 flex justify-center items-center z-50"
            aria-hidden={!isOpen}
            role="dialog"
            aria-labelledby="modal-title"
        >
            <div className="w-11/12 pb-5 md:w-[800px] max-h-[90vh] overflow-y-auto rounded-lg bg-zinc-800 border border-zinc-700 relative transition-transform transform scale-100">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-200 focus:outline-none"
                    aria-label="Close modal"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Video Section */}
                <iframe
                    className="w-full h-72 rounded-t-lg"
                    src={game.Movies.split(",")[0]}
                    allowFullScreen
                ></iframe>

                {/* Content Section */}
                <div className="p-5 space-y-5">
                    {/* Game Info */}
                    <div>
                        <div className="flex items-center gap-5">
                            <h5
                                id="modal-title"
                                className="mb-2 text-2xl font-bold tracking-tight text-zinc-50"
                            >
                                {game.Name}
                            </h5>
                            <span className="text-violet-300">{game["Release date"]}</span>
                        </div>
                    </div>

                    {/* Categories and Genres */}
                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="text-violet-300">Required age: </span>
                            {game["Required age"]}
                        </p>
                        <p>
                            <span className="font-semibold text-violet-300">Categories: </span>
                            {game.Categories}
                        </p>
                        <p>
                            <span className="font-semibold text-violet-300">Genres: </span>
                            {game.Genres}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-violet-600/50"></div>

                    {/* About the Game */}
                    <h6 className="text-xl">About the Game</h6>
                    <p className="h-64 pr-3 text-sm font-normal text-zinc-300 overflow-y-auto text-ellipsis scrollbar-thin scrollbar-thumb-violet-400 scrollbar-track-transparent">
                        {game["About the game"]}
                    </p>
                </div>
            </div>
        </div>
    )
}
