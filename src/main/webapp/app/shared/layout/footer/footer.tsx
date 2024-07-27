import React from 'react';
import { Translate } from 'react-jhipster';

const Footer = () => (
  <div className="h-12 page-content mt-auto bg-primary p-4">
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-12/12 text-white">
        <p>
          <Translate contentKey="footer">Your footer</Translate>
        </p>
      </div>
    </div>
  </div>
);

export default Footer;
