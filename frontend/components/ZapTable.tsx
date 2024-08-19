import { useRouter } from "next/navigation";
import LinkButton from "./buttons/LinkButton";
import { Zap } from "@/hooks/useZap";
function ZapTable({ zaps }: { zaps: Zap[] }) {
  const router = useRouter();
  return (
    <div className="mt-8 max-w-screen-lg w-full">
      <div className="flex">
        <div className="flex-1">Name</div>
        <div className="flex-1">Last Edit</div>
        <div className="flex-1">Running</div>
        <div className="flex-1">Go</div>
      </div>
      <div>
        {zaps.map((zap) => (
          <div className="flex border-b border-t pt-4">
            <div className="flex-1">
              {zap.trigger.type.name}{" "}
              {zap.actions.map((action) => action.type.name + " ")}
            </div>
            <div className="flex-1">{zap.id}</div>
            <div className="flex-1">Nov 13, 2023</div>
            <div className="flex-1">
              <LinkButton
                onClick={() => {
                  router.push("/zap/" + zap.id);
                }}
              >
                {" "}
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
