import { ReactNode } from "react";

const PrimaryButton = ({children, onClick, size = "small"}: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <div className={`${size === "small"  ? "text-sm" : "text-xl"} 
    ${size === "small"  ? "px-4 pt-1" : "px-10 py-3"} bg-amber-700 rounded-full text-white cursor-pointer hover:shadow-md`} onClick={onClick}>
        {children}
    </div>
}

export default PrimaryButton;