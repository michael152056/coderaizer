# -*- coding: utf-8 -*-
"""Copia de Cosenos_Metodo.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1DWk3Ec3aR-OBfhwoLiubFUfMvPqHKxRN
"""

import tokenize
import sys
import math
from timeit import timeit

documento1 = sys.argv[1]
documento2 = sys.argv[2]
#Parámetro para ver si se ejecuta el método o se escribe en el CSV
param = sys.argv[3]


lista = [[],[]]
lista1 = [[],[]]

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
        if token.string in keywords:
            lista1[0].append(token.string)
        if token.string == '=':
            linea = token.line
            tamanio = len(token.line)
            if '.' in linea:
                identificador = linea.index('.')
                lista[0].append(linea[identificador:tamanio-2])
            else:
                identificador = linea.index('=')
                lista[0].append(linea[identificador:tamanio-2])
        if token.string == 'import':
            linea = token.line
            tamanio = len(token.line)
            identificador = token.end[1] + 1
            print(linea[identificador:tamanio])
            lista[0].append(linea[identificador:tamanio-2])

# 1.2 Tokenización (2Documento)
# Eliminación de comentarios
# Eliminación de espacios

with tokenize.open(documento2) as f:
    tokens = tokenize.generate_tokens(f.readline)
    for token in tokens:
        if token.string in keywords:
            lista1[1].append(token.string)
        if token.string == '=':
            linea = token.line
            tamanio = len(token.line)
            if '.' in linea:
                identificador = linea.index('.')
                lista[1].append(linea[identificador:tamanio-2])
            else:
                identificador = linea.index('=')
                lista[1].append(linea[identificador:tamanio-2])
        if token.string == 'import':
            linea = token.line
            tamanio = len(token.line)
            identificador = token.end[1] + 1
            lista[1].append(linea[identificador:tamanio-2])

print('Lista Limpia')
print('lista 1:','\n',lista[0])
print('lista 2:','\n',lista[1])
print('Lista de Sw')
print('lista 1:','\n',lista1[0])
print('lista 2:','\n',lista1[1])

#TF - Bag of words

def calculoFreq(lista_palabras):
  lista_frecuencias = []
  for i in lista_palabras[0]:
    if [i,lista_palabras[0].count(i),0] not in lista_frecuencias:
      lista_frecuencias.append([i,lista_palabras[0].count(i),0])

  for i in lista_palabras[1]:
    if [i,lista_palabras[0].count(i),0] in lista_frecuencias:
      indice = lista_frecuencias.index([i,lista_palabras[0].count(i),0])
      lista_frecuencias[indice][2] = lista_palabras[1].count(i)
    elif [i,lista_palabras[0].count(i),lista_palabras[1].count(i)] not in lista_frecuencias:
      lista_frecuencias.append([i,0,lista_palabras[1].count(i)])
  return lista_frecuencias


frecuencias = calculoFreq(lista)
frecuencias1 = calculoFreq(lista1)
#prueba

# frecuencia1 = []
# for i in lista_1:
#   if [i,lista_1.count(i)] not in frecuencia1:
#     frecuencia1.append([i,lista_1.count(i)])
# frecuencia2 = []
# for i in lista_2:
#   if [i,lista_2.count(i)] not in frecuencia2:
#     frecuencia2.append([i,lista_2.count(i)])

# print('Frecuencias de 1: ',frecuencia1)
# print('Frecuencias de 2: ',frecuencia2)
print('Frecuencias totales limpias: ',frecuencias)
print('Frecuencias totales SW: ',frecuencias1)

#fin prueba

#wTF

def wTF(lista_frecuencias):
  for word in lista_frecuencias:
    if word[1] !=0:
      word[1] = 1+math.log10(word[1])
    if word[2] != 0:
      word[2] = 1+math.log10(word[2])

#llamada
wTF(frecuencias)
wTF(frecuencias1)
print('Frecuencias totales limpias: ',frecuencias)
print('Frecuencias totales SW: ',frecuencias1)


#DF - Document Frecuency
def document_Frecuency(lista_frecuencias):
  lista_df = []
  for word in lista_frecuencias:
    if word[1] != 0 and word[2] != 0:
      lista_df.append(2)
    else:
      lista_df.append(1)
  return lista_df

df = document_Frecuency(frecuencias)
df1 = document_Frecuency(frecuencias1)

print('DF limpias: ',df)
print('DF SW: ',df1)

#wDF - IDF
def wDF_IDF(lista_df):
  n = 2
  wDF = []
  for frecuencia in lista_df:
    wDF.append(math.log10(n/frecuencia))
  return wDF

df = wDF_IDF(df)

df1 = wDF_IDF(df1)


print('wDF limpio: ',df)
print('wDF SW: ',df1)


#TF x IDF - wTF x IDF
def wTF_IDF(lista_frecuencias, lista_df):
  TFxIDF=[]
  for frecuencia in range(len(lista_frecuencias)):
    if lista_df[frecuencia] !=0:
      TFxIDF.append([lista_frecuencias[frecuencia][0],lista_frecuencias[frecuencia][1]*lista_df[frecuencia], lista_frecuencias[frecuencia][2]*lista_df[frecuencia]])
    elif lista_df[frecuencia] ==0:
      TFxIDF.append([lista_frecuencias[frecuencia][0],0,0])
  return TFxIDF

TFxIDF = wTF_IDF(frecuencias, df)
TFxIDF1 = wTF_IDF(frecuencias1, df1)
print('wTF x IDF limpio: ',TFxIDF)
print('wTF x IDF SW: ',TFxIDF1)

def normalizacion(lista_frecuencias):
  modulo1 = 0
  modulo2 = 0
  for word in lista_frecuencias:
    modulo1+=math.pow(word[1],2)
    modulo2+=math.pow(word[2],2)

  modulo1 =  math.sqrt(modulo1)
  modulo2 =  math.sqrt(modulo2)

  #normalizacion
  norm=[]

  for frecuencia in lista_frecuencias:
    if modulo1 == 0 or modulo2 == 0:
      if modulo1 == 0:
        norm.append([frecuencia[0], 0, frecuencia[2]/modulo2])
      if modulo2 == 0:
        norm.append([frecuencia[0], frecuencia[1]/modulo1, 0])
    else:
      norm.append([frecuencia[0], frecuencia[1]/modulo1, frecuencia[2]/modulo2])
  return norm

norm = normalizacion(frecuencias)
norm1 = normalizacion(frecuencias1)

print('Normalizados limpios: ',norm)
print('Normalizados SW: ',norm1)


def sacar_porcentaje(lista_norm, importancia):
  porcentaje = 0
  for item in lista_norm:
    porcentaje+=item[1]*item[2]
  porcentaje = round(porcentaje*importancia, 2)
  return porcentaje

porcentaje = sacar_porcentaje(normalizacion(frecuencias),0.9)
porcentaje1 = sacar_porcentaje(normalizacion(frecuencias1),0.1)
porcentaje_total = 0
if porcentaje == 0:
  porcentaje_total = round(porcentaje1 ,2)
elif porcentaje1 ==0:
  porcentaje_total = round(porcentaje,2) *100
else:
  porcentaje_total = round(porcentaje + porcentaje1 ,2) *100

tiempo = timeit("'Hello, world!'.replace('Hello', 'Goodbye')")

if(param == 'csv'):
  print(str(round(porcentaje_total,2)))
else:
  print(str(round(porcentaje_total,2)) + ',' + str(round(tiempo,2)))