interface ButtonTabProps {
    title: string,
    active: boolean,
    onClick: () => void
}
export default function ButtonTab(props: Partial<ButtonTabProps>) {
    const { title, active = false, onClick } = props
    return (
        <button data-filter="*" className={`btn btn-status rounded-pill text-sm me-3 ${active ? 'btn-active' : ''}`}
            onClick={onClick}>
            {title}
        </button>
    )
}
