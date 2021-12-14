import tokenize
import sys
from timeit import timeit


documento1 = sys.argv[1]
documento2 = sys.argv[2]
param = sys.argv[3]

chars = 15

#Palabras claves
keywords = ['and',	'del',	'for',	'is',	'raise',
'assert',	'elif',	'from',	'lambda',	'return',
'break',	'else',	'global',	'not',	'try',
'class',	'except',	'if',	'or',	'while',
'continue',	'exec',	'import',	'pass',	'with',
'def',	'finally',	'in',	'print',	'yield']

# 1. Tokenización

def tokenizacion(documento):
    lista = ""
    with tokenize.open(documento) as f:
        tokens = tokenize.generate_tokens(f.readline)
        for token in tokens:
            if(token.type == 1 or token.type == 54 or token.type == 3):
                    if(token.type == 1):
                        if token.string in keywords:
                            lista += str(1)
                        else:
                            lista += str(0)
                    elif(token.type == 54):
                        lista += str(2)
                    elif(token.type == 3):
                        lista += str(3)
    return lista

# 2. Comparación de tokens
# Representación de N-Grams

def n_gramas(lista,chars):
    ngrama = {}
    for i in range(len(lista)-chars):
        seq = lista[i:i+chars]
        if seq not in ngrama.keys():
            ngrama[seq] = []
        ngrama[seq].append(lista[i+chars])
    return ngrama

# 3. Coeficiente Jaccard

def jaccard(lista1, lista2):
    intersection = len(list(set(lista1).intersection(lista2)))
    union = len(list(set(lista1))) + len(list(set(lista2))) - intersection
    try: 
        return float(intersection) / union
    except:
        return 0

#DOCUMENTO 1
lista_1 = tokenizacion(documento1)
lista_2 = tokenizacion(documento2)
ngrams_1 = n_gramas(lista_1,chars)
ngrams_2 = n_gramas(lista_2,chars)
tiempo = timeit("'Hello, world!'.replace('Hello', 'Goodbye')")
if(param == 'csv'):
    print(str((round(jaccard(ngrams_1,ngrams_2),2)*100)))
else:
    print(str((round(jaccard(ngrams_1,ngrams_2),2)*100))  + ','+ str(round(tiempo,2)))

