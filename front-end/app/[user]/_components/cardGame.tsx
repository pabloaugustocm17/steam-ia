import { ArrowRight } from "lucide-react";

export default function CardGame() {
    return (
        <div className="max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700">
            <img className="rounded-t-lg" src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/990080/header.jpg?t=1717689083" alt="" />

            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-50">Hogwarts Legacy</h5>
                </a>
                <p className="mb-3 font-normal text-zinc-300">
                    Hogwarts Legacy é um RPG de ação imersivo de mundo aberto. Agora você pode assumir o controle da ação e estar no centro de sua própria aventura no mundo bruxo.
                </p>
                <a href="https://store.steampowered.com/app/990080/Hogwarts_Legacy/" className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center bg-violet-600 rounded-lg hover:bg-violet-700 ">
                    Acesse o jogo
                    <ArrowRight size={20} />
                </a>
            </div>
        </div>
    )
}