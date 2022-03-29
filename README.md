# Monopoly za četo - Skavti Komenda
 
 Projekt za igro na skavtskem taboru 25-27.2.2022.
 
 Šlo je za igro, v kateri so po skupinicah hodili po Kamniku in "nakupovali" posesti.
 
 Ker sem stvar pripravljal cca. 1 teden pred dejansko igro (po uricah tu pa tam, faks ima le prednost), je njena funkcionalnost samo v prikazu trenutnega stanja za vsako skupino:
 - Katere posesti lahko v tem trenutnku obiščejo,
 - koliko denarja imajo on in drugi,
 - katere posesti imajo v lasti in koliko hiš na njih,
 - ...

Samo urejanje podatkov je izvajal moderator iz svoje strani, njemu pa so vodje skupin poslale sporočilo po drugem kanalu (discord), ko so želeli opraviti nakup, prenočitev, krajo...
 
 Stiska s časom je botrovala mnogim drugim neumnostim in slabim praksam: shranjevanje gesel za skupine v obliki čistega teksta, nerodni klici na API...
 Za večino stvari sem precenil, da bodo dovolj dobre za eno izvedbo s petimi skupinami - kar se je tudi zgodilo. Otroci so uživali in si bodo dogodek zapomnili.

## Testna uporaba
Spletna stran je postavljena na mestu: https://komenda-monopoly.herokuapp.com
1. Spletna stran je bila ustvarjena samo s telefoni v mislih -> otroci so bili na terenu. Najbolje da z orodji za razvijalce odprete v načinu za telefon.
2. Prijava:
   - Uporabniško ime: Pošasteki 
   - Geslo: Buuuu-tli!
3. Uporaba:
   - Prvi odsek so posesti, ki jih skupina v danem trenutku lahko obišče (drsamo v desno za pregled vseh).
   - Drugi odsek so denarna stanja vseh skupin in katere barve posesti imajo v lasti.
   - Tretji odsek je zdanjih 5 transakcij skupine.
   - Orodna vrstica kaže denarno stanje, če nanjo kliknemo se nam pa odpre meni s posestmi v lasti (drsamo v desno za pregled vseh).
