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
            name
            description
            manufacturerName
            subcategoryId
            price
          }
        }
    }`
