from random import randrange

import pandas as pd
import matplotlib.pyplot as plt
import csv


with open('data.csv', newline='') as csvfile:
    real_values = []
    reader = csv.DictReader(csvfile)
    limit = 0

    for row in reader:
        if limit == 200:
            break
        real_values.append(float(row['Open']))
        limit += 1

    print(real_values)
    df = pd.DataFrame()
    df['Real open values'] = real_values

    generated_values = []
    for val in real_values:
        r = randrange(-1000, 1000)
        generated_values.append(val + r)

    df['Generated open values'] = generated_values

    difference = []
    for r, g in zip(real_values, generated_values):
        diff = abs(r - g)
        if r != 0:
            f = (diff/r)*100
        else:
            f = 0
        difference.append(f)

    df.plot()
    df1 = pd.DataFrame()
    df1['Diff %'] = difference
    df1.plot()
    plt.show()





