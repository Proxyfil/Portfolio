---
layout: /src/layouts/MarkdownPostLayout.astro
title: Créer un serveur Minecraft avec Kubernetes
author: Pierre-Louis Leclerc | Proxyfil
description: "Minecraft est un jeu populaire qui peut être hébergé de différentes manières. Découvrons comment déployer un serveur Minecraft à l'aide de Kubernetes ! 🎮☁️"
image:
  url: "/images/posts/minecraft-kubernetes.webp"
  alt: "Illustration de l'article"
pubDate: 2025-11-05
tags:
  [
    "Retex", "System", "Kubernetes"
  ]
languages: ["kubernetes", "bash", "docker"]
---

Depuis quelques années maintenant Minecraft est mon jeu de coeur. Je ne compte plus les heures passées dessus, que ce soit en solo ou en multijoueur avec des amis.

Il y a bien longtemps, j'ai hébergé des serveurs Minecraft sur des VPS classiques, mais avec l'évolution de la technologie, j'ai décidé d'explorer Kubernetes pour déployer mon serveur Minecraft.
Je suis donc parti d'une infrastructure VPS classique avec des daemons pour migrer vers Kubernetes, en profitant au passage de ce changement pour effectuer une montée de version majeure de Minecraft.

## 🚛 Passage de bare metal à Kubernetes

### ❓ Pourquoi Kubernetes ?

Kubernetes est une plateforme d'orchestration de conteneurs qui offre de nombreux avantages pour héberger des applications, y compris des serveurs de jeux comme Minecraft.
On notera certains avantages clés comme le scalabilité, la résilience et la facilité de gestion des ressources.

La principale raison était surtout la curiosité d'explorer Kubernetes et de voir comment il pouvait être utilisé pour héberger un serveur Minecraft. Des ressources existaient déjà pour déployer des serveurs Minecraft sur Docker, donc l'étape suivante logique était de passer à Kubernetes.

De plus, j'ai déjà pour trajectoire de passer vers une infrastructure indépendante des cloud providers, ayant déjà un noeud Kubernetes chez moi, c'était l'occasion parfaite pour effectuer cette migration.


### 📜 Définition de l'infrastructure

Pour héberger ces serveurs minecraft (ou plutôt un network entier dans ce cas) j'ai utilisé une machine avec un Intel(R) Xeon(R) CPU E3-1270 v6 @ 3.80GHz, 32Go de RAM et 256Go de stockage SSD.

Pour déployer un network de serveurs Minecraft la solution historique était BungeeCord. Cependant depuis quelques années maintenant c'est Velocity (avec son prédécesseur Waterfall) qui est la solution favorisée.
Velocity agit comme un proxy entre les joueurs et les serveurs Minecraft, permettant une gestion efficace des connexions et une répartition de la charge entre plusieurs serveurs ou du déplacement sans déconnexion d'instance à instance au sein du même network.

Derrière Velocity, j'ai déployé plusieurs serveurs Minecraft avec des rôles différents :
- Un serveur Lobby : Le point d'entrée principal pour les joueurs, où ils peuvent se préparer avant de rejoindre d'autres serveurs.
- Un serveur Survival : Un serveur dédié au mode survie

Pour l'instant rien de plus mais la configuration reste flexible pour ajouter d'autres serveurs à l'avenir.

### 🖥️ Déploiement

Pour le déploiement toutes les ressources utilisées sont disponibles sur [mon repo GitHub](https://github.com/Proxyfil/Deployments/tree/main/minecraft).

Chaque serveur est déployé en tant que StatefulSet Kubernetes et expose un port particulier pour la communication avec les clients Minecraft.

Tout le stockage se fait directement sur le filesystem du noeud hôte via des PersistentVolumes liés à des PersistentVolumeClaims. Il est vrai que cette approche n'est pas idéale en cas de scaling horizontal mais pour un usage personnel c'est suffisant.
Une amélioration future pourrait être d'utiliser un stockage en réseau comme NFS ou Ceph pour permettre une meilleure flexibilité.

Chaque serveur utilise une image Docker personnalisée basée sur une image Minecraft existante, avec des configurations spécifiques pour chaque type de serveur. (Merci à [itzg](https://github.com/itzg/docker-minecraft-server) qui produit un travail considérable avec les autres contributeurs !)

### 🔐 Problématique de connection

Minecraft par défaut utilise le port 25565 pour les connexions entrantes. Cependant Kubernetes ne permet pas d'exposer directement le port 25565 via un LoadBalancer ou un Ingress.

Pour contourner ce problème j'ai déployé un conteneur Nginx en tant que LoadBalancer qui redirige le trafic entrant sur le port 25565 vers le port qui est exposé par le service Kubernetes.

## ⬆️ Améliorations

### 🚀 Migration vers la version 1.21.10

En plus de la migration vers Kubernetes, j'ai profité de l'occasion pour effectuer une montée de version majeure de Minecraft, passant de la version 1.20.4 à la version 1.21.10.

Cette dernière version étant très récente (à l'heure où j'écris ces lignes), j'ai dû m'assurer que tous les plugins utilisés étaient compatibles avec cette version.

Heureusement, la plupart des plugins populaires avaient déjà été mis à jour pour être compatibles avec la version 1.21.x, mais j'ai dû faire quelques ajustements mineurs dans la configuration de certains plugins pour garantir une compatibilité totale.

Malgré ceci le déploiement reste assez instable d'une version mineure à une autre, j'imagine que cela s'améliorera lorsque les mises à jour passeront en version complète et non plus en bêta ou alpha.

### 📊 Monitoring

Pour surveiller les performances et la santé de mon serveur Minecraft, j'ai intégré des outils de monitoring dans mon cluster Kubernetes. J'utilise Prometheus pour collecter les métriques et Grafana pour visualiser ces données.

Cela me permet de suivre l'utilisation des ressources, la latence des connexions et d'autres indicateurs clés de performance, ce qui est crucial pour assurer une expérience de jeu fluide pour les joueurs.
Toutes les ressources de déploiement sont disponibles sur [mon repo GitHub](https://github.com/Proxyfil/Deployments/tree/main/monitoring/prometheus) avec les configurations nécessaires pour déployer Prometheus dans Kubernetes.

J'ai aussi ajouté un dashboard Grafana spécifique pour Minecraft, qui affiche des informations telles que le nombre de joueurs connectés, l'utilisation de la mémoire et du CPU, et d'autres métriques pertinentes.
Avec cela j'ai aussi un Node Exporter pour surveiller l'état du noeud hôte.

## 📅 Prochains objectifs

Maintenant que les choses sont stables, j'ai quelques idées pour améliorer encore mon déploiement Minecraft sur Kubernetes.
On pourrait passer sur du stockage provisionné, améliorer le monitoring avec des alertes ou ajouter des metrics avec des plugins.

Mais pour l'instant je suis assez satisfait de la configuration actuelle et je profite pleinement de mon serveur Minecraft hébergé sur Kubernetes !

À bientôt 🫡