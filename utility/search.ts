import { Address, InvertedIndex } from "../types/address.ts"
import { displayAddresses } from "./display_addresses.ts"
import { generate2Grams } from "./n_gram.ts"

export function search(term: string, index: InvertedIndex, data: Address[]) {
  const tokens = generate2Grams(term) // Generate 2-grams for the search term

  // Get the initial list of matching rows for the first token
  let matchingRows = index[tokens[0]] || []

  // Intersect matching rows with each subsequent token's rows
  for (let i = 1; i < tokens.length; i++) {
    const tokenRows = index[tokens[i]] || []
    matchingRows = matchingRows.filter((rowIndex) =>
      tokenRows.includes(rowIndex)
    )
  }

  // Retrieve the addresses from the matching row indices
  const matchingAddresses = matchingRows.map((rowIndex) => data[rowIndex])

  // Display matching addresses
  displayAddresses(matchingAddresses)
}
