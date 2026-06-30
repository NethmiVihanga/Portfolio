import pymupdf

pdf_files = [
    "Nethmi vihanga [ALML Stage 01].pdf",
    "Nethmi vihanga [ALML Stage 02].pdf",
    "Python_for_Beginners_E-Certificate.pdf"
]

for pdf in pdf_files:
    print(f"Converting {pdf}")
    doc = pymupdf.open(pdf)
    page = doc.load_page(0)  # load first page
    pix = page.get_pixmap(dpi=150)
    img_name = pdf.replace(".pdf", ".png")
    pix.save(img_name)
    print(f"Saved {img_name}")
