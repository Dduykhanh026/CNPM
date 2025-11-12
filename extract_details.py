
from docx import Document

TARGET_PREFIXES = ['6.1', '6.2', '6.3']

def is_section(text):
    text = text.strip()
    if not text:
        return False
    for prefix in TARGET_PREFIXES:
        if text.startswith(prefix + '.'):
            return True
    return False

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
