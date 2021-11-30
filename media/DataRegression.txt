import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

data = pd.read_csv('FinalWeatherData.csv')
tableNames = data.columns

def LeastSquared(x, y):
    xAvg = sum(x)/len(x)
    yAvg = sum(y)/len(y)

    coeff = sum((x-xAvg)*(y-yAvg))/sum((x-xAvg)**2)
    return coeff, yAvg-coeff*xAvg

def Predict(x, coeff, intercept):
    return sum(x*coeff) + intercept
        

def MeanAbsoluteError(x,y,m,b):
    s = 0
    newY = y.tolist()
    newX = x.tolist()
    length = len(newY)
    for i in range(length):
        s += abs(newY[i] - (newX[i]*m+b))
    s /= length
    return s

#Normalization Section
results = data["totalPrecipTmrw"]
trainLen = (int)(9*len(results)/10)
testlen = len(results)-trainLen
results = (results-min(results))/(max(results)-min(results))
trainResults = data["totalPrecipTmrw"][:trainLen]
testResults = data["totalPrecipTmrw"][trainLen:]
xData = data.drop(columns=["Date","totalPrecipTmrw"])
maxVals = xData.max()
minVals = xData.min()
xData = (xData-xData.min())/(xData.max()-xData.min())
trainData = xData[:trainLen]
testData = xData[trainLen:]

#Single variable accuracy testing
"""
for name in tableNames:
    print('\n')
    if(name == "Date" or name == "totalPrecipTmrw"):
        continue
    normalizedData = (data[name] - min(data[name]))/(max(data[name])-min(data[name]))
    trainData = data[name][:trainLen]
    testData = data[name][trainLen:]

    m,b = LeastSquared(trainData, trainResults)
    print("precipTmrw = " + str(m) + "* " + name + " + " + str(b))
    cost = sum((testResults-Predict(testData,m,b))**2)/(len(testResults))
    print("Cost: " + str(cost))
    resultsAvg = sum(testResults)/len(testResults)
    TSS = sum((testResults - resultsAvg)**2)
    RSS = sum((testResults-Predict(testData,m,b)**2))
    R2Error = (TSS-RSS)/TSS
    print("R2 Error = " + str(R2Error))
    print("Mean Absolute Error: " + str(MeanAbsoluteError(testData, testResults, m,b)))
    plt.scatter(trainData, trainResults)
    plt.plot(trainData, trainData*m, 'r--')
    plt.title("Single Variable Regression of: " + name + " vs totalPrecipTmrw")
    plt.show()
"""

#Full Linear regression
reg = LinearRegression().fit(trainData, trainResults)
pred = reg.predict(testData)
# The coefficients
print("Coefficients: \n", reg.coef_)
# The mean squared error
print("Mean squared error: %.2f" % mean_squared_error(testResults, pred))
# The coefficient of determination: 1 is perfect prediction
print("Coefficient of determination: %.2f" % r2_score(testResults, pred))

print("Results: ")
print(testResults.tolist()[:10])
print("Predictions: ")
preds = []
for val in pred:
    preds.append(round(float(val),2))
print(preds[:10])
print("Differences from reality: ")
diffs = pred-testResults.tolist()
diffs -= diffs%0.1
print(diffs[:10])
accuracy = sum(abs(diffs))/len(pred)
print("Average distance from reality: ")
print(accuracy)

todayData = [17,2,14.125, 23.5, 57, 18.75, 1018, 0.0]
todayData = (todayData - minVals)/(maxVals-minVals)
print(todayData)
print("Rain tomorrow: " + str(Predict(todayData, reg.coef_, 0)))
