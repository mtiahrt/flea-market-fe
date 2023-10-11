export default class CartContextModel {
  constructor(
    cartId,
    inventoryId,
    quantity,
    quantityAvailable,
    manufacturerName,
    price
  ) {
    this.cartId = cartId;
    this.inventoryId = inventoryId;
    this.quantity = quantity;
    this.quantityAvailable = quantityAvailable;
    this.manufacturerName = manufacturerName;
    this.price = +price;
    this.totalPrice = +(this.price * this.quantity).toFixed(2);
  }
}
