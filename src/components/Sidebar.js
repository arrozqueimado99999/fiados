import '../css/App.css';
import { ToastContainer } from 'react-toastify';
import {SideBarData} from './SideBarData';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <nav className='navApp'>
      {SideBarData.map((val, key) => {
        return(
          <Link className='btn' to={val.path}>
            <div className='icon'>
              {val.icon}
            </div>
            <div>
              {val.tittle}
            </div>
          </Link>
        )
      })}
      <ToastContainer/>
    </nav>
  );
}

export default Sidebar;