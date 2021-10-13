import {gql} from "@apollo/client"

export const GET_DETAILS = gql`
query getDetails($id: ID!){
    product(id: $id){
        id
        rating
        variants {
            qty
        }
    }
}
`