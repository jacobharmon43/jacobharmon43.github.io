import pandas as pd
import matplotlib.pyplot as mpl

#x and y must be the same length
def covariance(x,y):
    xSum, ySum = 0,0
    length = len(y)
    for i in range(length):
        xSum += float(x[i])
        ySum += float(y[i])

    xAvg = xSum/length
    yAvg = ySum/length

    sumDiffProduct = 0
    for i in range(length):
        sumDiffProduct += (float(x[i]) - xAvg)*(float(y[i])-yAvg)
    return sumDiffProduct

def standardDeviation(x):
    xAvg = 0
    for value in x:
        xAvg += float(value)
    xAvg /= len(x)
    sumDiffAvgSquared = 0
    for value in x:
        sumDiffAvgSquared += (float(value) - xAvg)**2
    return sumDiffAvgSquared ** (1/2)

def corr(x,y):
    if(len(x) != len(y)):
        print("Invalid columns")
        return
    cov = covariance(x,y)
    xSDev = standardDeviation(x)
    ySDev = standardDeviation(y)
    corr = cov/(xSDev*ySDev)
    return corr

data = pd.read_csv('FinalWeatherData.csv')
tableNames = data.columns

f, ax = mpl.subplots()
ax.xaxis.set_major_locator(mpl.MaxNLocator(12))
mpl.xticks(rotation = 15, fontsize = 8)
mpl.xlabel('Date')
checkInterval = 50
length = len(data["Date"])

x = []
z = []
tab2 = "totalPrecipTmrw"
for i in range(0,length,checkInterval):
    x.append(data["Date"][i])
    z.append(data[tab2][i])

for name in tableNames:
    #Skip result and index column
    if name == "precipTmrw" or name == "Date":
        continue
    y = []
    tab1 = name
    #Grab data at interval
    for i in range(0,length,checkInterval):
        y.append(data[tab1][i])
    
    #plotting
    #mpl.plot(x, y, 'g', label = tab1)
    #mpl.plot(x, z, 'r--', label = tab2)
    #My correlation function
    correlation = corr(y,z)
    correlation -= correlation % 0.001
    print(tab1 + " correlation with " + tab2 + ": " + str(correlation))
    #mpl.legend(loc='best')
    #mpl.show()
