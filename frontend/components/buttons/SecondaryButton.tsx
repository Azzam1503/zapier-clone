import { ReactNode } from "react";

const SecondaryButton = ({children, onClick, size = "small"}: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <div className={`${size === "small"  ? "text-sm" : "text-xl"} 
    ${size === "small"  ? "px-4 pt-1" : "px-10 py-3"} rounded-full cursor-pointer hover:shadow-md border border-black`} onClick={onClick}>
        {children}
    </div>
}

export default SecondaryButton;