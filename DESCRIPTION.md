## Project Structure

- `main.ts`: Main script to execute the address search.
- `main_test.ts`: Unit tests for `buildIndex`, `generate2Grams`, and `search` functions.
- `utility/`: Folder containing utility functions and helpers for the project.
  - `build_index.ts`: Function to build an inverted index for efficient search.
  - `display_addresses.ts`: Function to display search results in a formatted manner.
  - `generate.ts`: Generates necessary components for index.
  - `load_csv.ts`: Loads CSV data for the addresses.
  - `n_gram.ts`: Creates 2-grams for given text input.
  - `search.ts`: Searches for addresses based on the inverted index.
- `types/`: Folder containing TypeScript interfaces.
  - `address.ts`: Interface defining the `Address` structure.
- `convert_encoding.py`: Python script to convert CSV encoding if necessary.

## Setup Instructions

1. **Install Deno** (if not already installed):

   ```bash
   # macOS (with Homebrew)
   brew install deno

   # Linux
   curl -fsSL https://deno.land/install.sh | sh

   # Windows (PowerShell)
   iwr https://deno.land/install.ps1 -useb | iex
   ```

2. **Clone the Repository** and navigate to the project folder:
   `git clone <repository-url>
    cd <project-folder>
`

3. Download and Extract the Address CSV File:
   [Download data](http://jusyo.jp/downloads/new/csv/csv_zenkoku.zip)

4. Convert the Encoding (if needed):
   iconv -f CP932 -t UTF-8 zenkoku.csv > zenkoku_utf8.csv

### Running the project

## Run the Main Script

To execute the main address search script, use:
`deno run --allow-read main.ts
`

## Run Tests

`deno test main_test.ts
`

### Project usage

execute main.ts is can inserable console then insert such as this data
`東京都`

## Example output

入力： 東京都
出力：100-0001 東京都千代田区千代田
出力：101-0001 東京都千代田区神田

# Description of Main Components

## Description of `main.ts`

The `main.ts` file is the entry point for this address search program. Here’s a step-by-step explanation:

### Load Address Data

- The program loads Japanese address data from a CSV file (`zenkoku.csv`) using `loadCSV`.
- This function reads and parses the CSV file to get structured address data.

### Build an Inverted Index

- The program uses the `buildIndex` function to create an inverted index.
- This index maps small chunks (2-grams) of address text to specific rows in the address data, allowing for faster search.

### Get User Input

- It prompts the user to enter a search term (e.g., part of an address) using `prompt("入力：")`.

### Perform Search

- If the input is a string, it runs `search`, passing the user input, the inverted index, and the address data to find matching addresses.
- If the input is invalid, it warns the user.

### Error Handling

- If there’s an issue with loading the CSV file, it logs an error message.

---

## Description of `buildIndex`

The `buildIndex` function creates an inverted index, which is a data structure that makes searching faster. Here’s how it works:

### Concatenate Address Fields

- For each address entry, the function concatenates relevant fields (e.g., `prefecture`, `city`, `town`) into a single string (`addressString`).

### Generate 2-Grams

- It uses `generate2Grams` to split `addressString` into overlapping 2-character pieces, called 2-grams (e.g., `"東京都"` becomes `["東京", "京都"]`).

### Build the Index

- For each 2-gram (or token), it checks if the 2-gram already exists in the index:
  - If not, it initializes a new array for that 2-gram.
  - Then, it adds the row index (position of the address) to the array for that 2-gram.
- This means each 2-gram in the index points to rows where that 2-gram appears, allowing for quick lookup.

---

## Description of `generate2Grams`

Here’s the simplified `generate2Grams` function, which creates 2-character slices from a text:

```typescript
export function generate2Grams(text: string): string[] {
  const tokens = []
  for (let i = 0; i < text.length - 1; i++) {
    tokens.push(text.slice(i, i + 2))
  }
  return tokens
}
```

### Purpose

- This function takes a string (like `"東京都"`) and breaks it into pairs of consecutive characters, called 2-grams.
- For example, `"東京都"` becomes `["東京", "京都"]`.

### How It Works

- It loops through each character in the string (except the last one) and takes a slice of two characters at each position.
- These 2-character slices are stored in an array, `tokens`, which is returned.
