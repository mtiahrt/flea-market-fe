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
    mutation createSaleItem($name: String!, $description: String, $manufacturerName: String, $price: BigFloat, $subcategoryId: Int){
        createSaleItem(
         input: { saleItem: 
          {name: $name
            description: $description
            manufacturerName: $manufacturerName
            price: $price
            subcategoryId: $subcategoryId
          }}
        ) {
          saleItem {
            id
          }
        }
    }`

export const ADD_ITEM_IMAGE = gql `
  mutation createItemImage($id: Int!, $imageURL: String!) {
  createItemImage(input: {itemImage: {saleItemId: $id, url: $imageURL}}) {
    itemImage {
      id
      url
    }
  }
}
`

export const GET_SALE_ITEM = gql`
query($saleId: Int!) {
    saleItem(id: $saleId) {
      id
      description
      manufacturerName
      name
      price
      itemImagesList {
        url
      }
      subcategory {
        description
        name
      }
    }
  }
`;

export const GET_SALE_ITEM_AND_CATEGORIES = gql`
query saleItemData($saleId: Int!) {
  saleItem(id: $saleId) {
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
`

export const UPDATE_SALE_ITEM = gql`
mutation updateSaleItem($id: Int!, $manufacturerName: String, $description: String, $name: String, $price: BigFloat, $subcategoryId: Int!) {
  updateSaleItem(
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
    saleItem {
      id
      manufacturerName
      name
      price
      subcategoryId
    }
  }
}
`