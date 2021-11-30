from csv import reader

with open('WeatherData.csv', 'r') as n:
    with open('WeatherData.txt', 'w') as f:
        r = reader(n)
        header = next(r)
        s = ""
        for item in header:
            s += item + ','
        s += "precipTmrw" + '\n'
        f.write(s)
        header = next(r)
        while(header!=None):
            s = ""
            for item in header:
                s += item + ','
            header = next(r)
            if(header):
                s += header[8] + '\n'
            print(s)
            f.write(s)
            
