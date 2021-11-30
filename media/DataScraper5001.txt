import selenium.webdriver as webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup as BS
import re

chrome = webdriver.Chrome()
monthLengths = [31,28,31,30,31,30,31,31,30,31,30,31

def returnNumb(s):
    if(len(re.findall('-',s)) >= 1):
        return 0-int(re.findall('\d+', s )[0])
    return int(re.findall('\d+', s )[0])

with open('TestFile.txt', 'a') as f:
    initialYear = 2009
    initialMonth = 1
    initialDay = 1
    maxDay = 31
    url = "https://www.worldweatheronline.com/rolla-weather-history/missouri/us.aspx"
    chrome.get(url)
    for k in range(initialYear, 2021):
        for j in range(initialMonth, 13):
            #Formatting for inputting into the form
            month = str(j) 
            if(j < 10):
                month = "0" + str(j)
            #Month lengths and leap year logic
            maxDay = monthLengths[j-1]
            if(j == 2 and k % 4 == 0):
                maxDay = 29
            
            for i in range(initialDay, maxDay+1):
                #Formatting the day to input into the form
                day = str(i)
                if(i < 10):
                    day = "0" + str(i)
                #Final input formatting
                date = month + "-" + day + "-" + str(k)
                #Wait for the form to load
                elem = WebDriverWait(chrome, 30).until(
                    EC.presence_of_element_located((By.ID, "ctl00_MainContentHolder_butShowPastWeather"))
                )
                #Find the form elements, input and send
                chrome.find_element(By.ID, "ctl00_MainContentHolder_txtPastDate").send_keys(date)
                chrome.find_element(By.ID, "ctl00_MainContentHolder_butShowPastWeather").click()
                #Read the page
                soup = BS(chrome.page_source, "html.parser")
        

                #Read the first table card
                header = soup.find("div", {"class": "card-header"})
                subtable = header.find("div", {"class": "row"})
                stats = subtable.find_all("div", {"class": "col"})
                
                #High temp
                HighTemp = stats[0].text
                HighTemp = returnNumb(HighTemp)
                
                #Low Temp
                LowTemp = stats[1].text
                LowTemp = returnNumb(LowTemp)

                #Reading the first table body
                header = soup.find("div", {"class" : "card-body"})
                subtable = header.find("div", {"class": "row text-center"})

                #Rain Results
                data = subtable.find_all("div", {"class" : "col mr-1"})
                avgPrecip = 0
                counter = 0
                for value in data:
                    if(counter == 3):
                        avgPrecip += returnNumb(value.text)
                    counter += 1
                    if(counter == 4):
                        counter = 0
                avgPrecip /= 8

                #Pressure Results
                data = subtable.find_all("div", {"class" : "col mr-1 d-none d-md-block"})
                avgPressure = 0
                for value in data:
                    avgPressure += returnNumb(value.text)
                avgPressure /= 8
        
                #Humidity, Wind, Gust, Cloud are all one element type
                header = soup.find("div", {"class" : "card-body"})
                subtable = header.find("div", {"class": "row text-center"})
                data = subtable.find_all("div", {"class" : "col mr-1 d-none d-sm-block"})
                avgCloud = 0
                avgHumidity = 0
                avgWind = 0
                avgGust = 0
                countLoop = 0
                #This is just the only way I could find to easily parse data of the exact same class, by just counting and maintaining an order
                for i in range(len(data)):
                    if(countLoop == 4):
                        avgCloud += returnNumb(data[i].text)
                    elif(countLoop == 3):
                        avgHumidity += returnNumb(data[i].text)
                    elif(countLoop == 2):
                        avgGust += returnNumb(data[i].text)
                    elif(countLoop == 1):
                        avgWind += returnNumb(data[i].text)
                    countLoop += 1
                    if(countLoop == 5):
                        countLoop = 0
                # 8 just happens to be the length of the table, I could also have done math to get this
                avgWind /= 8
                avgGust /= 8
                avgCloud /= 8
                avgHumidity /= 8
                dataStr = str(date)+','+str(HighTemp)+','+str(LowTemp)+','+str(avgWind)+','
                        +str(avgGust)+','+str(avgHumidity)+','+str(avgCloud)+','+str(avgPressure)+','+str(avgPrecip)+'\n'
                print(dataStr)
                #Format to a comma separated values text
                f.write(dataStr)
    f.close()
    chrome.close()
                
    
        
                          





