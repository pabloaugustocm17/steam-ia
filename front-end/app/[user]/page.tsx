import CardGame from "./_components/cardGame"

type Params = {
    params: {
        user: string
    }
}


export default async function RecommendedGames({ params }: Params) {

    const { user } = params

    return (
        <div className="container mx-auto">
            <header className="my-8 border-b pb-5 border-zinc-600 flex justify-between flex-wrap flex-col-reverse items-center text-center gap-4 sm:flex-row sm:text-left">
                <div className="">
                    <h2 className="text-3xl">
                        Olá,  <span className="text-violet-400 font-semibold">{user}</span>
                    </h2>
                    <p className="text-lg">
                        Esses são os jogos recomendados para o você.
                    </p>
                </div>
                <div className="order-1">
                    <h1 className="text-3xl text-violet-500 font-bold">Steam-IA</h1>
                    <h2 className="text-lg font-semibold text-violet-300">Recomendador de jogos</h2>
                </div>
            </header>

            <main className="mx-3 mb-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <CardGame />
                <CardGame />
                <CardGame />
                <CardGame />
                <CardGame />
                <CardGame />
                <CardGame />
                <CardGame />
            </main>
        </div>
    )
}