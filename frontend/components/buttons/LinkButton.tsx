import { ReactNode } from "react"

const LinkButton = ({children, onClick}: 
    {children: ReactNode, onClick :() => void}) => 
{
    return <div className="px-2 py-2 rounded-md cursor-pointer hover:bg-slate-200 font-light text-sm" onClick={onClick}>
        {children}
    </div>
};

export default LinkButton;