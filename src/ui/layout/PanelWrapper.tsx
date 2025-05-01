import { SidebarPanel } from "./SidebarPanel";

interface PanelWrapperProps {
  children: React.ReactNode;
  namePage: string;
}

export default function PanelWrapper({
  children,
  namePage,
}: PanelWrapperProps) {
  return (
    <div className="flex">
      <SidebarPanel /> {/* Sidebar a la izquierda */}
      <div className="flex-1 bg-white">
        <div className="bg-white p-6 pb-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{namePage}</h1>
          </div>
        </div>
        {/* Contenido dinámico */}
        {children}
      </div>
    </div>
  );
}
