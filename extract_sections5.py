
from docx import Document

TARGET_PREFIX = '5.'

def is_section(text):
    text = text.strip()
    return text.startswith(TARGET_PREFIX)

sections = {}
current = None

doc = Document('KH33_SRS_-v3.0.docx')
for para in doc.paragraphs:
    text = para.text.strip()
    if not text:
        continue
    if is_section(text):
        current = text
        sections[current] = []
    elif current:
        sections[current].append(text)

for key in sorted(sections.keys()):
    print('='*80)
    print(key)
    for line in sections[key]:
        print('  ' + line)
