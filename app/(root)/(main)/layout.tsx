import React from 'react';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

const Layout: React.FC = ({ children }:any) => {
    return (
        <div> 
   <Navbar/>
   <div className="flex">
    <Sidebar/>
    <div className="bg-dark-1 w-full basis-4/5 h-full">{children}</div>
   </div>
   </div>
    );
};

export default Layout;