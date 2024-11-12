import { buildIndex } from "./utility/build_index.ts"
import { loadCSV } from "./utility/load_csv.ts"
import { search } from "./utility/search.ts"

async function main() {
  try {
    // Load address data from the CSV file
    const data = await loadCSV("zenkoku.csv")
    // Build an inverted index for efficient searching
    const index = buildIndex(data)
    // Prompt user for input from the console
    const input = prompt("入力：")

    if (typeof input === "string") {
      search(input, index, data)
    } else {
      console.warn("Invalid input. Please enter a string.")
    }
  } catch (error) {
    console.error("Error loading CSV file:", error)
  }
}

main()
