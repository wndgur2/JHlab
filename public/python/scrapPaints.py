from selenium.webdriver import Chrome
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import urllib.request
import time
import os

def scrapData():
  TIMEOUT = 5

  optionDetatch = Options()
  optionDetatch.add_argument("start-maximized") #전체화면 옵션
  browser = Chrome(executable_path='/Users/leejunghyeok/CodeL/Web/JHlab/public/python/chromedriver', options=optionDetatch) #드라이버 객체 생성
  browser.implicitly_wait(TIMEOUT) #드라이버가 기다릴 기본 딜레이 1초

  # ---------------------------------- Instagram ---------------------------------- #
  start_url = "https://www.instagram.com/"
  browser.get(start_url)

  my_username = "jh_lab"
  my_password = "zhelddustmq"

  #로그인
  instargram_username = WebDriverWait(browser, TIMEOUT).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='username']")))
  instargram_password = WebDriverWait(browser, TIMEOUT).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='password']")))
  instargram_username.clear()
  instargram_password.clear()
  instargram_username.send_keys(my_username)
  instargram_password.send_keys(my_password)
  time.sleep(1)
  WebDriverWait(browser, TIMEOUT).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()

  #팝업 제거
  try:
    WebDriverWait(browser, TIMEOUT).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Not Now')]"))).click()
  except:
    try:
      WebDriverWait(browser, TIMEOUT).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '나중에 하기')]"))).click()
    except:
      pass
  time.sleep(1)
  try:
    WebDriverWait(browser, TIMEOUT).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Not Now')]"))).click()
  except:
    try:
      WebDriverWait(browser, TIMEOUT).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '나중에 하기')]"))).click()
    except:
      pass
  
  instargram_searchbox = WebDriverWait(browser, TIMEOUT).until(EC.element_to_be_clickable((By.XPATH, "//input[@placeholder='Search']")))
  instargram_searchbox.send_keys("whatnextartid")
  time.sleep(2)
  instargram_searchbox.send_keys(Keys.ENTER)
  time.sleep(1)
  instargram_searchbox.send_keys(Keys.ENTER)
  instargram_searchbox.send_keys(Keys.ENTER)

  #데이터 배열
  instagram_image_srcs = []
  
  #폴더 경로 생성
  data_path = os.path.join(os.getcwd(), "public/images/instagram")
  os.makedirs(data_path, exist_ok=True)

  #스크롤 다운
  for i in range(2):
    browser.execute_script('window.scrollTo(0, document.body.scrollHeight);')
    browser.execute_script('window.scrollTo(0, document.body.scrollHeight);')
    time.sleep(2)

  #이미지 수집
  instagram_images = browser.find_elements_by_xpath('//img')
  for image in instagram_images[1:]:
    try:
      image.find_element_by_xpath("./../../div[2]").click()
    except:
      break
    try:
      tempImage = browser.find_element_by_xpath('//article[@role="presentation"]/div/div/div/div/div/img')
    except:
      try:
        tempImage = browser.find_element_by_xpath('//article[@role="presentation"]/div/div/div/div/div[2]/div/div/div/ul/li/div/div/div/div/img')
      except:
        break
    tempSrc = tempImage.get_attribute('src')
    instagram_image_srcs.append(tempSrc)
    time.sleep(1.5)
    browser.find_element_by_xpath("(//button[@type='button'])[last()]").click()
  for src_n in range(len(instagram_image_srcs)):
    urllib.request.urlretrieve(instagram_image_srcs[src_n], data_path + "/instagram" + str(src_n) + ".jpg")
  
  print("INSTAGRAM : DATA SAVED!")

  browser.close()

scrapData()