import { Address } from "../types/address.ts"

export async function loadCSV(filePath: string): Promise<Address[]> {
  const file = await Deno.open(filePath)
  const addresses: Address[] = []
  const content = await new Response(file.readable).text()

  const lines = content.split("\n")
  let isFirstRow = true

  for (const line of lines) {
    // Skip the first row if it's a header row
    if (isFirstRow) {
      isFirstRow = false
      continue
    }

    // Split the line by commas
    const row = line.split(",")

    // Check if the row has the expected number of columns (22 or more)
    if (row.length < 22) {
      continue // Skip silently if row has an unexpected number of columns
    }

    // Extract only the required columns, removing quotation marks
    const postalCode = row[4]?.replace(/"/g, "").trim() || ""
    const prefecture = row[7]?.replace(/"/g, "").trim() || ""
    const city = row[9]?.replace(/"/g, "").trim() || ""
    const town = row[11]?.replace(/"/g, "").trim() || ""
    const streetName = row[14]?.replace(/"/g, "").trim() || ""
    const subArea = row[15]?.replace(/"/g, "").trim() || ""
    const companyName = row[19]?.replace(/"/g, "").trim() || ""
    const companyAddress = row[21]?.replace(/"/g, "").trim() || ""

    addresses.push({
      postalCode,
      prefecture,
      city,
      town,
      streetName,
      subArea,
      companyName,
      companyAddress,
    })
  }

  return addresses
}
