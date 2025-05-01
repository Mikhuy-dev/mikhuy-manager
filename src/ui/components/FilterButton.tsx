import { RiFilterLine } from "react-icons/ri";

export default function FilterButton() {
    return (
        <button className="flex items-center gap-2 px-2 py-2 bg-black text-white rounded transition-all">
            <RiFilterLine className="" />
            <span className="">Filtrar</span>
        </button>
    )
}