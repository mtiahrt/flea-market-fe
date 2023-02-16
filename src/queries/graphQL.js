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

export const GET_CATEGORIES_WITH_SUBCATEGORIES = gql`
  query categoriesWithSubcategories {
    categoriesList(orderBy: NAME_ASC) {
      id
      name
      description
      subcategoriesList {
        id
        name
        description
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation createCategory($name: String!) {
    createCategory(input: { category: { name: $name } }) {
      category {
        id
        name
      }
    }
  }
`;
export const ADD_SUBCATEGORY = gql`
  mutation createSubcategory($name: String!, $categoryId: Int!) {
    createSubcategory(
      input: {
        subcategory: {
          name: $name
          categoryId: $categoryId
          description: "No description"
        }
      }
    ) {
      subcategory {
        id
        name
      }
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
export const UPDATE_CART_QUANTITY = gql`
  mutation updateCart($cartId: Int!, $quantity: Int) {
    updateCart(input: { id: $cartId, patch: { quantity: $quantity } }) {
      cart {
        id
        quantity
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
export const GET_SHIPPING_COSTS_ITEMS = gql`
  query shippingCostsList {
    shippingCostsList {
      id
      name
      price
    }
  }
`;
export const GET_INVENTORY_ITEM = gql`
  query ($inventoryId: Int!) {
    inventory(id: $inventoryId) {
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
        quantity
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
  mutation deleteCart($cartId: Int!) {
    deleteCart(input: { id: $cartId }) {
      clientMutationId
    }
  }
`;

export const INVENTORY_LIST = gql`
  query inventoryListWithCartId($userId: String) {
    inventoriesList(condition: { inStock: true }) {
      id
      subcategoryId
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
      subcategory {
        categoryId
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
