---
layout: /src/layouts/MarkdownPostLayout.astro
title: Comment créer un paquet .deb et mettre en place un miroir pour le distribuer
author: Pierre-Louis Leclerc | Proxyfil
description: "Tout programme peut être transformé en paquet .deb. C'est vraiment utile pour les petits scripts qu'on utilise souvent, essayons d'en créer un ensemble ! ⚙️"
image:
  url: "/images/posts/create-deb-package.webp"
  alt: "Illustration avec le logo Linux et un paquet."
pubDate: 2025-06-02
tags:
  [
    "Bash", "System"
   
  ]
languages: ["bash"]
---

Créer un paquet .deb peut s'avérer vraiment pratique quand on a des tâches répétitives à effectuer. C'est également un moyen simple de partager ses outils via un miroir et de diffuser ses paquets de gestion système sur internet.
Voyons ensemble comment créer un paquet et le partager au monde entier !

## 📁 Comment créer votre paquet ?

### 🏗️ Architecture du paquet

---

N'importe quoi peut devenir un paquet .deb, c'est la principale chose à retenir.
Avec ce travail, il existe des standards dans l'architecture de votre paquet, vous devriez suivre ces conventions :

```bash
[package_name]/
├── DEBIAN/
│   ├── control
│   └── postinst
│   └── prerm
└── lib/[package_name]/
		└── [script_sources]
```

Ici, on peut remarquer plusieurs choses. Le dossier `DEBIAN` contient tous les hooks et informations générales de notre paquet, c'est un dossier essentiel pour le paquet.
L'autre dossier contient l'emplacement d'installation de notre paquet ainsi que nos fichiers sources.

### 📝 Contenu du fichier control

---

Le fichier control est le cœur du paquet. Voici un exemple ci-dessous.

```bash
Package: mypackage
Version: 1.0
Architecture: all
Maintainer: Example <example@example.com>
Depends: python3, python3-tz
Description: Show the date
```

On peut voir ici les informations sur le paquet ainsi que les dépendances et la description.
Il est également possible d'ajouter des conflits avec des dépendances pour les supprimer du système.

### 📝 Contenu des fichiers postinst et prerm

---

Le fichier postinst est utilisé pour exécuter un script après le déploiement des fichiers du paquet, c'est utile pour créer des liens symboliques.

```bash
#!/bin/bash
ln -s /usr/lib/[example]/[example.py] /usr/bin/[example]
chmod +x /usr/bin/[example]
```

Le fichier prerm est utilisé pour exécuter un script après la suppression des fichiers.

```bash
#!/bin/bash
rm -f /usr/bin/[example]
```

Si vous le souhaitez, vous pouvez utiliser plusieurs hooks différents mais nous n'aborderons pas ce sujet ici.

### 🆕 Créer notre paquet

---

Pour créer un paquet .deb, nous allons utiliser `dpkg-deb` comme dans la commande suivante, vous devez l'exécuter au-dessus du dossier de votre paquet.

```bash
dpkg-deb --build [example]
```

Cela va créer un paquet .deb de notre code.

### ✒️ Comment signer notre paquet

---

Même si ce n'est pas obligatoire, nous allons sécuriser notre paquet. Pour ce faire, nous allons créer une clé privée avec `gpg`.

```bash
gpg --full-generate-key
```

Après avoir saisi quelques informations, vous obtiendrez votre clé privée ou du moins un identifiant : **Notez l'ID quelque part**
Ensuite, nous allons signer le paquet avec gpg pour obtenir un fichier .deb.sig.

```bash
gpg --default-key [key_id] --detach-sign [example.deb]
```

Enfin, nous allons récupérer la clé publique qui authentifiera la signature du paquet.

```bash
gpg --armor --export [key_id] > pubkey.asc
```

Félicitations, vous avez votre paquet signé ! 👏

---

## 🗄️ Comment créer un miroir et l'authentifier

### 🪞 Comment créer un miroir simple

---

Pour distribuer un paquet, un simple serveur apache suffit (ou NGINX pour ceux qui préfèrent)

Ensuite, nous plaçons le fichier .deb dans un dossier et nous créons les fichiers obligatoires pour distribuer le paquet dans un miroir :

```bash
cd /var/www/html/deb
dpkg-scanpackages . /dev/null | gzip -9c > Packages.gz
```

Après avoir fait cela, nous pouvons ajouter le miroir à nos sources sur notre système en modifiant le fichier 
```
/etc/apt/sources.list.d/[package].list
``` 
et en y mettant

```bash
deb [trusted=yes] http://localhost/deb ./
```

Vous pouvez remplacer `http://localhost/deb` par le chemin réel de votre paquet dans le miroir.
Maintenant que c'est fait, nous pouvons mettre à jour nos sources et télécharger le paquet sur notre système :

```bash
sudo apt update
sudo apt install [example.deb]
```

### 🔑 Comment authentifier la release de notre paquet ?

---

Pour identifier notre dépôt et notre release, nous allons utiliser la clé privée générée précédemment pour signer notre fichier Release dans le miroir.
D'abord, nous créons un fichier Release non signé :

```bash
apt-ftparchive release . > Release
```

Ensuite, nous signons le fichier avec `gpg` :

```bash
gpg --default-key [key_id] -abs -o Release.gpg Release
```

Nous pouvons également signer un fichier InRelease qui est la méthode à privilégier car elle est à jour et plus récente.

```bash
gpg --default-key [key_id] --clearsign -o InRelease Release
```

Félicitations, vous avez créé votre paquet ainsi que votre miroir et l'avez sécurisé ! 👏

### 🔍 Comment cela se passe-t-il en réalité

Dans de nombreux cas, vous ne créerez que les fichiers `InRelease` et `Release` car c'est plus récent et cela coûte moins cher pour apt.
Vous pouvez également créer un fichier `Release.gpg` mais c'est l'ancienne méthode et cela nécessite qu'apt fasse 2 requêtes au serveur au lieu d'une.

Signer le paquet n'est pas vraiment utilisé de nos jours, c'est plutôt utilisé pour signer le fichier Release du miroir.

Par exemple, nous pouvons voir ci-dessous comment un miroir est souvent structuré :

```bash
dists/
└── stable/
    ├── Release
    ├── InRelease
    └── main/
        ├── binary-amd64/
        │   └── Packages
        ├── binary-i386/
        │   └── Packages
        └── source/
            └── Sources
```

Nous pouvons créer plusieurs releases pour différents programmes et architectures, c'est vraiment utile quand vous voulez distribuer beaucoup de paquets.
Comme nous pouvons le voir, nous n'avons qu'un seul fichier `Release` et `InRelease` pour tout le miroir, c'est parce que nous n'allons pas signer les paquets mais seulement le fichier release.
C'est la façon la plus courante de créer un miroir et de distribuer des paquets, c'est aussi la façon utilisée par les miroirs officiels Debian et Ubuntu.

## 💚 Conclusion

Créer un paquet peut être utile dans tellement de situations, c'est l'une des façons de le faire et de gérer votre système mais vous avez plein d'autres façons de le faire.

J'espère que cet article vous a été utile, à bientôt...