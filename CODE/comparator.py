# Comparator file to match the contents from two csv files 

# Read the contents from first cs file 'file1' into a list of lists
with open('file1.csv', 'r') as file1:
    lines_file1 = [line.strip().split(', ') for line in file1]

# Read the contents from second csv file 'file2' into a list of lists
with open('file2.csv', 'r') as file2:
    lines_file2 = [line.strip().split(', ') for line in file2]

# Locate the shared rows within the CSV data along with their respective row numbers.
common_rows = []
for i, (row1, row2) in enumerate(zip(lines_file1, lines_file2), start=1):
    if set(row1) & set(row2):  # Compare to find common elements
        common_rows.append((i, row1))

# Print the common rows and row numbers found in common_rows
for row_number, row in common_rows:
    print(f"Row {row_number-1}")
    print(row)
    print()
    print()
