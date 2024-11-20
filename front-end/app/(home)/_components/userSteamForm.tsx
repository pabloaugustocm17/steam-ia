'use client'

import { ArrowRight, User } from "lucide-react"
import { useRouter } from "next/navigation"

import { FormEvent } from "react"

export default function UserSteamForm() {

    const router = useRouter()

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const user = data.get('user')?.toString()
        
        if(!user) return alert('Please, inform a account.')

        router.push(`/${user}`)
    }

    return (
        <div className="space-y-3 w-full px-5 max-w-[800px]">
            <div className="p-5  bg-zinc-900 rounded-xl flex flex-col justify-center gap-3">
                <form className="flex gap-5 flex-wrap justify-center" onSubmit={handleSubmit}>
                    <div className="flex-1 flex items-center gap-3">
                        <User className="text-violet-500" size={24} />
                        <input type="text" placeholder="Steam Account" name="user"
                            className=" flex-1 bg-transparent text-lg placeholder:text-zinc-400 outline-none bg-none focus:border-b pb-1" />

                    </div>

                    <div className="w-full h-px bg-zinc-700 sm:w-px sm:h-10" />

                    <button type="submit" className="font-medium rounded-lg py-2 px-5 flex justify-center items-center gap-2 bg-violet-600 text-violet-200 w-full sm:w-auto hover:bg-violet-700">
                        Continue
                        <ArrowRight size={20} className="text-violet-200" />
                    </button>
                </form>
            </div>
            <p className="text-sm text-zinc-400">
                *It will only be possible to recommend games if your account has  
                <a href="https://help.steampowered.com/en/faqs/view/588C-C67D-0251-C276" className="text-violet-500 underline hover:text-violet-400 mx-1">
                    public
                </a> 
                visibility.
            </p>
        </div>
    )
}