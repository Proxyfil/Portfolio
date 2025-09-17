---
layout: /src/layouts/MarkdownPostLayout.astro
title: Counter-DDOS, Rust and learning by mistakes
author: Pierre-Louis Leclerc | Proxyfil
description: "For now 4 years in a row I've collected statistics around the charity event 'ZEvent'. And even if I'm used to it their is always many problems that I have to face when doing things at that scale ! Let's talk a bit about problems around charity events and poor technical choices."
image:
  url: "/images/posts/retex-zevent2025.webp"
  alt: "Illustration of ZEvent2025 with the title of the blog post"
pubDate: 2025-09-17
tags:
  [
    "Retex", "System", "Twitch", "Rust"
   
  ]
languages: ["vue", "kubernetes", "cloudflare"]
---

Since 2020, I do community work around ZEvent. This event is the biggest french charity event hosted on Twitch, with more than 16,000,000€ collected in 2025 it is the most important fund raising with streamers each year.

Every year there is more people that tries to participate, more POV to follow, more donation goals to see and an average viewer can be rapidly overwhelmed by all those informations.
For 5 years now I work with a group of people to give viewers tools and metrics to better follow and understand this event in real time or after the event.

Let's talk a bit about my work and what makes this year special !

## 📱 Usual work


### 📜 Donation goals list

Since 2020 we work together with [the team](https://gdoc.fr/team) to give everyone one place with every donation goals.
Donation goals are objectives with amounts in euros, each streamer have his own ones for his donations raised.

In 2021 it was 49 streamers that were together for ~54 hours, raising all together more than 10,000,000€ for the first time.
This year about 800 donation goals were created and 682 achieved, way more than an average viewer can follow.

<blockquote class="twitter-tweet" data-theme=dark><p lang="fr" dir="ltr">10 millions d&#39;euros récoltés pour <a href="https://twitter.com/ACF_France?ref_src=twsrc%5Etfw">@ACF_France</a> c&#39;est historique !! Mais est-ce que vous vous rendez vraiment compte de ce que ça représente dans le combat contre la faim ? Comme à chaque fois on vous a préparé des statistiques sur ce week end. Merci à vous 💚<a href="https://twitter.com/hashtag/ZEVENT2021?src=hash&amp;ref_src=twsrc%5Etfw">#ZEVENT2021</a> <a href="https://t.co/ytqNuOEavy">pic.twitter.com/ytqNuOEavy</a></p>&mdash; Les Ingés du GDoc (@Les_InGdoc) <a href="https://twitter.com/Les_InGdoc/status/1455123032243150859?ref_src=twsrc%5Etfw">November 1, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


### 📊 Statistics

Since 2021 we create infographics and visuals with many data around ZEvent and twitch metrics.

The data can be about time streamed, time viewed, number of emotes or messages sent.
Everything is collected through Twitch official API into postgresql, behind everything we have NodeJS and Python scripts to do all the work.
Every visual is planned before the event on Figma (it is wonderful).

Here is an example of what we have designed for 2025 :

<blockquote class="twitter-tweet" data-theme=dark><p lang="fr" dir="ltr">Écrire autant de donation goals c&#39;est une chose, en atteindre 86% c&#39;est un évènement !<br>Grâce à vous ce sont 16 MILLIONS d&#39;euros qui ont été bombardés dans les cagnottes de ce <a href="https://twitter.com/hashtag/ZEVENT?src=hash&amp;ref_src=twsrc%5Etfw">#ZEVENT</a> 💚<br>Retrouvez les stats individuelles des streamers sur <a href="https://t.co/GZ0dDeqq7B">https://t.co/GZ0dDeqq7B</a><br><br>⬇️<a href="https://twitter.com/hashtag/ZEVENT2025?src=hash&amp;ref_src=twsrc%5Etfw">#ZEVENT2025</a>⬇️ <a href="https://t.co/COKlEtpRim">pic.twitter.com/COKlEtpRim</a></p>&mdash; Les Ingés du GDoc (@Les_InGdoc) <a href="https://twitter.com/Les_InGdoc/status/1965026651357786281?ref_src=twsrc%5Etfw">September 8, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Throughout the years we have increased our capabilities. Nowadays we can handle up to 350 channels at the same time with real time metrics generation.
The event ends on Monday at 1am every year, about 5 hours later we have all our visuals ready.

For 2 years now we also generate infographics personnalized for every streamer, this year it is about ~350 visuals that have been generated automatically.
This year everything is available [here](https://stats.gdoc.fr/)

### 🖼️ Place Atlas

Since 2022 the ZEvent organization give 2 games available for the time of the event : ZEventPlaysPokémon and ZEventPlace.

The first one is joined to channel's statistics but the second one is a pixel war for the time of the week-end : 1€ = 10 pixels to place.
This is really fun and it creates a new way for people to give for another reason than charity only.

With this we have deployed a tool that collect images of the canvas every X minutes and displays the descriptions that the community submits.
This workflow is not perfect and we have changed things along the way but it works almost perfectly since 2022.

You can see the atlas [here](https://atlas.gdoc.fr/)

## ❓ What changed this year ?

### 🤖 Capabilities and technologies enhancement

Sometimes NodeJS and Python are not enough.
Because I haven't really upgraded scripts for 3 years now many of my stack is about NodeJS and Python with poor performances and a taste of scripts started on screens without orchestration or failover.

That worked for 3 years, now it had to change.
With this goal I've started to containerize some of my stack for this ZEvent and started to rework my statistics collecting tools with rust and master/slave design.

Back in the days 1 script was handling every channel, now we have a master node that store every channel and event informations. Slaves connect to master in order to collect data and send them through RabbitMQ to add a layer of buffer and load-balancing.

In the end consummers get data from RabbitMQ and store data to MongoDB.

**Why changing this ?**

My old system had a lot of issues :
- Only one script for everything
- No way to balance the flow of requests
- No resilience
- Only one DB for everything

Now we have small services with each his role.
If a service crashes he is replaced almost instantly by another one, making it resilient.

And if a problem occurs with MongoDB or consummers it's not a big deal : the RabbitMQ will buffer messages and standby.
Big changes about DB improved the way objects are stored but also adaptability of the DB and performances by using great indexes.

### 📦 Going from bare metal to K8S

Old services were scripts, now I have containers with registry and helm deployment specifically for this.
It allows fast deploy and easy changes of node.

On top of that no worries are crashes now : everything restarts alone.

To make it safe this year 3 servers were deployed to handle applications and backups in order to keep all the data without failling.

### 👀 Did it worked ?

Yes it worked perfectly ! And even if this system was not the main one but more like a backup this year it is in good way to be the main system for 2026.
Tungstene will soon be part of the **Chronobreak** projects but we will talk a bit more about this later.

## 📅 Next objectives

It went well this year but a lot of things could be done about my work.

For the next year I plan to upgrade the statistics collecting projects with new way to diplay data for every viewer.
I would like to uniformize our infrastructure and website with Maniarr to get every subpart of our tools connected together.

The next plans are to developp a unique way to manage authorizations, continuing upgrading my scripts to general containers and behing more an Ops that a Dev.

I have good hopes that next year every will be cleaner.
From statistics to atlas I will try to keep you in touch and work on it regularly.

See you soon 🫡