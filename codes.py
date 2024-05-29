def print320000():
    f = open("320000.txt", "w")
    text = ""
    for i in range(3200):
        text += '1234567890'
    print(text)
    print(len(text) , " letras")
    f.close()
    print("320000 characters printed and saved in 320000.txt")
print320000()