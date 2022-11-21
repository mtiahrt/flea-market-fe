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
query($categoryId: Int!) {
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
    mutation createInventory($name: String!, $description: String, $manufacturerName: String, $price: BigFloat, $subcategoryId: Int){
        createInventory(
         input: { inventory: 
          {name: $name
            description: $description
            manufacturerName: $manufacturerName
            price: $price
            subcategoryId: $subcategoryId
          }}
        ) {
          inventory {
            id
          }
        }
    }`;

export const ADD_ITEM_IMAGE = gql`
  mutation createItemImage($id: Int!, $imageURL: String!, $publicId: String!) {
  createItemImage(input: {itemImage: {inventoryId: $id, url: $imageURL, publicId: $publicId}}) {
    itemImage {
      id
      url
      publicId
    }
  }
}
`;

export const ADD_CART_ITEM = gql `
mutation createCartItem($inventoryId: Int!, $userId: String!) {
  createCart(input: {cart: {userid: $userId, inventoryId: $inventoryId}}) {
    cart{
      id
    }
  }
}
`

export const GET_SALE_ITEM = gql`
query($saleId: Int!) {
    inventory(id: $saleId) {
      id
      description
      manufacturerName
      name
      price
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
mutation updateInventory($id: Int!, $manufacturerName: String, $description: String, $name: String, $price: BigFloat, $subcategoryId: Int!) {
  updateInventory(
    input: {
      id: $id
    patch: { 
      manufacturerName: $manufacturerName,
      description: $description,
      name: $name,
      price: $price,
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

export const DELETE_ITEM_IMAGE = gql`
mutation
deleteItemImage($id: Int!){
  deleteItemImage(input: {id: $id} ) {
    clientMutationId
  }
}
`;
export const DELETE_CART_ITEM = gql`
mutation 
deleteCart($id: Int!){
  deleteCart(input: {id: $id}) {
    clientMutationId
  }
}
`;

export const CARD_ITEM = gql`
query inventoryListWithCartId($userId: String){
  inventoriesList {
    id
    description
    manufacturerName
    name
    price
    itemImagesList {
      publicId
      url
    }
    cartsList(condition: {userid: $userId}) {
      id
      inventoryId
      userid
    }
  }
}
`;

export const GET_CART_ITEMS = gql`
query ($user_id: String) {
  cartsList(condition: {userid: $user_id}) {
    id
    inventoryId
    userid
    inventory {
      description
      name
      price
      manufacturerName
    }
  }
}

`;
