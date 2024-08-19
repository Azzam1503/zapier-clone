"use client";
import { Appbar } from "@/components/Appbar";
import LinkButton from "@/components/buttons/LinkButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ZapCell from "@/components/ZapCell";
import { useState } from "react";

export default function () {
  const [seletedTrigger, setSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState<
    {
      avalableActionId: string;
      avialableActionName: string;
    }[]
  >([]);
  return (
    <div className="">
      <Appbar />
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <ZapCell
            name={seletedTrigger ? seletedTrigger : "Trigger"}
            index={1}
          />
        </div>
        <div className=" w-full pt-2 pb-2">
          {selectedActions.map((action, index) => {
            return (
              <div className="flex justify-center p-4">
                <ZapCell
                  name={
                    action.avialableActionName
                      ? action.avialableActionName
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
                  avalableActionId: "",
                  avialableActionName: "",
                },
              ]);
            }}
          >
            <div className="text-2xl">+</div>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
