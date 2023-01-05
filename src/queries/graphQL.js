import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query {
    categoriesList(orderBy: NAME_ASC) {
      id
      name
      description
    }
  }
`;

export const GET_SUBCATEGORIES = gql`
  query ($categoryId: Int!) {
    category(id: $categoryId) {
      subcategoriesList {
        description
        name
        id
      }
    }
  }
`;

export const ADD_SALE_ITEM = gql`
  mutation createInventory(
    $name: String!
    $description: String
    $manufacturerName: String
    $price: BigFloat
    $quantity: Int
    $subcategoryId: Int
  ) {
    createInventory(
      input: {
        inventory: {
          name: $name
          description: $description
          manufacturerName: $manufacturerName
          price: $price
          quantity: $quantity
          subcategoryId: $subcategoryId
        }
      }
    ) {
      inventory {
        id
      }
    }
  }
`;

export const ADD_ITEM_IMAGE = gql`
  mutation createItemImage($id: Int!, $imageURL: String!, $publicId: String!) {
    createItemImage(
      input: {
        itemImage: { inventoryId: $id, url: $imageURL, publicId: $publicId }
      }
    ) {
      itemImage {
        id
        url
        publicId
      }
    }
  }
`;

export const ADD_CART_ITEM = gql`
  mutation createCartItem(
    $inventoryId: Int!
    $quantity: Int
    $userId: String!
  ) {
    createCart(
      input: {
        cart: {
          applicationUserId: $userId
          inventoryId: $inventoryId
          quantity: $quantity
        }
      }
    ) {
      cart {
        id
        quantity
        inventory {
          price
        }
      }
    }
  }
`;

export const GET_INVENTORY_ITEM = gql`
  query ($saleId: Int!) {
    inventory(id: $saleId) {
      id
      description
      manufacturerName
      name
      price
      quantity
      itemImagesList {
        id
        publicId
        url
      }
      subcategory {
        description
        name
      }
      cartsList {
        id
      }
    }
  }
`;

export const GET_SALE_ITEM_AND_CATEGORIES = gql`
  query inventoryData($saleId: Int!) {
    inventory(id: $saleId) {
      description
      id
      name
      manufacturerName
      price
      quantity
      itemImagesList {
        url
        id
      }
      subcategory {
        id
        categoryId
        name
        category {
          name
          id
          subcategoriesList {
            name
            id
          }
        }
      }
    }
    categoriesList {
      name
      id
    }
  }
`;

export const UPDATE_SALE_ITEM = gql`
  mutation updateInventory(
    $id: Int!
    $manufacturerName: String
    $description: String
    $name: String
    $price: BigFloat
    $quantity: Int
    $subcategoryId: Int!
  ) {
    updateInventory(
      input: {
        id: $id
        patch: {
          manufacturerName: $manufacturerName
          description: $description
          name: $name
          price: $price
          quantity: $quantity
          subcategoryId: $subcategoryId
        }
      }
    ) {
      inventory {
        id
        manufacturerName
        name
        price
        subcategoryId
      }
    }
  }
`;

export const DELETE_INVENTORY_ITEM = gql`
  mutation deleteInventory($id: Int!) {
    deleteInventory(input: { id: $id }) {
      deletedInventoryNodeId
    }
  }
`;

export const DELETE_ITEM_IMAGE = gql`
  mutation deleteItemImage($id: Int!) {
    deleteItemImage(input: { id: $id }) {
      clientMutationId
    }
  }
`;
export const DELETE_CART_ITEM = gql`
  mutation deleteCart($id: Int!) {
    deleteCart(input: { id: $id }) {
      clientMutationId
    }
  }
`;

export const INVENTORY_LIST = gql`
  query inventoryListWithCartId($userId: String) {
    inventoriesList(condition: { inStock: true }) {
      id
      description
      manufacturerName
      name
      price
      itemImagesList {
        publicId
        url
      }
      cartsList(condition: { applicationUserId: $userId }) {
        id
        quantity
        inventoryId
        applicationUserId
      }
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query ($user_id: String) {
    cartsList(condition: { applicationUserId: $user_id }) {
      id
      inventoryId
      applicationUserId
      quantity
      inventory {
        description
        name
        price
        quantity
        manufacturerName
      }
    }
  }
`;
