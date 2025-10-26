---
layout: /src/layouts/MarkdownPostLayout.astro
title: Retour d'expérience d'incident avec Stream For Humanity
author: Pierre-Louis Leclerc | Proxyfil
description: "Tout ne se passe pas toujours comme prévu. En travaillant sur Stream For Humanity avec Tungstene, j'ai été ciblé par une attaque DDOS et j'ai appris à la dure comment gérer ce type d'attaque... Partageons les leçons que j'en ai tirées."
image:
  url: "/images/posts/retex-sfh.webp"
  alt: "Illustration de Stream For Humanity avec le titre de l'article de blog"
pubDate: 2025-01-20
tags:
  [
    "Retex", "System", "Twitch", "Network"
   
  ]
languages: ["vue", "kubernetes", "cloudflare"]
---

Parfois on a des plans mais l'univers en a d'autres pour nous... Je m'en suis rendu compte ce mois-ci car j'ai été attaqué sur mon système. Pour être honnête, c'était un peu de ma faute et même si ce n'était pas un gros problème, j'ai dû trouver comment le gérer.

Plongeons dans le problème !

## ❓ Rapport d'incident : Attaque par déni de service distribué (DDoS)

### 1. Résumé de l'incident

Résumons le contexte de cette attaque :

Le **17 janvier 2025**, une attaque par déni de service distribué (DDoS) a été détectée sur l'infrastructure fournie par l'école. L'attaque a commencé à 22h30 (UTC+1) et s'est poursuivie jusqu'à 23h08 (UTC+1), affectant les services déployés pour l'événement "Stream For Humanity", ainsi que les performances de mon serveur et du service SSH dessus. Tout le trafic acheminé via un proxy Cloudflare a été redirigé vers le réseau DO de l'Université de Montpellier, ciblant le serveur "Antlia".

Cette attaque a utilisé des techniques avancées, notamment des **attaques au niveau de la couche application**, et a principalement ciblé les services d'API web déployés sur la lame serveur. Les mesures d'atténuation ont permis de restaurer les services essentiels en 20 minutes.

---

### 2. Comment je l'ai détectée et comment j'ai répondu initialement

L'attaque a été détectée via les outils de surveillance du serveur et les alertes Cloudflare. Les anomalies initiales comprenaient une augmentation de l'utilisation du CPU et une hausse significative de la latence réseau.
C'était inhabituel pour un tel service lors d'un tel événement et même si j'avais déployé quelque chose d'un peu nouveau sur mon infrastructure, j'ai rapidement réalisé que quelque chose n'allait pas...
  
Les actions suivantes ont été prises rapidement :

- **Blocage** des adresses IP malveillantes identifiées  
- Activation des **règles d'urgence** sur le pare-feu d'applications web (WAF)  
- Déploiement d'**applications supplémentaires** pour absorber le trafic  

---

### 3. Analyse de l'attaque

Par la suite, j'ai pris le temps d'analyser l'attaque, d'identifier le problème principal et comment il a été exploité pour causer de tels dégâts.

L'analyse a révélé le vecteur suivant :

- **Attaque au niveau de la couche application :** Requêtes HTTP GET massives ciblant "sfh.proxyfil.fr/api/pools/streamers" (et par extension le domaine antlia.dopolytech.fr/api/pools/streamers)

On peut noter quelques caractéristiques sur certains aspects techniques de l'attaque :

- **Volume total :** ~200 000 requêtes par minute, environ ~3 000 requêtes par seconde (RPS), avec un pic à 4,73 millions de requêtes par minute atténuées par le WAF de Cloudflare à 22h52  
- **Sources de l'attaque :** Un grand nombre d'adresses IP provenant de nombreux pays, principalement l'Indonésie (7,5 millions), les USA (3,74 millions), l'Inde (1,6 million), le Brésil (1,36 million), la Turquie (1,3 million) et la Chine (volume inconnu)  
- **Outils utilisés par les attaquants :** Probablement des botnets  

Une analyse géographique a montré une concentration d'attaquants en Asie et dans les Amériques.

**Volume total de l'attaque :**

- **8 Go** de données ont été servis par le serveur pendant l'attaque, **161,92 Go** ont été servis par le cache de Cloudflare  
- **5 millions de requêtes** ont été servies par le serveur, **25 millions** ont été mises en cache ou bloquées par Cloudflare  
- **5 pays** représentaient plus de la moitié des requêtes traitées par le serveur  
- Sur les **30 millions de requêtes enregistrées** pendant l'attaque, environ **27 millions** se sont terminées sans réponse en raison de la surcharge du serveur ou de la réponse du WAF  
- L'utilisation du CPU sur la lame serveur a atteint **90 %** pendant l'attaque, l'utilisation de la RAM a augmenté de **6 Go** 

---

### 4. Impacts sur les services

**Services impactés :**

- Services sur le serveur Antlia : Performances fortement dégradées pendant plusieurs minutes
- Lame serveur Antlia : Performances fortement dégradées pendant plusieurs minutes  
- Services API et Frontend : Performances fortement dégradées pendant quelques minutes  

---

### 5. Actions correctives immédiates

Les actions suivantes ont été prises pour restaurer les opérations :

- Déploiement d'un WAF via Cloudflare pour bloquer les requêtes illégitimes  
- Augmentation de la disponibilité des services pour absorber le trafic  
- Surveillance renforcée des systèmes pendant les heures suivantes  

---

### 6. Conclusion

Cet incident met en évidence la nécessité d'une vigilance accrue face aux menaces DDoS, qui deviennent de plus en plus sophistiquées. Bien que les mesures existantes aient contribué à limiter l'impact, l'amélioration continue des outils et des processus de sécurité est essentielle pour garantir la disponibilité des services.

Les leçons tirées de cet incident éclaireront les futures stratégies de sécurité, garantissant une réponse rapide et efficace aux futures attaques, et servant d'avertissement aux autres étudiants qui prévoient de déployer de tels services sur l'infrastructure DO.

---

### 7. Chronologie de l'attaque

**22h30 :** Début de l'attaque DDoS  
**22h36 :** Déconnexion du VPN Polytech  
**22h37 :** Enquête auprès des pairs ; le site web est inaccessible  
**22h39 :** Alerte d'utilisation du CPU pour le serveur Antlia  
**22h40 :** VPN restauré  
**22h41 :** Déploiement de 2 nouveaux services pour absorber le trafic  
**22h43 :** WAF déployé pour bloquer les 3 principaux pays attaquants  
**22h46 :** Blocage de 4 pays attaquants supplémentaires  
**22h49 :** Première offensive terminée  
**22h51 :** Début de la deuxième offensive, entièrement atténuée par le WAF de Cloudflare  
**22h52 :** Pic d'attaque, 4,73 millions de requêtes atténuées. Infrastructure DO/Polytech/UM épargnée  
**23h01 :** Retour au service normal, confirmé par les métriques du serveur Antlia  
**23h08 :** Fin de l'attaque DDoS

---

### 8. Annexes

Pays d'origine des attaques (Top 5 des attaquants) :

![country_details.webp](/images/posts/retex-sfh/country_details.webp)

Volume de l'attaque :

![total_traffic.webp](/images/posts/retex-sfh/total_traffic.webp)

Statistiques de l'attaque :

![sources_traffic.webp](/images/posts/retex-sfh/sources_traffic.webp)

Cartographie de l'attaque :

![map.webp](/images/posts/retex-sfh/map.webp)

Volume de l'attaque :

![cached_requests.webp](/images/posts/retex-sfh/cached_requests.webp)

Volume de données de l'attaque :

![cached_bandwidth.webp](/images/posts/retex-sfh/cached_bandwidth.webp)

Utilisation du CPU pendant l'attaque :

![cpu_usage.webp](/images/posts/retex-sfh/cpu_usage.webp)

Utilisation de la RAM pendant l'attaque :

![ram_usage.webp](/images/posts/retex-sfh/ram_usage.webp)


## 💚 Conclusion

Cette expérience a été vraiment utile pour moi car j'ai beaucoup appris sur la sécurisation des services. C'était la première fois que j'étais vraiment attaqué et je suis sûr que la prochaine fois, je m'assurerai d'avoir des protections pour me défendre contre de telles méthodes d'attaque sournoises.

J'espère que cet article vous a été utile, à bientôt...