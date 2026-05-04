## 🍜 BeautifulSoup 常用方法

### 1️⃣ 创建/解析对象
```python
from bs4 import BeautifulSoup

soup = BeautifulSoup(html_string, 'html.parser')   # 用Python内置解析器
soup = BeautifulSoup(html_string, 'lxml')          # 需要安装lxml，速度更快
```

### 2️⃣ 查找单个元素
```python
soup.find(name, attrs, recursive, text)  # 返回第一个匹配的Tag
# 示例
soup.find('div')                         # 第一个<div>
soup.find('div', class_='title')         # 第一个class="title"的<div>
soup.find(id='main')                     # 第一个id="main"的元素
soup.find('a', href=True)                # 第一个有href属性的<a>
```

### 3️⃣ 查找多个元素
```python
soup.find_all(name, attrs, limit)        # 返回Tag列表
# 示例
soup.find_all('a')                       # 所有<a>
soup.find_all(['a', 'img'])              # 所有<a>和<img>
soup.find_all(class_='link')             # 所有class="link"的元素
soup.find_all(attrs={'data-type': 'video'})  # 属性匹配
soup.find_all(text=re.compile('新闻'))    # 文本包含“新闻”的标签
```

### 4️⃣ 获取标签内容/属性
```python
tag.name                               # 标签名，如 'div'
tag.text / tag.get_text()               # 标签内所有文本（含子标签）
tag.get_text(strip=True)                # 去掉首尾空白
tag['href']                             # 获取属性值（单个）
tag.attrs                               # 获取所有属性字典
tag.get('class', [])                    # 获取class，不存在返回默认值
```

### 5️⃣ 遍历/修改
```python
for child in tag.children:              # 直接子节点
for child in tag.descendants:           # 所有后代节点
tag.parent                              # 父节点
tag.next_sibling / tag.previous_sibling

# 修改（一般用于本地调试）
tag.string = '新文本'
tag['class'] = 'new-class'
```

### 6️⃣ 常用辅助
```python
soup.prettify()                         # 格式化输出HTML
soup.get_text()                         # 取所有纯文本
soup.select('div.title > a')            # CSS选择器（超方便）
# 示例
soup.select('.title')                   # class="title"
soup.select('#main')                    # id="main"
soup.select('a[href^="https"]')         # href以https开头的<a>
```

---

## 📁 csv 模块常用方法

### 1️⃣ 写入 CSV

#### 写入单行（列表）
```python
import csv

with open('out.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['姓名', '年龄'])     # 写入一行
    writer.writerow(['小明', 18])
```

#### 写入多行（列表套列表）
```python
rows = [['姓名', '年龄'], ['小红', 17], ['小刚', 19]]
with open('out.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerows(rows)
```

#### 写入字典（字段名作为表头）
```python
fieldnames = ['姓名', '年龄']
data = [{'姓名': '张三', '年龄': 20}, {'姓名': '李四', '年龄': 22}]
with open('out.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()                # 写入表头
    writer.writerows(data)              # 写入多行
```

### 2️⃣ 读取 CSV

#### 读取为列表（逐行）
```python
with open('out.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)                      # row 是一个列表
```

#### 读取为字典（第一行作为键）
```python
with open('out.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['姓名'])              # 通过列名访问
```

### 3️⃣ 常用参数
- `newline=''`：防止Windows下出现多余空行（必须）
- `encoding='utf-8-sig'`：让Excel打开不乱码
- `delimiter=','` 可以改成分隔符（默认逗号）
- `quoting=csv.QUOTE_ALL` 让所有字段都加引号

---

把这些方法收藏起来，写爬虫时随时查。你之前已经会抓网页了，现在用 `soup.find_all` 和 `csv.writerows` 就能把提取的数据存下来，形成一个完整的小项目。加油！🐍