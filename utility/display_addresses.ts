import type { Address } from "../types/address.ts"

export function displayAddresses(addresses: Address[]): void {
  for (const address of addresses) {
    // Concatenate all address fields directly without spaces between them
    const fullAddress = [
      address.prefecture.trim(),
      address.city.trim(),
      address.town.trim(),
      address.streetName.trim(),
      address.subArea.trim(),
      address.companyName.trim(),
      address.companyAddress.trim(),
    ]
      .filter(Boolean)
      .join("") // Join all address parts without any space, filtering out empty strings

    console.log(`出力：${address.postalCode} ${fullAddress}`) // Print with a single space between postal code and address
  }
}
