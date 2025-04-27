import React from 'react';
import { NavLink } from 'react-router-dom';

type SidebarOptionProps = {
  path: string;
  label: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: SidebarOptionProps[];
};

const SidebarOption = ({ path, label, Icon, children }: SidebarOptionProps) => {

  const closeSidebar = () => {
    const sidebar = document.getElementById('drawer-panel') as HTMLInputElement;
    sidebar.checked = false;
  };

  return (
    <li className=''>
      {
        children ? (
          <details className='collapse rounded-none collapse-arrow'>
            <summary className='collapse-title btn btn-md py-0 !flex items-center btn-ghost w-full gap-2 justify-start text-gray-800 hover:bg-gray-200'>
              {
                Icon && <Icon className='text-xl' />
              }
              <span>{label}</span>
            </summary>
            <div className='collapse-content px-0'>
              <ul>
                {
                  children.map(child => (
                    <NavLink
                      key={child.path}
                      to={`/panel/${path}/${child.path}`}
                      className={
                        ({ isActive }) => [
                          'btn btn-md btn-ghost w-full ps-11 gap-2 justify-start',
                          isActive ? '!bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'
                        ].join(' ')
                      }
                      onClick={closeSidebar}
                    >
                      {
                        child.Icon && <child.Icon className='text-xl' />
                      }
                      <span>{child.label}</span>
                    </NavLink>
                  ))
                }
              </ul>
            </div>
          </details>
        ) :
          (
            <NavLink
              to={`/panel/${path}`}
              className={
                ({ isActive }) => [
                  'btn btn-md btn-ghost w-full gap-2 justify-start',
                  isActive ? '!bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'
                ].join(' ')
              }
              onClick={closeSidebar}
              >
              {
                Icon && <Icon className='text-xl' />
              }
              <span>{label}</span>
            </NavLink>
          )
      }
    </li>
  );
};
export default SidebarOption;