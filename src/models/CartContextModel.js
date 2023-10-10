export default class CartContextModel {
  constructor(cartId, inventoryId, quantity, price) {
    this.cartId = cartId;
    this.inventoryId = inventoryId;
    this.quantity = quantity;
    this.price = +price;
    this.totalPrice = +(this.price * this.quantity).toFixed(2);
  }
}
