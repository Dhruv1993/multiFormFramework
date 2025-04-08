import React from 'react';
import ExtensionOptions from './ExtensionOptions';
import Currentperiod from './Currentperiod';
import { leaseOptionPayload } from '../utils/apiPayload';

const ExtensionForm = () => {
  return (
    <div>
      <ExtensionOptions data={leaseOptionPayload} />
      <Currentperiod payload={leaseOptionPayload} />
    </div>
  );
};

export default ExtensionForm;