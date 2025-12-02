# odp_E02_tim_54
Zadatak je bio napraviti neki vid messengera, tacan tekst je u pdf-u.

Radjeno u node.js, sa react i vite dodacima.
Pri prvom pokretanju treba duze da se ucitaju same poruke zbog bootleg nacina na koji sam stavio real-time slanje i primanje poruka, da sam imao vise vremena pokusao bih da nadjem elegantnije resenje. Koriscena je asinhrona funkcija koja se posebno pokrene da svakih x ms trazi od servera da posalje poruke i automatski resetuje izgled stranice. Pored ovoga ima i realtime naznaka da je stigla poruka.
Koriscene protected rute, i dodata 404 stranica.
Svi podaci su cuvaju u MySQL bazi podataka, nesifrovani, osim same lozinke koja prolazi kroz cryptovanje pre slanja u bazu. ID nije GUID zbog jednostavnosti.
Koriscen typescript.
