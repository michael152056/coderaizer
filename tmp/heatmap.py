import sys 
import matplotlib
import pandas as pd
matplotlib.use('Agg') 
from pylab import * 
import re
import numpy as np

#Leer CSV auto-generado
l1Titulos = []
df = pd.read_csv("../../code/mapa.csv")

#Eliminar formato de archivo es decir ../temp/1546546546archivo.py transformando a archivo.py
for tokens in list(df):
    texto = re.split('/',tokens)
    l1Titulos.append(texto)

lToken = []
for i in l1Titulos:
    lToken.append(i[3])

lFinal = []
for i in list(lToken):
    lFinal.append(i[10:(len(i)-3)])

#Cantidad de gráficos en la ventana
fig, ax = plt.subplots(1,1)

#Impresión del gráfico
img = ax.imshow(df,cmap="Blues",aspect="auto")

#Impresión de etiquetas
y_label_list = lFinal
x_label_list = lFinal

ax.set_xticklabels(x_label_list)
ax.set_yticklabels(y_label_list)

#Posición de las etiquetas
ax.set_xticks(range(0,len(lFinal)))
ax.set_yticks(range(0,len(lFinal)))

for i in range(len(lFinal)):
    for j in range(len(lFinal)):
        text = ax.text(j, i, df.iloc[i][j],
                       ha="center", va="center", color="black")


#Título
ax.tick_params(top=True, bottom=False,
                   labeltop=True, labelbottom=False)


#Barra de colores lateral
colorbar(img)

#Enviar al PHP

savefig(sys.stdout,dpi=200, bbox_inches="tight")
