# -*- coding: utf-8 -*-
import sys
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

filepath = r"e:\ERA\AV간편개조\erAV_Ho_0.022(간편개조) - 복사본\CSV\Chara01_宮間かなで.csv"

with open(filepath, 'rb') as f:
    header = f.read(100)
    print("First 100 bytes (hex):")
    print(' '.join(f'{b:02x}' for b in header[:50]))
    print()
    print("BOM check:")
    if header[:2] == b'\xff\xfe':
        print("UTF-16 LE with BOM detected!")
        encoding = 'utf-16-le'
    elif header[:2] == b'\xfe\xff':
        print("UTF-16 BE with BOM detected!")
        encoding = 'utf-16-be'
    elif header[:3] == b'\xef\xbb\xbf':
        print("UTF-8 with BOM detected!")
        encoding = 'utf-8-sig'
    else:
        print("No BOM, trying shift-jis or utf-8")
        encoding = 'shift-jis'

print(f"\nTrying to read with {encoding}:")
print()

with open(filepath, 'r', encoding=encoding, errors='ignore') as f:
    for i, line in enumerate(f, 1):
        if i <= 60:
            print(f"{i:3d}: {line.rstrip()}")
        else:
            break
