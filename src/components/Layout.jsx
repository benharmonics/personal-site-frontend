import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  HomeModernIcon,
  PlayIcon,
  PencilIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/solid';

const Navbar = () => {
  const [minimized, setMinimized] = useState(false);

  return (
    <nav>
      <button
        id="navbar-button"
        className={`absolute rounded-full transition-all h-6 w-6 text-gainsboro hover:text-bittersweet ${
          minimized ? 'navbar-minimize-button' : 'navbar-maximize-button'
        }`}
        onClick={() => setMinimized(!minimized)}
      >
        {minimized ? <ArrowRightCircleIcon /> : <ArrowLeftCircleIcon />}
      </button>
      <ul
        className={`float-left list-none bg-gainsboro m-0 pl-0 pt-10 h-[100vh] transition-all ${
          minimized ? 'navbar-minimized' : 'navbar-maximized'
        }`}
      >
        <NavbarItem
          linkName="Home"
          linkTo="/"
          icon={<HomeModernIcon className="h-6 w-6" />}
          minimized={minimized}
        />
        <NavbarItem
          linkName="Blogs"
          linkTo="/blogs"
          icon={<PencilIcon className="h-6 w-6" />}
          minimized={minimized}
        />
        <NavbarItem
          linkName="Activities"
          linkTo="/activities"
          icon={<PlayIcon className="h-6 w-6" />}
          minimized={minimized}
        />
        <NavbarItem
          linkName="Chat"
          linkTo="/chat"
          icon={<ChatBubbleOvalLeftIcon className="h-6 w-6" />}
          minimized={minimized}
        />
      </ul>
    </nav>
  );
};

/**
 *
 * @param {string} linkName - The display name of the navbar link
 * @param {string} linkTo - The page to link to e.g. "/blogs"
 * @param {JSX.Element} icon - The SVG icon to display
 * @param {bool} minimized - Whether the navbar is currently minimized
 * @returns {JSX.Element}
 */
const NavbarItem = ({ linkName, linkTo, icon, minimized }) => (
  <li className="navbar-item">
    <Link
      className="flex font-bold decoration-0 text-midnight hover:text-gainsboro hover:bg-bittersweet p-2"
      to={linkTo}
    >
      <div className="w-full h-6 items-center">
        <span className="float-left pl-2">{icon}</span>
        <span
          className={`pl-3 transition-opacity ease-in duration-75 ${
            minimized ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {linkName}
        </span>
      </div>
    </Link>
  </li>
);

const Layout = () => (
  <>
    <div id="layout">
      <Navbar />
    </div>
    <Outlet />
  </>
);

export default Layout;
