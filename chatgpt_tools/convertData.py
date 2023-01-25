import csv

# data.csv -> nazwa pliku
with open('data.csv', newline='') as csvfile:
    values_tmp = []
    reader = csv.DictReader(csvfile)
    for row in reader:
        values_tmp.append(row['Open'])

    values = []

    for val in reversed(values_tmp):
        values.append(val)

    input_template = "{\"prompt\": \"prompt_text\", \"completion\": \"ideal_generated_text\"}"
    data = []
    mod = 0
    current_prompt = []
    index = 0

    while True:
# 4 -> zakres outputu
        if index >= (len(values) - 4):
            break

        current_prompt.append(values[index])
#30 -> liczba wpisow w jednym prompcie
        if index != 0 and (index % (30 + mod)) == 0:
            prompt = ' '.join(current_prompt)
            generated_text = []
#4 - 1 = zakres outputu
            for x in range(index+1, index+4):
                generated_text.append(values[x])

            generated = ' '.join(generated_text)
            input = input_template.replace("prompt_text", prompt)
            input = input.replace("ideal_generated_text", generated)
            data.append(input)
            current_prompt.clear()
            generated_text.clear()
            mod += 1
            index = 0
            index += (mod - 1)
        index += 1

result = '\n'.join(data)

file = open('result.txt', 'w')
file.write(result)
file.close()
