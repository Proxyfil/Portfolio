---
layout: /src/layouts/MarkdownPostLayout.astro
title: Incident report with Stream For Humanity
author: Pierre-Louis Leclerc | Proxyfil
description: "Everything don't always go as smooth as we think. While working on Stream For Humanity with Tungstene I was targeted by a DDOS attack and I learnt the hard way how to manage such attack... Let's share the lessons I got from it."
image:
  url: "/images/posts/retex-sfh.webp"
  alt: "Illustration of Stream For Humanity with the title of the blog post"
pubDate: 2025-01-20
tags:
  [
    "Retex", "System", "Twitch", "Network"
   
  ]
languages: ["vue", "kubernetes", "cloudflare"]
---

Sometimes you have plans but universe has others for you... I have figured it out this month because I got attacked on my system. To be honest it was a bit my fault and even if it was not a big problem I had to figure out how to handle it.

Let's dive into the problem !

## ❓ Incident Report: Distributed Denial of Service (DDoS) Attack

### 1. Incident Summary

Let's resume the context of this attack :

On **January 17, 2025**, a Distributed Denial of Service (DDoS) attack was detected on the infrastructure provided by the school. The attack began at 10:30 PM (UTC+1) and continued until 11:08 PM (UTC+1), affecting the services deployed for the event “Stream For Humanity,” as well as the performances of my server and the SSH service on it. All traffic routed through a Cloudflare proxy was redirected to the DO network of the University of Montpellier, targeting the server “Antlia”.

This attack used advanced techniques, particularly **application-layer attacks**, and primarily targeted web API services deployed on the server blade. Mitigation measures allowed essential services to be restored within 20 minutes.

---

### 2. How I detected it and how I responded initially

The attack was detected through server monitoring tools and Cloudflare alerts. Initial anomalies included increased CPU usage and a significant rise in network latency.
This was unsual from such service in such event and even if I deployed something a bit new on my infrastructure I soon realised that this was wrong...
  
The following actions were promptly taken:

- **Blocking** of identified malicious IP addresses  
- Activation of **emergency rules** on the Web Application Firewall (WAF)  
- Deployment of **additional applications** to absorb traffic  

---

### 3. Attack Analysis

Afterward I took time to analise the attack, identify the main issue and how it got exploited to do such damages.

The analysis revealed the following vector:

- **Application-layer attack:** Massive HTTP GET requests targeting “sfh.proxyfil.fr/api/pools/streamers” (and by extension the domain antlia.dopolytech.fr/api/pools/streamers)

We can note some characteristics about some technical aspect of the attack :

- **Total Volume:** ~200,000 requests per minute, about ~3,000 requests per second (RPS), with a peak at 4.73 million requests per minute mitigated by Cloudflare’s WAF at 10:52 PM  
- **Sources of the Attack:** A large number of IP addresses from many countries, mainly Indonesia (7.5 million), USA (3.74 million), India (1.6 million), Brazil (1.36 million), Turkey (1.3 million), and China (volume unknown)  
- **Tools Used by Attackers:** Likely botnets  

A geographic analysis showed a concentration of attackers in Asia and the Americas.

**Total Attack Volume:**

- **8 GB** of data was served by the server during the attack, **161.92 GB** was served by Cloudflare’s cache  
- **5 million requests** were served by the server, **25 million** were cached or blocked by Cloudflare  
- **5 countries** accounted for more than half of the requests handled by the server  
- Out of the **30 million recorded** requests during the attack, approximately **27 million** ended without a response due to server overload or WAF response  
- CPU usage on the server blade reached **90%** during the attack, RAM usage increased by **6 GB** 

---

### 4. Impacts on services

**Impacted Services:**

- Services on Antlia Server: Severely degraded performance for several minutes
- Antlia Server Blade: Severely degraded performance for several minutes  
- API and Frontend Services: Severely degraded performance for a few minutes  

---

### 5. Immediate Corrective Actions

The following actions were taken to restore operations:

- Deployment of a WAF via Cloudflare to block illegitimate requests  
- Increased availability of services to absorb traffic  
- Enhanced monitoring of systems during the following hours  

---

### 6. Conclusion

This incident highlights the need for increased vigilance against DDoS threats, which are becoming increasingly sophisticated. Although existing measures helped to limit the impact, continuous improvement of tools and security processes is essential to ensure service availability.

The lessons learned from this incident will inform future security strategies, ensuring a swift and effective response to future attacks, and serving as a warning to other students planning to deploy such services on the DO infrastructure.

---

### 7. Attack Timeline

**10:30 PM:** Start of the DDoS attack  
**10:36 PM:** Disconnection of Polytech VPN  
**10:37 PM:** Inquiry with peers; website is inaccessible  
**10:39 PM:** CPU usage alert for the Antlia server  
**10:40 PM:** VPN restored  
**10:41 PM:** Deployment of 2 new services to absorb traffic  
**10:43 PM:** WAF deployed to block top 3 attacking countries  
**10:46 PM:** Blocking of 4 additional attacking countries  
**10:49 PM:** First offensive ends  
**10:51 PM:** Start of the second offensive, fully mitigated by Cloudflare’s WAF  
**10:52 PM:** Attack peak, 4.73 million requests mitigated. DO/Polytech/UM infrastructure spared  
**11:01 PM:** Return to normal service, confirmed by Antlia server metrics  
**11:08 PM:** End of the DDoS attack

---

### 8. Annexes

Countries of Origin of the Attacks (Top 5 Attackers):

![country_details.webp](/images/posts/retex-sfh/country_details.webp)

Attack Volume:

![total_traffic.webp](/images/posts/retex-sfh/total_traffic.webp)

Attack Statistics:

![sources_traffic.webp](/images/posts/retex-sfh/sources_traffic.webp)

Attack Mapping:

![map.webp](/images/posts/retex-sfh/map.webp)

Attack Volume:

![cached_requests.webp](/images/posts/retex-sfh/cached_requests.webp)

Attack Data Volume:

![cached_bandwidth.webp](/images/posts/retex-sfh/cached_bandwidth.webp)

CPU Usage During the Attack:

![cpu_usage.webp](/images/posts/retex-sfh/cpu_usage.webp)

RAM Usage During the Attack:

![ram_usage.webp](/images/posts/retex-sfh/ram_usage.webp)


## 💚 Conclusion

This experience was really useful for me because I learnt a lot about securing services. This was the first time I got really attacked and I'm sure that next time I will ensure that I have some security to defend myself from such sneaky ways to attack my services.

I hope this post was useful for you, see you soon...