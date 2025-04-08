import React from 'react';
import ExtensionOptions from './ExtensionOptions';
import { leaseOptionPayload } from '../utils/apiPayload';

const ExtensionForm = () => {
  return <ExtensionOptions data={leaseOptionPayload} />;
};

export default ExtensionForm;