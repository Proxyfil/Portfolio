---
layout: /src/layouts/MarkdownPostLayout.astro
title: Creating a Minecraft Server with Kubernetes
author: Pierre-Louis Leclerc | Proxyfil
description: "Minecraft is a popular game that can be hosted in different ways. Let's discover how to deploy a Minecraft server using Kubernetes! 🎮☁️"
image:
  url: "/images/posts/minecraft-kubernetes.webp"
  alt: "Article illustration"
pubDate: 2025-11-05
tags:
  [
    "Retex", "System", "Kubernetes"
  ]
languages: ["kubernetes", "bash", "docker"]
---

For several years now, Minecraft has been my favorite game. I can't count the hours I've spent on it, whether solo or multiplayer with friends.

A long time ago, I hosted Minecraft servers on classic VPS, but with the evolution of technology, I decided to explore Kubernetes to deploy my Minecraft server.
So I went from a classic VPS infrastructure with daemons to migrate to Kubernetes, taking advantage of this change to perform a major Minecraft version upgrade.

## 🚛 Moving from Bare Metal to Kubernetes

### ❓ Why Kubernetes?

Kubernetes is a container orchestration platform that offers many advantages for hosting applications, including game servers like Minecraft.
We can note some key advantages such as scalability, resilience and ease of resource management.

The main reason was curiosity to explore Kubernetes and see how it could be used to host a Minecraft server. Resources already existed to deploy Minecraft servers on Docker, so the next logical step was to move to Kubernetes.

Moreover, I already have a trajectory to move towards a cloud provider-independent infrastructure, already having a Kubernetes node at home, it was the perfect opportunity to perform this migration.


### 📜 Infrastructure Definition

To host these Minecraft servers (or rather an entire network in this case) I used a machine with an Intel(R) Xeon(R) CPU E3-1270 v6 @ 3.80GHz, 32GB of RAM and 256GB of SSD storage.

To deploy a Minecraft server network, the historical solution was BungeeCord. However, for a few years now, Velocity (with its predecessor Waterfall) has been the favored solution.
Velocity acts as a proxy between players and Minecraft servers, allowing efficient connection management and load balancing between multiple servers or seamless movement from instance to instance within the same network.

Behind Velocity, I deployed several Minecraft servers with different roles:
- A Lobby server: The main entry point for players, where they can prepare before joining other servers.
- A Survival server: A server dedicated to survival mode

For now nothing more but the configuration remains flexible to add other servers in the future.

### 🖥️ Deployment

For deployment, all resources used are available on [my GitHub repo](https://github.com/Proxyfil/Deployments/tree/main/minecraft).

Each server is deployed as a Kubernetes StatefulSet and exposes a particular port for communication with Minecraft clients.

All storage is done directly on the host node's filesystem via PersistentVolumes linked to PersistentVolumeClaims. It's true that this approach is not ideal for horizontal scaling but for personal use it's sufficient.
A future improvement could be to use network storage like NFS or Ceph to allow better flexibility.

Each server uses a custom Docker image based on an existing Minecraft image, with specific configurations for each server type. (Thanks to [itzg](https://github.com/itzg/docker-minecraft-server) who produces considerable work with other contributors!)

### 🔐 Connection Issue

Minecraft by default uses port 25565 for incoming connections. However Kubernetes does not allow directly exposing port 25565 via a LoadBalancer or an Ingress.

To work around this problem I deployed an Nginx container as a LoadBalancer that redirects incoming traffic on port 25565 to the port exposed by the Kubernetes service.

## ⬆️ Improvements

### 🚀 Migration to Version 1.21.10

In addition to the migration to Kubernetes, I took the opportunity to perform a major Minecraft version upgrade, going from version 1.20.4 to version 1.21.10.

This latest version being very recent (at the time of writing), I had to make sure that all the plugins used were compatible with this version.

Fortunately, most popular plugins had already been updated to be compatible with version 1.21.x, but I had to make some minor adjustments in the configuration of some plugins to ensure full compatibility.

Despite this, the deployment remains quite unstable from one minor version to another, I imagine this will improve when updates move to full version and no longer beta or alpha.

### 📊 Monitoring

To monitor the performance and health of my Minecraft server, I integrated monitoring tools into my Kubernetes cluster. I use Prometheus to collect metrics and Grafana to visualize this data.

This allows me to track resource usage, connection latency and other key performance indicators, which is crucial to ensure a smooth gaming experience for players.
All deployment resources are available on [my GitHub repo](https://github.com/Proxyfil/Deployments/tree/main/monitoring/prometheus) with the necessary configurations to deploy Prometheus in Kubernetes.

I also added a Grafana dashboard specific to Minecraft, which displays information such as the number of connected players, memory and CPU usage, and other relevant metrics.
With this I also have a Node Exporter to monitor the state of the host node.

## 📅 Next Objectives

Now that things are stable, I have some ideas to further improve my Minecraft deployment on Kubernetes.
We could move to provisioned storage, improve monitoring with alerts or add metrics with plugins.

But for now I'm quite satisfied with the current configuration and I'm fully enjoying my Minecraft server hosted on Kubernetes!

See you soon 🫡
