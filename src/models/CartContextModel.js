export default class CartContextModel {
  constructor(cartId, quantity, price) {
    this.cartId = cartId;
    this.quantity = quantity;
    this.price = +price;
    this.totalPrice = +(this.price * this.quantity).toFixed(2);
  }
}
