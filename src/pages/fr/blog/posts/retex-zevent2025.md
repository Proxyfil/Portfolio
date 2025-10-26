---
layout: /src/layouts/MarkdownPostLayout.astro
title: Anti-DDOS, Rust et apprendre de ses erreurs
author: Pierre-Louis Leclerc | Proxyfil
description: "Depuis maintenant 4 ans, je collecte des statistiques autour de l'événement caritatif 'ZEvent'. Et même si j'ai l'habitude, il y a toujours de nombreux problèmes auxquels je dois faire face quand on travaille à cette échelle ! Parlons un peu des problèmes autour des événements caritatifs et des mauvais choix techniques."
image:
  url: "/images/posts/retex-zevent2025.webp"
  alt: "Illustration du ZEvent2025 avec le titre de l'article de blog"
pubDate: 2025-09-17
tags:
  [
    "Retex", "System", "Twitch", "Rust"
   
  ]
languages: ["vue", "kubernetes", "cloudflare"]
---

Depuis 2020, je fais du travail communautaire autour du ZEvent. Cet événement est le plus grand événement caritatif français hébergé sur Twitch, avec plus de 16 000 000€ collectés en 2025, c'est la plus importante collecte de fonds avec des streamers chaque année.

Chaque année, il y a plus de personnes qui essaient de participer, plus de POV à suivre, plus d'objectifs de dons à voir et un spectateur moyen peut rapidement être submergé par toutes ces informations.
Depuis 5 ans maintenant, je travaille avec un groupe de personnes pour donner aux spectateurs des outils et des métriques pour mieux suivre et comprendre cet événement en temps réel ou après l'événement.

Parlons un peu de mon travail et de ce qui rend cette année spéciale !

## 📱 Travail habituel


### 📜 Liste des objectifs de dons

Depuis 2020, nous travaillons ensemble avec [l'équipe](https://gdoc.fr/team) pour donner à tout le monde un endroit avec tous les objectifs de dons.
Les objectifs de dons sont des objectifs avec des montants en euros, chaque streamer a les siens pour les dons qu'il collecte.

En 2021, il y avait 49 streamers ensemble pendant ~54 heures, collectant tous ensemble plus de 10 000 000€ pour la première fois.
Cette année, environ 800 objectifs de dons ont été créés et 682 atteints, bien plus qu'un spectateur moyen ne peut suivre.

<blockquote class="twitter-tweet" data-theme=dark><p lang="fr" dir="ltr">10 millions d&#39;euros récoltés pour <a href="https://twitter.com/ACF_France?ref_src=twsrc%5Etfw">@ACF_France</a> c&#39;est historique !! Mais est-ce que vous vous rendez vraiment compte de ce que ça représente dans le combat contre la faim ? Comme à chaque fois on vous a préparé des statistiques sur ce week end. Merci à vous 💚<a href="https://twitter.com/hashtag/ZEVENT2021?src=hash&amp;ref_src=twsrc%5Etfw">#ZEVENT2021</a> <a href="https://t.co/ytqNuOEavy">pic.twitter.com/ytqNuOEavy</a></p>&mdash; Les Ingés du GDoc (@Les_InGdoc) <a href="https://twitter.com/Les_InGdoc/status/1455123032243150859?ref_src=twsrc%5Etfw">November 1, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


### 📊 Statistiques

Depuis 2021, nous créons des infographies et des visuels avec de nombreuses données autour du ZEvent et des métriques Twitch.

Les données peuvent concerner le temps de stream, le temps visionné, le nombre d'emotes ou de messages envoyés.
Tout est collecté via l'API officielle de Twitch dans postgresql, derrière tout ça nous avons des scripts NodeJS et Python pour faire tout le travail.
Chaque visuel est planifié avant l'événement sur Figma (c'est merveilleux).

Voici un exemple de ce que nous avons conçu pour 2025 :

<blockquote class="twitter-tweet" data-theme=dark><p lang="fr" dir="ltr">Écrire autant de donation goals c&#39;est une chose, en atteindre 86% c&#39;est un évènement !<br>Grâce à vous ce sont 16 MILLIONS d&#39;euros qui ont été bombardés dans les cagnottes de ce <a href="https://twitter.com/hashtag/ZEVENT?src=hash&amp;ref_src=twsrc%5Etfw">#ZEVENT</a> 💚<br>Retrouvez les stats individuelles des streamers sur <a href="https://t.co/GZ0dDeqq7B">https://t.co/GZ0dDeqq7B</a><br><br>⬇️<a href="https://twitter.com/hashtag/ZEVENT2025?src=hash&amp;ref_src=twsrc%5Etfw">#ZEVENT2025</a>⬇️ <a href="https://t.co/COKlEtpRim">pic.twitter.com/COKlEtpRim</a></p>&mdash; Les Ingés du GDoc (@Les_InGdoc) <a href="https://twitter.com/Les_InGdoc/status/1965026651357786281?ref_src=twsrc%5Etfw">September 8, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Au fil des années, nous avons augmenté nos capacités. Aujourd'hui, nous pouvons gérer jusqu'à 350 chaînes en même temps avec génération de métriques en temps réel.
L'événement se termine le lundi à 1h du matin chaque année, environ 5 heures plus tard, nous avons tous nos visuels prêts.

Depuis 2 ans maintenant, nous générons également des infographies personnalisées pour chaque streamer, cette année ce sont environ ~350 visuels qui ont été générés automatiquement.
Cette année, tout est disponible [ici](https://stats.gdoc.fr/)

### 🖼️ Place Atlas

Depuis 2022, l'organisation du ZEvent propose 2 jeux disponibles pour la durée de l'événement : ZEventPlaysPokémon et ZEventPlace.

Le premier est lié aux statistiques des chaînes mais le second est une pixel war pour la durée du week-end : 1€ = 10 pixels à placer.
C'est vraiment amusant et cela crée une nouvelle façon pour les gens de donner pour une autre raison que la charité uniquement.

Avec cela, nous avons déployé un outil qui collecte des images du canvas toutes les X minutes et affiche les descriptions que la communauté soumet.
Ce workflow n'est pas parfait et nous avons changé des choses en cours de route mais il fonctionne presque parfaitement depuis 2022.

Vous pouvez voir l'atlas [ici](https://atlas.gdoc.fr/)

## ❓ Qu'est-ce qui a changé cette année ?

### 🤖 Amélioration des capacités et des technologies

Parfois, NodeJS et Python ne suffisent pas.
Parce que je n'ai pas vraiment mis à niveau mes scripts depuis 3 ans maintenant, une grande partie de ma stack concerne NodeJS et Python avec de mauvaises performances et un goût de scripts lancés sur des screens sans orchestration ni basculement.

Cela a fonctionné pendant 3 ans, maintenant il fallait changer.
Avec cet objectif, j'ai commencé à conteneuriser une partie de ma stack pour ce ZEvent et j'ai commencé à refondre mes outils de collecte de statistiques avec rust et une conception master/slave.

À l'époque, 1 script gérait chaque chaîne, maintenant nous avons un nœud master qui stocke toutes les informations de chaîne et d'événement. Les slaves se connectent au master pour collecter les données et les envoient via RabbitMQ pour ajouter une couche de buffer et de load-balancing.

À la fin, les consommateurs récupèrent les données de RabbitMQ et stockent les données dans MongoDB.

**Pourquoi changer cela ?**

Mon ancien système avait beaucoup de problèmes :
- Un seul script pour tout
- Aucun moyen d'équilibrer le flux de requêtes
- Aucune résilience
- Une seule DB pour tout

Maintenant, nous avons de petits services avec chacun son rôle.
Si un service plante, il est remplacé presque instantanément par un autre, ce qui le rend résilient.

Et si un problème survient avec MongoDB ou les consommateurs, ce n'est pas grave : le RabbitMQ mettra les messages en buffer et en attente.
De grands changements concernant la DB ont amélioré la façon dont les objets sont stockés mais aussi l'adaptabilité de la DB et les performances en utilisant de bons index.

### 📦 Passer du bare metal à K8S

Les anciens services étaient des scripts, maintenant j'ai des conteneurs avec registre et déploiement helm spécifiquement pour cela.
Cela permet un déploiement rapide et des changements faciles de nœud.

De plus, pas de soucis en cas de crashes maintenant : tout redémarre tout seul.

Pour le sécuriser cette année, 3 serveurs ont été déployés pour gérer les applications et les sauvegardes afin de conserver toutes les données sans défaillance.

### 👀 Est-ce que ça a fonctionné ?

Oui, ça a parfaitement fonctionné ! Et même si ce système n'était pas le principal mais plutôt une sauvegarde cette année, il est en bonne voie pour devenir le système principal pour 2026.
Tungstene fera bientôt partie des projets **Chronobreak** mais nous en parlerons un peu plus tard.

## 📅 Prochains objectifs

Ça s'est bien passé cette année mais beaucoup de choses pourraient être faites concernant mon travail.

Pour l'année prochaine, je prévois de mettre à niveau les projets de collecte de statistiques avec de nouvelles façons d'afficher les données pour chaque spectateur.
J'aimerais uniformiser notre infrastructure et notre site web avec Maniarr pour connecter ensemble tous les sous-éléments de nos outils.

Les prochains plans sont de développer une manière unique de gérer les autorisations, continuer à mettre à niveau mes scripts en conteneurs généraux et être plus un Ops qu'un Dev.

J'ai bon espoir que l'année prochaine tout sera plus propre.
Des statistiques à l'atlas, j'essaierai de vous tenir au courant et de travailler dessus régulièrement.

À bientôt 🫡