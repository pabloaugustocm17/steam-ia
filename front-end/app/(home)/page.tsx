import UserSteamForm from "./_components/UserSteamForm";

export default function Home() {
  return (
    <main className="container mx-auto h-screen flex flex-col justify-center items-center text-center gap-5 bg-pattern bg-no-repeat bg-center">
      <div className="">
        <h1 className="text-5xl text-violet-500 font-bold">Steam-IA</h1>
        <h2 className="text-xl font-semibold text-violet-300">Recomendador de jogos</h2>
      </div>
      <UserSteamForm />
    </main>
  );
}
