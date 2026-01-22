# -*- coding: utf-8 -*-
import sys
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

filepath = r"e:\ERA\AV간편개조\erAV_Ho_0.022(간편개조) - 복사본\CSV\Chara01_宮間かなで.csv"

with open(filepath, 'r', encoding='shift-jis') as f:
    for i, line in enumerate(f, 1):
        if i <= 60:
            print(f"{i:3d}: {line.rstrip()}")
        else:
            break
