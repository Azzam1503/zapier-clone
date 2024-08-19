"use client"
import { Appbar } from "@/components/Appbar";
import DarkButton from "@/components/buttons/DarkButton";
import { useZaps } from "@/hooks/useZap";

export default function() {
    const {zaps, loading} = useZaps();
    console.log(zaps);
    return <div>
        <Appbar />
        <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
            <div className="flex justify-between pr-8">
                <div className="text-xl font-bold">
                    My Zaps
                </div>
                <DarkButton onClick={() => {}}>Create</DarkButton>
            </div>
        </div>
        </div>
    </div>
};

