"use client";
import { BACKEND_URL } from "@/app/config";
import { Appbar } from "@/components/Appbar";
import LinkButton from "@/components/buttons/LinkButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Modal from "@/components/Modal";
import ZapCell from "@/components/ZapCell";
import useGetActions, { AvailableAction } from "@/hooks/useGetActions";
import useGetTriggers, { AvailableTrigger } from "@/hooks/useGetTriggers";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
  const [seletedTrigger, setSelectedTrigger] = useState<{
    id: string;
    name: string;
  }>();
  const [selectedActions, setSelectedActions] = useState<
    {
      index: number;
      availableActionId: string;
      availableActionName: string;
    }[]
  >([]);

  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>();

  const router = useRouter();
  const { actions } = useGetActions();
  const { triggers } = useGetTriggers();
  return (
    <div>
      <Appbar />
      <div className="flex justify-end bg-slate-200 p-4">
        <PrimaryButton
          onClick={async () => {
            if (!seletedTrigger?.id) return;
            console.log("checking", selectedActions);
            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/zap`,
                {
                  availableTriggerId: seletedTrigger?.id,
                  triggerMetadata: {},
                  actions: selectedActions.map((a) => ({
                    availableActionId: a.availableActionId,
                    actionMetadata: {},
                  })),
                },
                {
                  withCredentials: true,
                }
              );
              console.log(response);
              router.push("/dashboard");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Publish
        </PrimaryButton>
      </div>
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <ZapCell
            onClick={() => {
              setSelectedModalIndex(1);
            }}
            name={seletedTrigger?.name ? seletedTrigger?.name : "Trigger"}
            index={1}
          />
        </div>
        <div className=" w-full pt-2 pb-2">
          {selectedActions.map((action, index) => {
            return (
              <div className="flex justify-center p-4">
                <ZapCell
                  onClick={() => {
                    setSelectedModalIndex(action.index);
                  }}
                  name={
                    action.availableActionName
                      ? action.availableActionName
                      : "Action"
                  }
                  index={index}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <PrimaryButton
            onClick={() => {
              setSelectedActions((a) => [
                ...a,
                {
                  index: a.length + 2,
                  availableActionId: "",
                  availableActionName: "",
                },
              ]);
            }}
          >
            <div className="text-2xl">+</div>
          </PrimaryButton>
        </div>
      </div>
      {selectedModalIndex && (
        <Modal
          onSelect={(props: null | { name: string; id: string }) => {
            if (props == null) {
              setSelectedModalIndex(null);
              return;
            }
            if (selectedModalIndex == 1) {
              setSelectedTrigger({
                id: props.id,
                name: props.name,
              });
            } else {
              setSelectedActions((a) => {
                let newActions = [...a];
                newActions[selectedModalIndex - 2] = {
                  index: selectedModalIndex,
                  availableActionId: props.id,
                  availableActionName: props.name,
                };
                return newActions;
              });
            }
          }}
          availableItems={selectedModalIndex === 1 ? triggers : actions}
          index={selectedModalIndex}
        />
      )}
    </div>
  );
}
