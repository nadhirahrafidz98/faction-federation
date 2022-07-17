# Faction Federation Fronted

Frontend for Faction Federation (MERN stack) with Socket.io to listen in to broadcasts from server side.

Made for 6 Factions (6th Faction is Factious). 

## Start development server on localhost:3000
```
npm start
```

## Deployment
Deployed to heroku using GitHub automatic deployment. 

Continuous deployment tested and successful (17/7/2022). 

[Heroku App Dashboard](https://dashboard.heroku.com/apps/faction-federation)

## Changing Factions
**Important: Faction Names and ID pairing must be correct**

Single source of truth: MongoDB factions Collection (factionId and factionName)

### Change Faction Names, Motto & Trade Key via MongoDB
1. Login to MongoDB (nadhirahrafidz.work@gmail.com)
2. Navigate to ``Maybank`` project
3. Database > Browse Collections > Factions
4. Make changes to ``factionName`` (take note the corresponding factionId of each Faction)
5. Make changes to ``motto`` field. 
6. (Optional) Change trade key (password) 
7. Update document

### Routes
Routes can be changed in **faction_frontend/src/App.js**

Ensure Faction and id prop match (based on MongoDB pairing)
1. Change path of each route. Pattern is [FACTION NAME][BCD PIC's birthday date]
2. Change Faction component's name prop

### Faction Names in Faction.js
Lines 61 - 75

pattern: 
```
case [factionID]:
    return [factionName]
```

### Faction Names in TradeTable.js
Line 18 

pattern: 
```
["factionName", factionId]
```

### Faction Names in Trading.js
Line 18 

pattern: 
```
["factionName", factionId]
```

### Market value of resources
Lines 15-55


### Faction Background

**Important**: compress the images to improve website's performance [Image Compressor](https://imagecompressor.com/)

1. Navigate to faction_frontend/public/background
2. Naming convention: ``[factionId]-background.png``
3. Replace background img with new background img and **ensure naming convention and filetype is right** 

### Faction Logo

1. Navigate to faction_frontend/public/logo
2. Naming convention: `[factionId].png``
3. Replace logo img with new logo img and =**=ensure naming convention and filetype is right** 




