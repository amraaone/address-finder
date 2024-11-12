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
