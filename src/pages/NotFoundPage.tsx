import { Link } from "react-router-dom"
import { FaChevronCircleDown, FaFrown } from "react-icons/fa"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center text-">
      <div className="relative">
        <h1 className="text-[150px] md:text-[200px] font-black text-gray-900 leading-none">404</h1>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
          <FaFrown className="h-20 w-20 text-gray-400" />
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-400">
        ¡Ups! Página no encontrada
      </h2>

      <p className="text-gray-600 mb-10 max-w-md text-lg">
        Parece que te has perdido en el ciberespacio. Esta página no existe o ha sido movida a otra dimensión.
      </p>

      <div className="relative group">
        <div className="absolute -inset-0.5  rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <Link
          to="/"
          className="relative flex items-center gap-2 px-8 py-4 bg-black text-white rounded-lg transition-all duration-200 group-hover:scale-105"
        >
          <FaChevronCircleDown className="h-4 w-4" />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </div>
  )
}
