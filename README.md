# Dugges CRUD - API
### [Github Repo] (https://github.com/Browbeans/backend-lab)

Krav uppfyllda G och VG

Detta projekt innehåller ett API samt ett webgränssnitt så det lätt går att modifera API:et (CRUD). 
Det finns olika anrop man kan göra: 

GET html (därifrån man fetchar html innehållet) 
http://localhost/3000


GET hämtar samtliga produkter från JSON-filen (beer.json) men visar endast upp visa delar i gränssnittet
http://localhost/3000/api/product


GET specifikt hämtar endast ut en produkt baserat på ID, går att nå på två olika sätt i gränssnittet (klicka på en knapp när alla produkter visas man får då mer utförlig info om produkten) andra sättet är (sökning, man skriver in ID som sedan söker efter denna produkt syftet med detta är att utifall apiet skulle bli strörre (ca 1000 produkter) kan man lätt hämta ut den produkt via sökning om man skulle vilja ändra den eller ta bort den. 
http://localhost:3000/api/product/X   (X är det id du kan söka på byt ut mot en siffra och se vad som händer) 


POST lägger till en produkt i json filen och tar in en body med det innehåll man vill att den nya produkten ska bestå av 

PUT gör liknande som POST fast istället för att lägga till en ny produkt tar den även in en parameter i requesten som består av ett id den produkt id matchar med ändras

DELETE tar även in en parameter av ett ID som den matchar på och tar bort den den matchar på 


### Köra projektet

`npm install`
Körs för att få ned node_modules osv 

Därefter

`npm start`
Så är projektet igång, för att se ditt arbete i webläsaren går du in på 
http://localhost/3000
