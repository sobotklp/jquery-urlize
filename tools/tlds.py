#!/usr/bin/env python

tlds = []

with open('./tlds-alpha-by-domain.txt') as fd:
    for line in fd:
        if line.startswith("#"):
            continue
        if len(line) > 4:
            continue
        tlds.append(line.strip().lower())
    
print '|'.join(tlds)
