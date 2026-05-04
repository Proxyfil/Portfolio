---
layout: /src/layouts/MarkdownPostLayout.astro
title: Comment je suis passé des cloud providers au selfhost pour devenir souverain
author: Pierre-Louis Leclerc | Proxyfil
description: "La souveraineté numérique est un sujet qui est désormait important. L'état français en fait sa priorité, donne des directives, joint ses efforts avec la DINUM. Pendant ce temps les cloud providers américains continuent à faire leur propagande, ceux européens combattent pour survivre et être soutenu par les gouvernements. J'ai décidé de faire le grand saut, de passer de l'inconnu au selfhost, de la magie du cloud au contrôle complet, et de vous expliquer les bons et les moins bons côtés..."
image:
  url: "/images/posts/going-selfhost.webp"
  alt: ""
pubDate: 2026-05-03
tags:
  [
    "Retex", "System", "Proxmox"
  ]
languages: ["kubernetes", "docker", "bash"]
---

Cela fait bientôt 7 à 8 ans que je loue des serveurs chez différents cloud providers. Tout a commencé, comme beaucoup de monde, avec un VPS dédié pour un serveur Minecraft entre copains. Puis un deuxième, puis un VPS avec simplement débian chez Inovaperf pour rester français.

Un jour je me suis retrouvé avec 3 VPS sur les bras, pas envie de renouveler une facture trop chère.. Enfin bref, j'ai craqué pour un dédié chez OVH, engagement d'un an, 30€ par mois, c'était une bonne solution.
Mais au bout de quelques mois l'idée émerge : "Et si je passais au selfhost ?"

![cat typing](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3N0eTJpanhpZ3pkYXdpam00aWg4YXQ3MnU0NTg1YzZ3ZWx6emJmbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mcsPU3SkKrYDdW3aAU/giphy.gif)

## 🤔 La réflexion initiale

Au bout d'un moment il arrive que le cloud ne soit plus suffisant. Pour tatonner c'est bien mais cela a vite un coût récurrent, parfois mal contrôlé et surtout on est jamais totalement maitre de son infrastructure. C'est un peu comme louer une maison, on peut faire ce qu'on veut dedans mais on ne peut pas faire n'importe quoi, il y a des règles à respecter et des limites à ne pas dépasser.

C'est sur cette base d'envie d'émancipation, d'apprentissage et un peu de temps à perdre que j'ai décidé de monter mon homelab.
En visant un investissement pour un amortissement sur 2 ans je pouvais déjà viser 720€ d'investissement, ce qui est déjà un bon début.
Ceci dit j'ai commencé ma réflexion il y a 6 mois, les prix avaient déjà augmentés, la pénurie à cause de l'IA avait déjà fait son oeuvre... Bref il fallait devenir souverain mais ça allait coûter cher.

### 🖥️ Pourquoi passer au selfhost ?

Après toutes ces observations, la montée des prix, les inconvénients du selfhost, au final pourquoi changer ?

Déjà cela répond à 2 objectifs principaux pour moi :
- **Apprendre c'est comprendre**, et on ne peut pas apprendre sans manipuler (du moins probablement beaucoup plus difficilement).
- **Ne plus dépendre d'acteurs externes**, parce que le contrôle de ses données commence par l'infrastructure.

Je suis conscient d'avoir des besoins peu sensibles au downtime. L'intérêt principal d'un hébergeur étant sa stabilité, sa scalabilité et son taux de disponibilité haut. Tout cela a un coût, et j'ai vu au fur et à mesure des mois que je n'avais pas besoin de tout ça.
Un serveur NAS allumé 1 jour par semaine pour faire des sauvegardes, une petite VM avec les essentiels H24 avec une connexion parfois variable ce n'est pas bien grave, un peu de flexibilité pour faire des tests et ça ira bien.

Enfin bref : au final on paie des prestations dont nous n'avons pas tant besoin. Et si maintenir une infrastructure soi-même est un peu plus compliqué c'est aussi formateur. Cela apprend la responsabilité, la sécurité et la résilience.
Il faut voir ça comme un investissement pour apprendre.

### ⚖️ Les pour et les contres comparés au cloud

On identifie plusieurs points négatifs importants concernant le selfhost :
- **Maintenance plus complexe** : Il faut gérer les mises à jour, les pannes, la sécurité... Un travail de tous les instants
- **Pas de garantie de disponibilité** : En cas de panne matérielle, de coupure d'électricité ou de connexion, le service peut être indisponible pendant un certain temps
- **Coût initial plus élevé** : L'achat du matériel peut représenter un investissement important

Mais il y a aussi des avantages non négligeables :
- **Contrôle total sur l'infrastructure** : On peut faire ce qu'on veut, installer ce qu'on veut, configurer comme on veut... C'est la liberté totale
- **Apprentissage et développement de compétences** : On apprend à gérer une infrastructure, à résoudre des problèmes, à sécuriser... C'est une expérience très enrichissante
- **Souveraineté numérique** : On ne dépend plus de tiers, on contrôle ses données, on peut choisir des solutions open source

Pour les plus motivés on peut aussi devenir un acteur de la souveraineté numérique en hébergeant des services pour d'autres personnes, en partageant ses connaissances, en contribuant à des projets open source... Bref il y a plein de possibilités pour aller plus loin que juste son propre homelab.

![datacenter gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHlpdGpqd2hlc2lsczJ2ZXY2Z3I3dWNybzJsZnVpbng3ajExYXdoZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/eRKDMSarMgSWXGag9Z/giphy.gif)

### 🔍 Identification des besoins

J'avais 2 besoins principaux pour mon homelab :
- **Un NAS** : pour stocker mes données, faire des sauvegardes, partager des fichiers
- **Avoir du compute** : pour faire tourner des services, des applications, des tests et remplacer mon serveur dédié chez OVH

Je louais déjà pour 30€ par mois un serveur dédié chez OVH pour 32 gigas de RAM, 12vCPUs et 1To de stockage, je voulais donc au moins ça en terme de ressources pour mon homelab. J'ai donc ciblé un budget d'environ 720€ pour l'investissement initial, ce qui me permettait d'avoir une bonne base pour commencer.
Objectif : un amortissement sur 2 ans, ce qui me semblait raisonnable pour un investissement de ce type, en essayant au maximum d'utiliser de l'occasion.

Pour certaines pièces l'occasion est un risque (pour les HDD notamment), mais cela a des avantages économiques et écologiques non négligeables.

## 💸 Acquisition et balbutiements

### 💾 Quel matériel prendre ?

Dans ma recherche pour trouver du matériel pour mon homelab je suis passé par plusieurs idées...

Pourquoi pas utiliser des Raspberry Pi ? C'est pas cher, c'est facile à trouver, c'est économe en énergie... Mais au final ce n'était pas assez puissant pour mes besoins, surtout pour faire du compute et remplacer mon serveur dédié. (Sans parler du bordel de câbles et de l'alimentation pour plusieurs Pi)

Ensuite je me suis tourné vers les petits PC trouvables sur Leboncoin. En fouillant un peu j'ai découvert le paradis des PC format NUC.
Pour faire simple, les NUC sont des mini-PC très compacts, souvent utilisés pour des usages multimédia ou bureautique, mais qui peuvent aussi faire du compute léger.

Certains modèles sont mêmes plutôt performants et parfois modulaires sur la RAM ou le stockage : exactement ce qu'il me fallait.
J'ai donc fait l'acquisition de 3 NUCs d'occasion pour un total de 900€... (Oui j'ai dépassé du budget mais j'avais une bonne raison vous allez voir).

En plus de cela j'ai dû faire un NAS, et dans le monde du NAS il existe en gros 2 solutions : les NAS préconçus (Synology, QNAP...) ou faire son propre NAS avec un boitier, une carte mère, un CPU, de la RAM et des disques durs.
J'ai choisi la deuxième option pour avoir plus de contrôle, plus de personnalisation et surtout parce que c'était moins cher (et plus souverain).

Un boitier 4 baies 3"5 pouces en USB récupéré chez un généreux donateur plus tard et 2 disques HDD 8To achetés d'occasion plus tard, j'avais mon NAS pour environ 400€. (Le budget explosé mais en même temps 16To dans les temps qui court...)

En bref 3 machines pour faire du compute et un NAS pour stocker mes données, le tout pour un investissement initial d'environ 1300€.
- 44 coeurs
- 96Go de RAM
- 1,5To de stockage (SSD) pour le compute
- 16To de stockage (HDD) pour le NAS

![big pc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHBpcHNtaGx6NTNtaXFkZGVhd3o1bXZxbmhsMGF6NjRiNWdjMTUzcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OwZ3T7Clv1xNpJJPyh/giphy.gif)

### 🔌 Comment agencer tout ça ?

Aujourd'hui c'est un peu le bordel dans le salon comme vous pouvez vous en douter.
J'ai utilisé un petit cube IKEA standard pour poser les 3 NUCs, une multiprise, un switch, une baie pour les HDD et un câble qui va jusqu'à la box.

J'ai rarement autant eu honte de mon câble management mais nous dirons que cette installation est "temporaire" et que nous reviendrons dessus ultérieurement... (Je vous épargne les photos pour l'instant)

Pour l'instant les réseaux ne sont pas encore segmentés, tout est sur le même réseau local, mais j'ai déjà prévu de faire du VLAN pour séparer les différents types de trafic (compute, stockage, IoT...) et améliorer la sécurité. Ce n'est pas forcément une bonne nouvelle que ces machines soient sur le même réseau que mes appareils personnels mais c'est un début et je vais y aller progressivement.

### 🚢 Que faire tourner et comment ?

S'est posé enfin la question de ce que j'allais faire tourner sur ces machines et comment les organiser.

Au début, DevOps en devenir que je suis, j'ai voulu faire du Kubernetes. C'est la solution à la mode, c'est la solution pour faire du compute, c'est la solution pour faire du selfhost... Bref c'était la solution idéale pour moi.
Sauf que... Déjà c'est plus ou moins compliqué à mettre en place, c'est assez mono-tâche et l'isolation entre les différents projets n'allaient pas être facile.

Solution de repli : Proxmox. C'est un outil de virtualisation qui a beaucoup de fonctionnalités différentes.
Cependant il avait aussi 2 avantages pour moi : j'en avais vu les bases mais je voulais approfondir le sujet, et surtout avoir des VMs cela permettait de segmenter des machines facilement (et donc avoir du Kubernetes à côté d'un NAS et d'une VM de test sans que ça interfère).

Pif paf pouf, en 1 matinée mes noeuds Proxmox étaient installés, configurés, en cluster et prêts à accueillir des VMs.
Et honnêtement ça fait plutôt bien le travail ! Seul regret : je n'ai pas encore mis en place la HA et la redondance avec Ceph mais c'est dans les cartons.

## 🚀 Et maintenant ?

### 🤓 État actuel de l'infrastructure

Aujourd'hui j'ai donc 3 noeuds Proxmox dans le cluster avec principalement 5 VMs :
- Un NAS TrueNAS pour le stockage de mes données, les sauvegardes et le partage de fichiers (8To en RAID1 pour l'instant avec ZFS)
- Un serveur "hub" qui héberge les services essentiels (nginx proxy manager, adguardhome, dockovpn, vaultwarden et glance)
- 3 VMs qui forment un cluster Kubernetes, chacune sur un noeud différent au cas où un noeud tombe en panne

Pour l'instant c'est assez homebrewed, il y aurait des choses à améliorer concernant la sécurité, la résilience, la redondance... Mais c'est un bon début et ça me permet de faire tourner pas mal de services différents pour mes besoins personnels.
Le VPN est aussi magique : être chez soi de partout dans le monde c'est vraiment un confort que je n'avais pas avant, et ça me permet d'utiliser mon infrastructure même quand je suis en déplacement.

![are you with me ?](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzBxcDQ0N3U1NXhjMTVsOWVvNm12amp0MGNmNHJqdW9zbWt5YWhjcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/usz0fqhUiVxSs6IUKB/giphy.gif)

### ⬅️ Impressions générales après quelques mois

Globalement aucun regret, c'était chronophage au début pour tout mettre en place, mais maintenant que c'est fait c'est vraiment agréable de pouvoir faire ce que je veux avec mon infrastructure, d'apprendre à la gérer, à la sécuriser, à la faire évoluer... C'est une expérience très enrichissante et je suis content d'avoir franchi le pas.

Bien sûr il y a des obstacles à surmonter, des prises de tête parfois et tout cela a un coût initial, mais au moins je peux tout contrôler.
Si mon SLA est mauvais c'est ma faute, si un routage ne marche pas non-plus, si un disque meurt c'est mon problème.

Je ne peux pas recommander à tout le monde de le faire, mais si vous avez les moyens, le temps et l'envie d'apprendre, c'est une expérience vraiment intéressante qui peut vous apporter beaucoup de connaissances et de satisfaction.

### 🔮 La bascule et la suite

Depuis le 26 avril je suis officiellement autonome, plus de serveurs loués, plus de cloud providers, plus de dépendance à des tiers pour héberger mes services. C'est une étape importante dans ma quête de souveraineté numérique et je suis vraiment content d'avoir franchi ce cap.

L'objectif maintenant c'est d'améliorer l'infrastructure, de segmenter les réseaux, de mettre en place la redondance aussi et d'assurer un maintien régulier pour éviter les problèmes de sécurité ou de performance.
Objectif pour fin juin : avoir un système autonome !

![mission accomplished](https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aDFuajUzbDUxc2ZseTU2OXFqdHI4cDNjajdzMTA5enY0dTVpeHNzZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uGvTmuXJGUOmkAFHun/giphy.gif)

