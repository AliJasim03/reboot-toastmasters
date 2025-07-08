import React from 'react';

// You can add a proper Header and Footer component here later
// import Header from './Header';
// import Footer from './Footer';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <main className="flex-grow">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default PublicLayout;
