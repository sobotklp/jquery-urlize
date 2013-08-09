#!/usr/bin/env python

tlds = []

with open('./tlds-alpha-by-domain.txt') as fd:
    for line in fd:
        if line.startswith("#"):
            continue
        if len(line) > 4:
            continue
        tlds.append(line.strip().lower())

# Sort the list by length order descending. When used in a regex, the longer ones will be tested first and consume more chars.
tlds.sort(key = lambda x: len(x), reverse=True)    
print '|'.join(tlds)
