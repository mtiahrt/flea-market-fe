import * as React from 'react';
import ShoppingCart from './ShoppingCart';
import CustomerBillingInformation from './CustomerBillingInformation';


export default function CheckOut() {
  return (
    <>
      <CustomerBillingInformation />
      <ShoppingCart />
    </>
  );
}