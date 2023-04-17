import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import React from 'react';


const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
<header className="bg-blue-600 text-white py-4">
  <nav className="container mx-auto">
    <h1 className="text-2xl flex items-center gap-2">
      <FontAwesomeIcon icon={faGlobeAsia} />
      Nepali Dictionary
    </h1>
  </nav>
</header>
      <main className="container mx-auto flex-grow p-4">{children}</main>
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Nepali Dictionary</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

