# Leaflet.FixMyStreet

Leaflet extension for FixMyStreet


## `Leaflet.Urbis` as a sub-project

Add the subtree as a remote, in the `prefix` folder:

```
git remote add -f Leaflet.Urbis git@github.com:CIRB/Leaflet.Urbis.git
git subtree add --prefix lib/leaflet.urbis Leaflet.Urbis master --squash
```

To update the sub-project:

```
git fetch Leaflet.Urbis master
git subtree pull --prefix lib/leaflet.urbis Leaflet.Urbis master --squash
```
