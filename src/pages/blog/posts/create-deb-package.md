---
layout: /src/layouts/MarkdownPostLayout.astro
title: How to create .deb package and create a mirror to distribute it
author: Pierre-Louis Leclerc | Proxyfil
description: "Every program can be transformed into a .deb package. It is really useful for small scripts that you use ofter, let's try to create one together ! ⚙️"
image:
  url: "/images/posts/create-deb-package.webp"
  alt: "Illustration with Linux logo and a package."
pubDate: 2025-06-02
tags:
  [
    "Bash", "System"
   
  ]
languages: ["bash"]
---

Create .deb package can be really useful when you have repetitive tasks to do. This can also be an easy way to share your tools with mirror and spread your system managing packages throught internet.
Let's see how we can create a package and share it to the world !

## 📁 How to create your package ?

### 🏗️ Package architecture

---

Anything can become a .deb package, that's the main thing to remember.
With this work there are some standards in the architecture of your package, you should follow these guidelines :

```bash
[package_name]/
├── DEBIAN/
│   ├── control
│   └── postinst
│   └── prerm
└── lib/[package_name]/
		└── [script_sources]
```

Here we can look for some things. The folder `DEBIAN` contains every hooks and general informations of our package, this is an essential folder for the packet.
The other folder contains the location of the installation of our package and our sources files as well.

### 📝 Content of the control file

---

The control file is the heart of the package. We can see and example juste below.

```bash
Package: mypackage
Version: 1.0
Architecture: all
Maintainer: Example <example@example.com>
Depends: python3, python3-tz
Description: Show the date
```

We can see here the informations about the package and the dependances along with the description.
It is also possible to add conflicts with dependencies to remove them from the system.

### 📝 Contents of the files postinst and prerm

---

The file postinst is used to execute a script after the deployment of the files of the package, this is useful to create symlinks.

```bash
#!/bin/bash
ln -s /usr/lib/[example]/[example.py] /usr/bin/[example]
chmod +x /usr/bin/[example]
```

The file prerm is used to execute a script after the deletion of the files.

```bash
#!/bin/bash
rm -f /usr/bin/[example]
```

If you want you can use a bunch of different hooks but we will not talk about this subject here.

### 🆕 Create our package

---

To create a .deb package we are gonna use `dpkg-deb` like in the next command, you have to execute it above your package's folder.

```bash
dpkg-deb --build [example]
```

This is gonna create a .deb package of our code.

### ✒️ How to sign our package

---

Even if this is not mandatory we are gonna secure our package. To do so we are going to create a private key with `gpg`.

```bash
gpg --full-generate-key
```

After entering some informations you're gonna get your private key or at least an identifier : **Note the ID somewhere**
Then we are going to sign the package with gpg to get a .deb.sig file.

```bash
gpg --default-key [key_id] --detach-sign [example.deb]
```

Finally we are going to get the public key that will authentify the signature of the package.

```bash
gpg --armor --export [key_id] > pubkey.asc
```

Congratulation, you have your signed package ! 👏

---

## 🗄️ How to create a mirror and authentify it

### 🪞 Comment on créer le mirroir trivial

---

To distribute a package a simple apache server is enough (or NGINX for those who prefer)

Then we put the .deb file in a folder and we create the mandatory files to distribute the package in a mirror :

```bash
cd /var/www/html/deb
dpkg-scanpackages . /dev/null | gzip -9c > Packages.gz
```

After doing so we can add the mirror to our sources on our system by modifying the file `/etc/apt/sources.list.d/[package].list` and putting

```bash
deb [trusted=yes] http://localhost/deb ./
```

You can replace `http://localhost/deb` with the actual path of your package in the mirror.
Now that this is done we can update our sources and download the package on our system :

```bash
sudo apt update
sudo apt install [example.deb]
```

### 🔑 How to authentify the release of our package ?

---

To identify our depot and our release we are going to use the private key generated previously to sign our Release file in the mirror.
First we create a Release file un-signed :

```bash
apt-ftparchive release . > Release
```

Then we sign the file with `gpg` :

```bash
gpg --default-key [key_id] -abs -o Release.gpg Release
```

We can also sign an InRelease file which is the method to prefer because it is up to date and more recent.

```bash
gpg --default-key [key_id] --clearsign -o InRelease Release
```

Congratulation you've created your package along with your mirror and secured it ! 👏

## 💚 Conclusion

Creating a package can be useful in so much situations, this is one of the way to do it and manage your system but you have plenty of other ways to do so.

I hope this post was useful for you, see you soon...