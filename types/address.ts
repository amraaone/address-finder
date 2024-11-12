// types/address.ts

export interface Address {
  postalCode: string
  prefecture: string
  city: string
  town: string
  streetName: string
  subArea: string
  companyName: string
  companyAddress: string
}

export type CSVRow = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
]

// Define InvertedIndex type
// It maps a token (string) to an array of row indices (numbers)
export type InvertedIndex = { [token: string]: number[] }
