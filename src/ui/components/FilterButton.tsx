import { RiFilterLine } from "react-icons/ri";

export default function FilterButton() {
    return (
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded transition-all hover:bg-black/80 duration-200">
            <RiFilterLine className="" />
            <span className="">Filtrar</span>
        </button>
    )
}