from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
from time import sleep
from datetime import datetime
import requests
import pandas as pd
import numpy as np
import time
import random



cookie= '''x-wl-uid=1gIJzK3ob9znN4x1aBBMZXMDb5Y5NSAV5EtljKOAqkgJ5ggTheHiJRX51hvKAVaeTNqOjJhKCbA0=; session-id=147-0412936-2984026; ubid-main=131-5601909-3137004; session-id-time=2082787201l; session-token="i/maF0ulOY1dClH++bonSg8Y+QYCTvdyQ6VlWBxFja7ZsWQ1RMf8wiqpjqyrzNA80fJKewRw2BnzGEv0Jv2QY6rNoYZsjudb8d+WuENROCCxJ67rE0lRg+9uxO6wqvC3IlVmwwmZ3A5JbnVfz9NaIHqQPR0qfdsOpEJUGgsByWJySnqHBTZFMXqpdto+NDQIvTGC6AHWaFHOZc5jeJNZnvDIVCTujIobxJn9Xy/MTVVCos6Q5MlQvw=="; i18n-prefs=USD; sp-cdn="L5Z9:NZ"'''
header = {
'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
'Connection': 'keep-alive',
'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
'Cookie': cookie}

df = pd.read_csv('./testForInput.csv')
item_ids = df['itemID'].unique()

# items_detail = pd.DataFrame(columns=("id", "item_name", "item_url"))

items_detail = pd.read_csv('items_detail_without_id.csv')


def get_items_name():
    print(111)
    url = "https://www.amazon.com/dp/"
    # for item_id in item_ids:
    for item_id in item_ids[:2]:
        item_url = url + str(item_id);
        print(item_url)
        html = requests.get(item_url, headers=header).text
        soup = BeautifulSoup(html, 'html.parser')
        title = soup.find("title")
        print(title.text)
        if (title.text != "Sorry! Something went wrong!"):
            item_name = title.text.split(":")[1].strip()
            print(item_name)
            items_detail = items_detail.append(
                pd.DataFrame({'id': [item_id], 'item_name': [item_name], 'item_url': [item_url]}), ignore_index=True)
        else:
            items_detail = items_detail.append(pd.DataFrame({'id': [item_name], 'item_name': ["None"], 'item_url': ["None"]}),
                                               ignore_index=True)
            err = err + 1

        time.sleep(random.randint(3, 7))

    # items_detail.to_csv('items_detail.csv', encoding='utf-8', index=False)
def get_items_detail():
    new_items_detail = pd.DataFrame(columns=("item_id", "item_name", "img_url"))

    for index, item in items_detail.iloc[:2].iterrows():
    # for index, item in items_detail.iloc[:3887].iterrows():
        if (len(item_ids) > index):
            item_id = item_ids[index]
            print(index, item_id, item['item_url'])
            html = requests.get(item['item_url'], headers=header).text
            soup = BeautifulSoup(html, 'html.parser')
            if (soup.find("img", class_="aligncenter") == None):
                img = "None"
            else:
                img = soup.find("img", class_="aligncenter")['src']

            new_items_detail = new_items_detail.append(pd.DataFrame({'item_id': [item_id],
                                                                     'item_name': [item['item_name']], 'img_url': [img]
                                                                     }), ignore_index=True)

    print(new_items_detail.shape)
    print(new_items_detail.head())
    new_items_detail.to_csv('items_detail_test_demo.csv', encoding='utf-8', index=False)


def get_tiems_name2():
    url = "https://igg-games.com/list-215968962-game.html"
    html = requests.get(url, headers=header).text
    soup = BeautifulSoup(html, 'html.parser')
    a_list = soup.find("div",attrs={"property":"text"}).find_all("a", attrs={"rel": "noopener noreferrer"})
    items_detail = pd.DataFrame(columns=("id", "item_name", "item_url"))

    for a in a_list:
        print(a.text)
        item_name = a.text
        item_url = a['href']
        print(a['href'])
        items_detail = items_detail.append(pd.DataFrame({'item_name': [item_name], 'item_url': [item_url]}),
                                           ignore_index=True)
    items_detail.to_csv('items_detail_without_id.csv', encoding='utf-8', index=False)
def get_items_detail2():
    items_detail = pd.read_csv('items_detail_without_id.csv')
    new_items_detail = pd.DataFrame(columns=("item_id", "item_name", "img_url"))

    for index, item in items_detail.iloc[:3887].iterrows():
        if (len(item_ids) > index):
            item_id = item_ids[index]
            print(index, item_id, item['item_url'])
            html = requests.get(item['item_url'], headers=header).text
            soup = BeautifulSoup(html, 'html.parser')
            if (soup.find("img", class_="aligncenter") == None):
                img = "None"
            else:
                img = soup.find("img", class_="aligncenter")['src']

            new_items_detail = new_items_detail.append(pd.DataFrame({'item_id': [item_id],
                                                                     'item_name': [item['item_name']], 'img_url': [img]
                                                                     }), ignore_index=True)

    print(new_items_detail.shape)
    print(new_items_detail.head())
    new_items_detail.to_csv('items_detail_test.csv', encoding='utf-8', index=False)

if __name__ == '__main__':
    get_tiems_name2()
    get_items_detail2()


