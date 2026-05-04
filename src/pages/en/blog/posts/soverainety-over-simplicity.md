---
layout: /src/layouts/MarkdownPostLayout.astro
title: How I Transitioned from Cloud Providers to Self-Hosting to Gain Digital Sovereignty
author: Pierre-Louis Leclerc | Proxyfil
description: "Digital sovereignty is now an important topic. The French government has made it a priority, issued directives, and joined efforts with DINUM. Meanwhile, American cloud providers continue their propaganda, European ones fight to survive and gain government support. I decided to take the plunge, moving from the unknown to self-hosting, from cloud magic to complete control, and I'll explain the pros and cons..."
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

For almost 7 to 8 years now, I've been renting servers from various cloud providers. It all started, like many people, with a dedicated VPS for a Minecraft server among friends. Then a second one, then a VPS with just Debian at Inovaperf to stay French.

One day I found myself with 3 VPS on my hands, not wanting to renew an expensive bill... Anyway, I caved in for a dedicated server at OVH, one-year commitment, 30€ per month, it was a good solution.
But after a few months the idea emerged: "What if I switched to self-hosting?"

![cat typing](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3N0eTJpanhpZ3pkYXdpam00aWg4YXQ3MnU0NTg1YzZ3ZWx6emJmbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mcsPU3SkKrYDdW3aAU/giphy.gif)

## 🤔 Initial Considerations

At some point, cloud services are no longer sufficient. It's good for experimenting but it quickly becomes an recurring cost, sometimes poorly controlled, and above all you're never fully in control of your infrastructure. It's a bit like renting a house, you can do whatever you want inside but you can't do anything you please, there are rules to follow and limits not to exceed.

Based on this desire for independence, learning, and having some free time, I decided to set up my homelab.
Aiming for an investment to be recouped over 2 years, I could already target a 720€ investment, which was a good start.
That said, I started my planning 6 months ago, prices had already increased, the shortage due to AI had already taken its toll... In short, I had to become sovereign but it was going to cost a lot.

### 🖥️ Why Switch to Self-Hosting?

After all these observations, rising prices, and the disadvantages of self-hosting, ultimately why change?

First of all, it addressed 2 main objectives for me:
- **Learning is understanding**, and you can't learn without getting your hands dirty (or at least it's much harder).
- **No longer depend on external actors**, because data control starts with infrastructure.

I'm aware that my needs are not sensitive to downtime. The main benefit of a hosting provider is stability, scalability, and high availability. All of this comes at a cost, and I realized over the months that I didn't need all of that.
A NAS server turned on 1 day a week for backups, a small VM with essentials 24/7 with sometimes variable connection isn't a big deal, a bit of flexibility for testing and it'll be fine.

In short: ultimately you're paying for services you don't really need. And if maintaining infrastructure yourself is a bit more complicated, it's also educational. It teaches responsibility, security, and resilience.
Think of it as an investment in learning.

### ⚖️ Pros and Cons Compared to the Cloud

Several important negative points about self-hosting:
- **More complex maintenance**: You need to manage updates, failures, security... A constant job
- **No availability guarantee**: In case of hardware failure, power outage, or connection loss, the service can be unavailable for a while
- **Higher initial cost**: Hardware purchase can represent a significant investment

But there are also significant advantages:
- **Complete control over infrastructure**: You can do whatever you want, install whatever you want, configure however you want... It's total freedom
- **Learning and skill development**: You learn to manage infrastructure, solve problems, secure systems... It's a very enriching experience
- **Digital sovereignty**: You no longer depend on third parties, you control your data, you can choose open source solutions

For the more motivated, you can also become an actor of digital sovereignty by hosting services for other people, sharing your knowledge, contributing to open source projects... In short, there are plenty of possibilities to go further than just your own homelab.

![datacenter gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHlpdGpqd2hlc2lsczJ2ZXY2Z3I3dWNybzJsZnVpbng3ajExYXdoZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/eRKDMSarMgSWXGag9Z/giphy.gif)

### 🔍 Identifying Needs

I had 2 main needs for my homelab:
- **A NAS**: to store my data, make backups, share files
- **Compute power**: to run services, applications, tests and replace my dedicated server at OVH

I was already renting for 30€ per month a dedicated server at OVH with 32GB of RAM, 12vCPUs and 1TB of storage, so I wanted at least that in terms of resources for my homelab. So I targeted a budget of around 720€ for the initial investment, which would give me a good base to start.
Goal: to break even over 2 years, which seemed reasonable to me for this type of investment, trying as much as possible to use second-hand equipment.

For some parts, second-hand is risky (especially for HDDs), but it has significant economic and environmental advantages.

## 💸 Acquisition and First Steps

### 💾 What Hardware to Get?

In my search for homelab equipment, I went through several ideas...

Why not use Raspberry Pis? They're cheap, easy to find, energy efficient... But ultimately they weren't powerful enough for my needs, especially for compute and replacing my dedicated server. (Not to mention the cable mess and power supply for multiple Pis)

Then I turned to small PCs found on secondhand sites. After digging a bit, I discovered the paradise of NUC format PCs.
Simply put, NUCs are very compact mini-PCs, often used for multimedia or office work, but can also do light computing.

Some models are even quite powerful and sometimes modular on RAM or storage: exactly what I needed.
So I acquired 3 second-hand NUCs for a total of 900€... (Yes I exceeded the budget but I had a good reason you'll see).

Besides that, I had to build a NAS, and in the NAS world there are basically 2 solutions: pre-built NAS (Synology, QNAP...) or build your own NAS with an enclosure, motherboard, CPU, RAM and hard drives.
I chose the second option to have more control, more customization and especially because it was cheaper (and more sovereign).

A 4-bay 3.5" enclosure with USB recovered from a generous donor plus 2 second-hand 8TB HDDs purchased later, and I had my NAS for about 400€. (Budget blown but at the same time 16TB in these times...)

In short, 3 machines for computing and a NAS for storing my data, all for an initial investment of about 1300€.
- 44 cores
- 96GB of RAM
- 1.5TB of storage (SSD) for computing
- 16TB of storage (HDD) for the NAS

![big pc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHBpcHNtaGx6NTNtaXFkZGVhd3o1bXZxbmhsMGF6NjRiNWdjMTUzcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OwZ3T7Clv1xNpJJPyh/giphy.gif)

### 🔌 How to Set it All Up?

Today it's a bit of a mess in the living room as you can imagine.
I used a small standard IKEA cube to place the 3 NUCs, a power strip, a switch, a bay for the HDDs, and a cable that goes up to the modem.

I've rarely been so ashamed of my cable management but let's say this installation is "temporary" and we'll revisit it later... (I'll spare you the photos for now)

For now the networks aren't yet segmented, everything is on the same local network, but I've already planned to set up VLANs to separate different types of traffic (compute, storage, IoT...) and improve security. It's not necessarily good news that these machines are on the same network as my personal devices but it's a start and I'll do it progressively.

### 🚢 What to Run and How?

Then came the question of what I was going to run on these machines and how to organize them.

At first, aspiring DevOps that I am, I wanted to do Kubernetes. It's the trendy solution, it's the solution for computing, it's the solution for self-hosting... In short, it was the ideal solution for me.
Except that... It's more or less complicated to set up, it's fairly single-purpose and isolating between different projects wasn't going to be easy.

Fallback solution: Proxmox. It's a virtualization tool with a lot of different features.
However, it also had 2 advantages for me: I had seen the basics but wanted to deepen the subject, and especially having VMs made it easy to segment machines (and thus have Kubernetes alongside a NAS and a test VM without them interfering).

Quick and easy, in 1 morning my Proxmox nodes were installed, configured, in a cluster and ready to host VMs.
And honestly it does the job pretty well! Only regret: I haven't yet implemented HA and redundancy with Ceph but it's in the pipeline.

## 🚀 And Now?

### 🤓 Current Infrastructure State

Today I have 3 Proxmox nodes in the cluster with mainly 5 VMs:
- A TrueNAS NAS for storing my data, backups and file sharing (8TB in RAID1 for now with ZFS)
- A "hub" server that hosts essential services (nginx proxy manager, adguardhome, dockovpn, vaultwarden and glance)
- 3 VMs that form a Kubernetes cluster, each on a different node in case one node goes down

For now it's fairly homebrewed, there are things that could be improved regarding security, resilience, redundancy... But it's a good start and it allows me to run quite a few different services for my personal needs.
The VPN is also magical: being at home from anywhere in the world is really a comfort I didn't have before, and it allows me to use my infrastructure even when I'm traveling.

![are you with me ?](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzBxcDQ0N3U1NXhjMTVsOWVvNm12amp0MGNmNHJqdW9zbWt5YWhjcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/usz0fqhUiVxSs6IUKB/giphy.gif)

### ⬅️ General Impressions After a Few Months

Overall no regrets, it was time-consuming at first to set everything up, but now that it's done it's really nice to be able to do whatever I want with my infrastructure, to learn how to manage it, secure it, evolve it... It's a very enriching experience and I'm glad I took the plunge.

Of course there are obstacles to overcome, some headaches sometimes and all of this has an initial cost, but at least I can control everything.
If my SLA is bad it's my fault, if a routing doesn't work either, if a disk dies it's my problem.

I can't recommend everyone do this, but if you have the means, the time and the desire to learn, it's a really interesting experience that can bring you a lot of knowledge and satisfaction.

### 🔮 The Switch and What's Next

Since April 26th I'm officially autonomous, no more rented servers, no more cloud providers, no more dependence on third parties to host my services. It's an important step in my quest for digital sovereignty and I'm really happy I took this leap.

The goal now is to improve the infrastructure, segment the networks, implement redundancy as well and ensure regular maintenance to avoid security or performance issues.
Goal by end of June: have an autonomous system!

![mission accomplished](https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aDFuajUzbDUxc2ZseTU2OXFqdHI4cDNjajdzMTA5enY0dTVpeHNzZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uGvTmuXJGUOmkAFHun/giphy.gif)
