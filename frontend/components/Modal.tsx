import { useState } from "react";
import Input from "./Input";
import PrimaryButton from "./buttons/PrimaryButton";

export default function Modal({
  index,
  onSelect,
  availableItems,
}: {
  index: number;
  onSelect: (
    props: null | { name: string; id: string; metadata?: any }
  ) => void;
  availableItems: { id: string; name: string; image: string }[];
}) {
  const [step, setStep] = useState(0);
  const [selectedAction, setSelectedAction] = useState<{
    id: string;
    name: string;
  }>();
  const isTrigger = index == 1;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <div className="text-xl">
              Select {index == 1 ? "Trigger" : "Action"}
            </div>
            <button
              onClick={() => {
                onSelect(null);
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            {step == 1 && selectedAction?.id === "email" && (
              <EmailSelector
                setMetaData={(metadata) => {
                  onSelect({
                    ...selectedAction,
                    metadata,
                  });
                }}
              />
            )}
            {step == 1 && selectedAction?.id === "send-sol" && (
              <SolanaSelector
                setMetaData={(metadata) => {
                  onSelect({
                    ...selectedAction,
                    metadata,
                  });
                }}
              />
            )}
            {step == 0 && (
              <div>
                {availableItems.map((item) => {
                  return (
                    <div
                      className="flex border p-4 cursor-pointer hover:bg-slate-100"
                      onClick={() => {
                        if (isTrigger) {
                          onSelect({
                            id: item.id,
                            name: item.name,
                          });
                        } else {
                          setStep((s) => s + 1);
                          setSelectedAction({
                            id: item.id,
                            name: item.name,
                          });
                        }
                      }}
                    >
                      <img
                        src={item.image}
                        className="rounded-full"
                        width="35px"
                        alt=""
                      />
                      <div className="flex flex-col justify-center">
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailSelector({
  setMetaData,
}: {
  setMetaData: (params: any) => void;
}) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  return (
    <div>
      <Input
        label={"To"}
        type={"text"}
        name={"To"}
        placeholder={"To"}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input
        label={"Body"}
        type={"text"}
        name={"Body"}
        placeholder={"Body"}
        onChange={(e) => setBody(e.target.value)}
      ></Input>
      <PrimaryButton
        onClick={() => {
          setMetaData({
            email,
            body,
          });
        }}
      >
        Submit
      </PrimaryButton>
    </div>
  );
}

function SolanaSelector({
  setMetaData,
}: {
  setMetaData: (params: any) => void;
}) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  return (
    <div>
      <Input
        label={"Address"}
        type={"text"}
        name={"Address"}
        placeholder={"address"}
        onChange={(e) => setAmount(e.target.value)}
      ></Input>
      <Input
        label={"Amount"}
        type={"text"}
        name={"Amount"}
        placeholder={"amount"}
        onChange={(e) => setAddress(e.target.value)}
      ></Input>
      <PrimaryButton
        onClick={() => {
          setMetaData({
            amount,
            address,
          });
        }}
      >
        Submit
      </PrimaryButton>
    </div>
  );
}
