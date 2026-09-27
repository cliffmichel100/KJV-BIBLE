import requests, json
print("Downloading full KJV 31,102 verses public domain...")
url = "https://raw.githubusercontent.com/scrollmapper/bible_databases_deprecated/master/formats/json/kjv.json"
data = requests.get(url).json()
BIBLE = {}
for row in data:
    b=row['b']; c=str(row['c']); v=str(row['v']); t=row['t']
    BIBLE.setdefault(b, {}).setdefault(c, {})[v]=t

with open('bible-kjv.js','w', encoding='utf-8') as f:
    f.write('const BIBLE = ')
    json.dump(BIBLE, f)
    f.write(';\n')
print(f"Done! Created bible-kjv.js with {len(BIBLE)} books and {len(data)} verses")
print("File ready to upload to GitHub root with your akosibiko footer")
