import { Address, InvertedIndex } from "../types/address.ts"
import { generate2Grams } from "./n_gram.ts"

export function buildIndex(data: Address[]): InvertedIndex {
  const index: InvertedIndex = {}

  data.forEach((address, rowIndex) => {
    // Concatenate all address fields into a single string for generating 2-grams
    const addressString = [
      address.prefecture,
      address.city,
      address.town,
      address.streetName,
      address.subArea,
      address.companyName,
      address.companyAddress,
    ].join("")

    // Generate 2-grams for the address string
    const tokens = generate2Grams(addressString)

    tokens.forEach((token) => {
      // Initialize the index entry for this token if it doesn't exist
      if (!index[token]) {
        index[token] = []
      }
      // Add the row index to the list for this token
      index[token].push(rowIndex)
    })
  })

  return index
}
