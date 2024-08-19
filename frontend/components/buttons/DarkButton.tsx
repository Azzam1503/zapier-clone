import { ReactNode } from "react";

const DarkButton = ({children, onClick, size = "small"}: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <div className={`flex flex-col jusitfy-center px-8 py-2 bg-purple-700 rounded text-white cursor-pointer hover:shadow-md text-center`} onClick={onClick}>
        {children}
    </div>
}

export default DarkButton;