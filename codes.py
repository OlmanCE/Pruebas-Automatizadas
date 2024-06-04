#create a funtion to write "1234567890" 32000 times to a file
def write_to_file():
    with open("content.txt", "w") as f:
        f.write("1234567890" * 32000)
write_to_file()