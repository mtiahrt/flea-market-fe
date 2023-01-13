// import React from 'react';
// import { FormControl, InputLabel, MenuItem } from '@mui/material';
// import { Select } from '@mui/joy';
// import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import useCart from '../../hooks/useCart';

// function ShoppingCartItem({ item }) {
//   const { setRemoveItemFromCart } = useCart();
//   const getQuantityDropDownOption = (quantity) => {
//     let returnValue = [];
//     for (let i = 1; quantity >= i; i++) {
//       returnValue.push(
//         <MenuItem key={`quantityKey${i}`} value={i}>
//           {i}
//         </MenuItem>
//       );
//     }
//     return returnValue;
//   };
// const handleQuantitySelectChange = (e, id) => {
//   const newQuantity = e.target.value;
//   const itemToChangeIndex = [...cartItems].findIndex(
//     (item) => item.id === id
//   );
//   const updatedChange = {
//     ...cartItems[itemToChangeIndex],
//     quantity: newQuantity,
//     totalPrice: +(cartItems[itemToChangeIndex].price * newQuantity).toFixed(
//       2
//     ),
//   };
//   const newCartItems = [...cartItems];
//   newCartItems[itemToChangeIndex] = updatedChange;
//   setCartItems(newCartItems);
//   setCartTotal(
//     newCartItems.reduce((acc, current) => acc + current.totalPrice, 0)
//   );
// };

// const handleCartClick = (id) => {
//   setRemoveItemFromCart(id);
//   // setCartItems((prev) => prev.filter((x) => x.id !== id));
// };
// return (
//   <div>
//     <React.Fragment key={item.id}>
//       <StyledCartRowItemDiv>
//         <h3>{item.manufacturerName}</h3>
//         <h4>${item.price}</h4>
//         <FormControl>
//           <InputLabel id="quantity-select-label">Quantity</InputLabel>
//           <Select
//             style={{ height: '2.5em' }}
//             value={item.quantity}
//             labelId="quantity-select-label"
//             label="Quantity"
//             onChange={(e, id) => handleQuantitySelectChange(e, item.id)}
//           >
//             {getQuantityDropDownOption(item.totalQuantity)}
//           </Select>
//         </FormControl>
//         <h4 style={{ marginRight: '1em' }}>${item.totalPrice}</h4>
//         <DeleteIcon onClick={handleCartClick} color="error" />
//       </StyledCartRowItemDiv>
// </React.Fragment>
// </div>
// );
// }

// export default ShoppingCartItem;
// const StyledCartRowItemDiv = styled.div`
//   display: grid;
//   grid-template-columns: 1.2fr 0.4fr 0.4fr 0.4fr 0.2fr;
//   grid-gap: 1em;
//   align-items: center;
//   margin-bottom: 1em;
//   h3 {
//     margin: 0;
//     font-weight: 100;
//     font-size: 100%;
//   }
//
//   h4 {
//     margin: 0;
//     justify-self: end;
//     font-weight: 100;
//     font-size: 100%;
//   }
// `;
