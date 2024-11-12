import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts"
import { buildIndex } from "./utility/build_index.ts"
import { generate2Grams } from "./utility/n_gram.ts"
import { search } from "./utility/search.ts"

const mockData = [
  {
    postalCode: "100-0001",
    prefecture: "東京都",
    city: "千代田区",
    town: "千代田",
    streetName: "",
    subArea: "",
    companyName: "",
    companyAddress: "",
  },
  {
    postalCode: "101-0001",
    prefecture: "東京都",
    city: "千代田区",
    town: "神田",
    streetName: "",
    subArea: "",
    companyName: "東京都生コンクリート工業組合",
    companyAddress: "千代田区神田1-1-1",
  },
  {
    postalCode: "273-8503",
    prefecture: "千葉県",
    city: "船橋市",
    town: "浜町",
    streetName: "",
    subArea: "",
    companyName: "東京都生コンクリート工業組合",
    companyAddress: "浜町2丁目16-1",
  },
]

Deno.test("generate2Grams - Generates 2-grams correctly", () => {
  const result = generate2Grams("東京都")
  assertEquals(result, ["東京", "京都"])
})

// Test for the `search` function
Deno.test("search - Finds addresses correctly based on term", () => {
  const index = buildIndex(mockData)
  const searchTerm = "東京都"
  const results: any[] = []

  // Override console.log to capture output
  const originalLog = console.log
  console.log = (output: string) => results.push(output)

  // Perform the search
  search(searchTerm, index, mockData)

  // Restore console.log
  console.log = originalLog

  // Filtered results for only address parts
  const filteredResults = results.map((result) =>
    result.replace(/東京都生コンクリート工業組合|千代田区神田1-1-1/g, "").trim()
  )

  // Check that only relevant addresses with "東京都" in the address fields are returned
  assertEquals(filteredResults.length, 2)
  assertEquals(filteredResults[0], "出力：100-0001 東京都千代田区千代田")
  assertEquals(filteredResults[1], "出力：101-0001 東京都千代田区神田")
})
