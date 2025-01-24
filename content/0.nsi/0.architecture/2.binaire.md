---
title: Binaire/décimal
---

## Base 10
Tout le monde sait compter en base 10 (système décimal). Mais comment ça marche ?

::card
---
title: bon à savoir
icon: i-heroicons-light-bulb
---
En base 10, on utilise 10 chiffres : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
::
    

Avec ces 10 chiffres, on peut compter sans encombres de 0 à 9.  
Mais comment fait-on ensuite ? Le problème se pose lorsque le **rang des unités est plein**.  
Et bien, lorsqu'il est plein, on change de rang, et on passe au rang des dizaines, puis des centaines, milliers, etc.  

Ainsi, on compte jusqu'à 9, puis le rang est plein, on ajoute donc une unité au rang des dizaines, et on recommence... jusqu'à remplir le rang des dizaines. On commence alors à remplir les centaines, etc.

::imago{src="unidiz.png"}
Les valeurs entourées ont leurs rangs pleins
::

Ainsi, par exemple pour la valeur 29, on ne peut plus incrémenter le rang des unités, on incrémente donc le rang supérieur (les dizaines), et on remet les rangs inférieurs (unités) à 0.

::imago{src="unidiz2.png"}
::

Nous sommes ici en base 10, donc :
- une centaine est égale à 10 dizaines
- une dizaine est égale à 10 unités
- etc.

::card
---
title: à retenir
icon: i-heroicons-light-bulb
---
On peut donc décomposer en base 10 n'importe quel nombre :  
384 = 3 * 100 + 8 * 10 + 4 * 1  
384 = 3 * 10² + 8 * 10¹ + 4 * 10⁰
::

## Base 2
Un ordinateur est composé de circuits et de composants électroniques.  
Le plus simple, pour compter, est donc d'utiliser un système en base 2 qui pourra traduire deux états : 
> Présence de courant : état 1  
> Absence de courant : état 0

Si l'on veut appliquer la même logique que vue précédemment à la base 2, il suffira de transposer ces mêmes règles à un ensemble de valeurs de base composé de deux éléments : 0 et 1.  

::imago{src="binaire.png"}
::

::card
---
title: Décomposition en base 2
icon: i-heroicons-light-bulb
---
On décompose le nombre binaire pour obtenir sa valeur décimale :  
$(1101)_2 = (1 * 2³ + 1 * 2² + 0 * 2¹ + 1 * 2⁰)_{10}$  
$(1101)_2 = (2*2*2 + 2*2 + 0 + 1)_{10}$    
$(1101)_2 = (8 + 4 + 1)_{10}$    
$(1101)_2 = (13)_{10}$
::

La méthode permettant de convertir un nombre de la base 10 vers la base 2 est simple :  

1. la valeur décimale est divisée par 2, on conserve le quotient et le reste vaut 0 ou 1
2. le quotient de l'étape précédente est divisé par 2, on conserve le nouveau quotient et le reste vaut 0 ou 1  
3. on répète l'étape 2 jusqu'à obtenir un quotient égal à 0.  

::imago{src="decibin.png"}
::

## Base 16
Dans la vie courante, avec nos 10 doigts, la base 10 est toute indiquée.  
En informatique, au plus proche de la machine, tout est codé en base 2.  

Mais en informatique, comme tout est basé sur le binaire, il est plus facile d'encoder les informations dans une base qui serait un multiple de 2, on utilise donc très souvent la base 16.

| Nom         | Base | Unités                          |
| ----------- | ---- | ------------------------------- |
| décimal     | 10   | 0 1 2 3 4 5 6 7 8 9             |
| binaire     | 2    | 0 1                             |
| hexadécimal | 16   | 0 1 2 3 4 5 6 7 8 9 A B C D E F |

La méthode permettant de convertir un nombre de la base 2 vers la base 16 est simple :

1. On regroupe les bits 4 par 4 : avec 4 bits, on code au maximum 16 valeurs
2. Chaque paquet de 4 bits est converti dans sa valeur hexadécimale

Pour la conversion dans l'autre sens, c'est tout aussi simple :

1. Chaque valeur hexadécimale est convertie dans son équivalent en binaire

::imago{src="hexabin.png"}
::

On utilise le tableau de correspondances suivant :

| Binaire (base 2) | Décimal (base 10) | Hexadécimal (base 16) |
| ---------------- | ----------------- | --------------------- |
| 0000             | 0                 | 0                     |
| 0001             | 1                 | 1                     |
| 0010             | 2                 | 2                     |
| 0011             | 3                 | 3                     |
| 0100             | 4                 | 4                     |
| 0101             | 5                 | 5                     |
| 0110             | 6                 | 6                     |
| 0111             | 7                 | 7                     |
| 1000             | 8                 | 8                     |
| 1001             | 9                 | 9                     |
| 1010             | 10                | A                     |
| 1011             | 11                | B                     |
| 1100             | 12                | C                     |
| 1101             | 13                | D                     |
| 1110             | 14                | E                     |
| 1111             | 15                | F                     |