#imports

import numpy as np
from astropy.time import Time

#Variables

k = 7 #BUSCAR: la fn para el tiempoque el sol esta afuera dada una fecha y una ubicacion. Agus dijo que la tenia o que buscara en 
# Horas donde el Sol está Afuera (Entre k y 25-k)
Hs = np.array(range(23))[k:25-k]
Nhoras = len(Hs)
Ndias = 365  # Cantidad de Días del Año a Plottear
Dias = np.linspace(0, 365, Ndias) #Crea un arreglo de 0 a 365


#Funcion para para al Altacim (Posicion del sol dada por la altura y el angulo con respecto al suelo)
for h in range(Nhoras):
    for d in range(Ndias):
        T0 = Time("2018-12-21 00:00")  # Solsticio de Invierno!
        T = T0 + int(Dias[d])*u.day + (Hs[h] - dT) * \
            u.h  # Suman las Horas y los Días
        # Función de Astropy que saca las Coordenadas Horizontales
        D = get_sun(T).transform_to(AltAz(location=Miami, obstime=T))
        Altacim[h, d, 0] = D.az.value
        Altacim[h, d, 1] = D.alt.value

        PointsTR[h, d], PointsXY[h, d] = Sombra(Altacim[h, d])

    HoraMinMaxXY[h] = minmax(PointsXY[h])
    HoraMinMaxTR[h] = minmax(PointsTR[h])
