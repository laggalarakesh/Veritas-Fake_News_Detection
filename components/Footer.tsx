
import React from 'react';
import { APP_VERSION, COPYRIGHT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>{COPYRIGHT_INFO} &bull; Version {APP_VERSION}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;