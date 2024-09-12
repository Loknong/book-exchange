import React from 'react';
import ProfileInfo from '../ProfileInfo';
import OfferActivity from '../ExchangeProcess/OfferActivity';
import Notifications from './NotificaitonComponent';

const AccountOverview: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">

        {/* User Info Section */}
        <div className="col-span-1 space-y-6">
          <ProfileInfo />
          <Notifications />
        </div>

        {/* Offer and Other Sections */}
        <div className="col-span-2 grid grid-cols-1 gap-6">
          
          <OfferActivity />

        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
