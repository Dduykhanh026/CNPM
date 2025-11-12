
from docx import Document

doc = Document('KH33_SRS_-v3.0.docx')
collect = []
for para in doc.paragraphs:
    text = para.text.strip()
    if text.startswith('6.'):
        collect.append(text)

for t in collect[:200]:
    print(t)
