export const CheckFeature = ({title}: {title: string}) => {
    return (
        <div className="flex">
            <div className="pr-4">
            <CheckMark />
            </div>
            {title}
        </div>
    )
}

function CheckMark() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    stroke-width="1.5" stroke="green" className="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9
    01 1-18 099001 18 0Z" />
    </svg>
}