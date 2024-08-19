"use client";
import { Appbar } from "@/components/Appbar";
import DarkButton from "@/components/buttons/DarkButton";
import ZapTable from "@/components/ZapTable";
import { useZaps } from "@/hooks/useZap";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  const { zaps, loading } = useZaps();
  console.log(zaps);
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <div className="flex justify-between pr-8">
            <div className="text-xl font-bold">My Zaps</div>
            <DarkButton
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              Create
            </DarkButton>
          </div>
        </div>
      </div>
      {loading ? (
        <p>Loading......</p>
      ) : (
        <div className="flex justify-center">
          <ZapTable zaps={zaps} />
        </div>
      )}
    </div>
  );
}
