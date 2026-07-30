import os, glob

for f in glob.glob('**/*.html', recursive=True):
    with open(f, 'r') as file:
        content = file.read()
    with open(f, 'w') as file:
        file.write(content.replace('?v=5', '?v=6'))
print("Cache busted")
