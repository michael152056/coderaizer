import tokenize
import io
import sys
from timeit import timeit

documento1 = sys.argv[1]
documento2 = sys.argv[2]
param = sys.argv[3]

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
PalabrasClave = []
Variables = []
Operaciones = []
Strings = []
PalabrasClave2 = []
Variables2 = []
Operaciones2 = []
Strings2 = []
def Tok(documento,num, keywords):     
    # Eliminación de comentarios
    # Eliminación de espacios
    documento = documento.replace('def','\tdef')
    List = []
    with tokenize.open(documento) as f:
        tokens = tokenize.generate_tokens(f.readline)
        for token in tokens:
            if(token.type == 1 or token.type == 54 or token.type == 3):
                if(token.type == 1 and token.string in keywords):
                        List.append(token.string)
                elif(token.type == 1):
                    List.append(token.string)
                elif(token.type == 54):
                    List.append(token.string)
                elif(token.type == 3):
                    List.append(token.string)
        return List
PalabrasClave = Tok(documento1,1,keywords)
Variables = Tok(documento1,0,keywords)
Operaciones = Tok(documento1,54,keywords)
Strings = Tok(documento1,3,keywords)
PalabrasClave2 = Tok(documento2,1,keywords)
Variables2 = Tok(documento2,0,keywords)
Operaciones2 = Tok(documento2,54,keywords)
Strings2 = Tok(documento2,3,keywords)
#Similitud Semantica
Code1 = []
Code2 = []
def Calcularsimilitud(Lista1, Lista2):
    similitud = 0
    cont = 0
    for word in Lista1:
        if word in Lista2:
            try:
                Lista2.remove(word)
                cont = cont+1
            except:
                ndx = -1          
    similitud = round(cont/len(Lista1),2)
    return similitud

Code2.append(Calcularsimilitud(PalabrasClave,PalabrasClave2))
Code2.append(Calcularsimilitud(Variables,Variables2))
Code2.append(Calcularsimilitud(Operaciones,Operaciones2))
Code2.append(Calcularsimilitud(Strings,Strings2))
PalabrasClave2 = Tok(documento2,1,keywords)
Variables2 = Tok(documento2,1,keywords)
Operaciones2 = Tok(documento2,54,keywords)
Strings2 = Tok(documento2,3,keywords)
#Similitud Semantica
Code1.append(Calcularsimilitud(Strings2,Strings))
Code1.append(Calcularsimilitud(Operaciones2,Operaciones))
Code1.append(Calcularsimilitud(Variables2,Variables))
Code1.append(Calcularsimilitud(PalabrasClave2,PalabrasClave))
Code2.append(round((sum(Code2)/len(Code2)),2))
Code1.append(round((sum(Code1)/len(Code1)),2))

similitud1 = round((Code1.pop() * 100),2)
similitud2 = round((Code2.pop() * 100),2)
similitud_promedio = (similitud1+similitud2)/2
tiempo = timeit("'Hello, world!'.replace('Hello', 'Goodbye')")

if(param == 'csv'):
    print(str(round(similitud_promedio,2)))
else:
    print(str(similitud1) + ',' + str(similitud2) + ',' + str(round(tiempo,2)))


