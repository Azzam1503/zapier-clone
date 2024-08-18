"use client"
const Input = ({label, name, placeholder, onChange, type = "text"}: {
    label: string,
    placeholder: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: "text" | "password"
}) => {
    return <div>
        <div className="text-sm pb-1 pt-2">
            * <label htmlFor="">{label}</label>
        </div>
        
        <input className="border rounded px-2 py-2 w-full" type={type} name={name} placeholder={placeholder} onChange={onChange}/>
    </div>
}

export default Input;