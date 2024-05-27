def print320000():
    f = open("320000.txt", "w")
    for i in range(1000):
        f.write("a")
    f.close()
    print("320000 characters printed and saved in 320000.txt")
print320000()