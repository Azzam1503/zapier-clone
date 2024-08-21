import { useRouter } from "next/navigation";
import LinkButton from "./buttons/LinkButton";
import { Zap } from "@/hooks/useZap";
function ZapTable({ zaps }: { zaps: Zap[] }) {
  const router = useRouter();
  return (
    <div className="mt-8 max-w-screen-lg w-full">
      <div className="flex">
        <div className="flex-1">Name</div>
        <div className="flex-1">ID</div>
        <div className="flex-1">Created at</div>
        <div className="flex-1">Go</div>
      </div>
      <div>
        {zaps.map((zap) => (
          <div className="flex border-b border-t pt-4">
            <div className="flex flex-1">
              <div>
                {
                  <img
                    src={zap.trigger?.type?.image}
                    className="w-[25px] h-[25px]"
                  />
                }{" "}
              </div>
              {zap.actions.map((action) => (
                <div>
                  <img
                    src={action?.type?.image}
                    className="w-[25px] h-[25px]"
                  />
                </div>
              ))}
            </div>
            <div className="flex-1">{zap.id}</div>
            <div className="flex-1">Nov 13, 2023</div>
            <div className="flex-1">
              <LinkButton
                onClick={() => {
                  router.push("/zap/" + zap.id);
                }}
              >
                Go{" "}
              </LinkButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ZapTable;
