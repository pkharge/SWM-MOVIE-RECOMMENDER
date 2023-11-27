# # Read the contents of File 1 into a list of lists
# with open('file1.csv', 'r') as file1:
#     lines_file1 = [line.strip().split(', ') for line in file1]

# # Read the contents of File 2 into a list of lists
# with open('file2.csv', 'r') as file2:
#     lines_file2 = [line.strip().split(', ') for line in file2]

# # Find the common rows and their row numbers
# common_rows = []

# for i, row1 in enumerate(lines_file1, start=1):
#     for j, row2 in enumerate(lines_file2, start=1):
#         s1 = set(row1)
#         s2 = set(row2)
#         found = False
#         for s in s1:
#             if i == j and s in s2 and s not in common_rows:
#                 print("ABSBJKSA ", s)
#                 found = True
#                 common_rows.append((i, row1))
#         # if set(row1) & set(row2):  # Check for common elements
#         #     common_rows.append((i, row1))
#         #     break  # Break once a match is found for the current row in File 1

# # Output the common rows and their row numbers
# for row_number, row in common_rows:
#     # print(f"Row {row_number}: {', '.join(row)}")
#     print(f"Row {row_number-1}")
#     print(row)
#     print()
#     print()


# Read the contents of File 1 into a list of lists
with open('file1.csv', 'r') as file1:
    lines_file1 = [line.strip().split(', ') for line in file1]

# Read the contents of File 2 into a list of lists
with open('file2.csv', 'r') as file2:
    lines_file2 = [line.strip().split(', ') for line in file2]

# Find the common rows and their row numbers
common_rows = []
for i, (row1, row2) in enumerate(zip(lines_file1, lines_file2), start=1):
    if set(row1) & set(row2):  # Check for common elements
        common_rows.append((i, row1))

# Output the common rows and their row numbers
for row_number, row in common_rows:
    # print(f"Row {row_number}: {', '.join(row)}")
    print(f"Row {row_number-1}")
    print(row)
    print()
    print()
