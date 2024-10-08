import { ReactNode } from "react";

const PrimaryButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <div
      className={`${size === "small" ? "text-sm" : "text-xl"} 
    ${
      size === "small" ? "px-4 py-2" : "px-10 py-3"
    } bg-amber-700 rounded-full text-white cursor-pointer hover:shadow-md text-center`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default PrimaryButton;
