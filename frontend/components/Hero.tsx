"use client"
import { useRouter } from "next/navigation";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import Feature from "./Feature";

const Hero  = () => {
    const router = useRouter();
    return(
       <div>
         <div className="flex justify-center">
             <div className="text-5xl font-semibold text-center pt-8 max-w-xl">
        Automate as fast you can type
    </div>
        </div>
         <div className="flex justify-center pt-4">
             <div className="text-xl font-normal text-center pt-4 max-w-2xl">
        AI gives you automation superpowers, and Zapier puts them to work, Pairing AI and Zapier helps you turn ideas intto workflows and bots that work for you
    </div>
        </div>
        <div className="flex justify-center align-center pt-4">
            <PrimaryButton onClick={() => {
                router.push("/signup");
            }} size="big">
            Ger Started free
            </PrimaryButton>
           <div className="pl-2">
           <SecondaryButton onClick={() => {}} size="big">Contact sales</SecondaryButton>
           </div>
        </div>
        <div className="flex justify-center text-black">
            <Feature title={"Free Forever"} subtitle={" for core feature"} />
            <Feature title={"More apps"} subtitle={"than any other platforms"} />
            <Feature title={"Cutting Edge"} subtitle={"AI Features"} />
        </div>
       </div>
    )
}

export default Hero;