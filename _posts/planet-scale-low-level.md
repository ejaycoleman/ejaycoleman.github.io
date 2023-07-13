---
title: "Planet Scale: A Low Level Deepdive"
coverImage: "/assets/blog/planet-scale-low-level/cover.png"
date: "2023-12-09T05:35:07.322Z"
---

## How do PlanetScale and Vitess differ?

Vitess is a MySQL solution designed for deploying, scaling, and managing big data.

PlanetScale offers Vitess in the cloud, providing a GUI, CLI, and, most recently (Jan ‘23), an API. Traditionally, configuring custom, scalable databases can be a difficult task, often requiring two teams: infrastructure and database administrators.

PlanetScale completely abstracts this by offering a fully managed Vitess cluster, along with comprehensive interfaces and additional features, reducing effort and concerns about infrastructure.

## How does PlanetScale use Vitess?

When a database is spun up on PlanetScale, behind the scenes, an entirely new Vitess cluster is created. This includes everything from the databases to the Vitess components, such as VTTablets and VTGate, which I explain in more detail later in this post. The database can then be connected via exposed connection strings, as described in the previous PlanetScale article I wrote.

> Read the rest of the article here: [YLD: PlanetScale and Vitess: A Technical Deepdive by Elliott Coleman](https://www.yld.io/blog/planet-scale-and-vitess-a-technical-deepdive/)
