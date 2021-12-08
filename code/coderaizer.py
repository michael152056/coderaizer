import tokenize
import io
import sys

documento1 = sys.argv[1]
documento2 = sys.argv[2]

lista_1 = ""
lista_2 = ""

keywords = ['and',	'del',	'for',	'is',	'raise',
'assert',	'elif',	'from',	'lambda',	'return',
'break',	'else',	'global',	'not',	'try',
'class',	'except',	'if',	'or',	'while',
'continue',	'exec',	'import',	'pass',	'with',
'def',	'finally',	'in',	'print',	'yield']

# 1. Tokenización (1Documento)
# Eliminación de comentarios
# Eliminación de espacios

with tokenize.open(documento1) as f:
    tokens = tokenize.generate_tokens(f.readline)
    for token in tokens:
        if(token.type == 1 or token.type == 54 or token.type == 3):
                if(token.type == 1):
                    if token.string in keywords:
                        lista_1 += str(1)
                    else:
                        lista_1 += str(0)
                elif(token.type == 54):
                    lista_1 += str(2)
                elif(token.type == 3):
                    lista_1 += str(3)

# 1.2 Tokenización (2Documento)
# Eliminación de comentarios
# Eliminación de espacios

with tokenize.open(documento2) as f:
    tokens = tokenize.generate_tokens(f.readline)
    for token in tokens:
        if(token.type == 1 or token.type == 54 or token.type == 3):
                if(token.type == 1):
                    if token.string in keywords:
                        lista_2 += str(1)
                    else:
                        lista_2 += str(0)
                elif(token.type == 54):
                    lista_2 += str(2)
                elif(token.type == 3):
                    lista_2 += str(3)

# 2. Comparación de tokens
# Representación de N-Grams
ngrams_1 = {}
ngrams_2 = {}
chars = 15

for i in range(len(lista_1)-chars):
    seq = lista_1[i:i+chars]
    if seq not in ngrams_1.keys():
        ngrams_1[seq] = []
    ngrams_1[seq].append(lista_1[i+chars])

for i in range(len(lista_2)-chars):
    seq = lista_2[i:i+chars]
    if seq not in ngrams_2.keys():
        ngrams_2[seq] = []
    ngrams_2[seq].append(lista_2[i+chars])

# 3. Comparación de tokens
# Representación de N-Grams

def jaccard(lista1, lista2):
    intersection = len(list(set(lista1).intersection(lista2)))
    union = len(list(set(lista1))) + len(list(set(lista2))) - intersection
    try: 
        return float(intersection) / union
    except:
        return 0
         
   
print(ngrams_1)

print((round(jaccard(ngrams_1,ngrams_2),2)*100))