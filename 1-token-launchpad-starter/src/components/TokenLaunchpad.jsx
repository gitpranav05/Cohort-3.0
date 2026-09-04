import Input from "./Input";

export function TokenLaunchpad() {
    return <main className="flex min-h-screen min-w-80 flex-col items-center justify-center bg-[#242424] text-center font-sans leading-6 font-normal text-white/85 antialiased">
        <h1 className="text-[3.2em] leading-[1.1]">Solana Token Launchpad</h1>
        <Input name={"Name"}/>
        <input className="mt-5 w-75 py-5 pl-2.5" type="text" placeholder="Symbol" />
        <input className="mt-5 w-75 py-5 pl-2.5" type="text" placeholder="Image URL" />
        <input className="mt-5 w-75 py-5 pl-2.5" type="text" placeholder="Initial Supply" />
        <button className="mt-5 cursor-pointer rounded-lg border border-transparent bg-[#1a1a1a] p-5 text-base font-medium transition-colors duration-200 hover:border-[#646cff] focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-auto">
            Create a token
        </button>
    </main>
}
