# Taktix ✨ [![CodeQL](https://github.com/matthieu-locussol/taktix-app/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/matthieu-locussol/taktix-app/actions/workflows/github-code-scanning/codeql) [![CI](https://github.com/matthieu-locussol/taktix-app/actions/workflows/ci.yml/badge.svg)](https://github.com/matthieu-locussol/taktix-app/actions/workflows/ci.yml) [![Release](https://img.shields.io/github/v/release/matthieu-locussol/taktix-app?label=Release&logo=github)](https://github.com/matthieu-locussol/taktix-app/releases/latest)

The crapiest MMORPG ever.

## Getting started

I use PNPM as a package manager, you can refer to its
[installation process here.](https://pnpm.io/installation)

**1. Clone the repository**

```bash
git clone https://github.com/matthieu-locussol/taktix-app.git
```

**2. Install the dependencies**

```bash
pnpm install
```

**3. Start the development server**

```bash
pnpm dev # In the browser (without Tauri)
```

or

```bash
pnpm dev:app # In the Tauri window
```

## How to add content?

### Maps

If you wish to add a new map to the game, you can create a new map using the
[Tiled Map Editor](https://www.mapeditor.org) and add it under the `public/assets/maps` directory in
the `apps/client` project. **Make sure to give an unique name to your map file that follows the
existing naming convention.**

Make sure to place the object layers on top of the tile layers. Some layers have a reserved name:

-  `Player`: this tile layer is used to set the collisions for the player. Make sure to set the 
-  `Lights`: this object layer is used to set the lights in the map. Each object in this layer can
   define [lights properties](#lights).
-  `Interactive`: this object layer is used to set the interactive objects in the map. For each
   interactive object, [make sure to add it in the game](#interactive-objects). Each object in this
   layer should have an `id` property that matches the `id` of the interactive object in the game.
-  `TeleportationSpots`: this object layer is used to set the teleportation spots in the map.
-  `Fights`: this object layer is used to set the fights in the map.
-  `Npcs`: this object layer is used to set NPCs on the map.

> Layers **Player**, **TeleportationSpots** are mandatory. If these are not present, the map generation script will throw an error.

Make sure to follow the layers guidelines to make sure the map can be correctly generated in the game.
Once the map is added to the project and ready, you can use the following command to generate the map data:

```bash
pnpm generate_maps
```

### Player

The fights layer defines a specific layer property (global):

- `ge_charLayer` (string): set the value to `player`. (**Mandatory**)


### Interactive objects

To add an interactive object in the game, you need to add a new value in the enum
`InteractiveObjectType`. This value needs to match the `id` property of the object in the
`Interactive` layer of the map (case-sensitive).

Once you add a value in this enum, you can check where it is used to add the corresponding logic for
your new interactive object, such as the context menu that appears when you click on the object.

### Lights

To add a light in the game, you can place it in the `Lights` object layer. Each object in this layer
can define the following properties:

-  `intensity` (float): the intensity, or color blend, of the light.
-  `attenuation` (float): the attenuation of the light. This is the reduction of light from the
   center point.
-  `color` (string): the color of the light, given as a hex value.
-  `point` (boolean): if the light should be a point light.
-  `radius` (integer): the radius of the light.
-  `blinking` (boolean): if the light should blink. Default is `false`.
   -  `blinkingDuration` (integer): the duration of the blinking in milliseconds.
   -  `blinkingMaxIntensity` (float): the maximum intensity of the blinking light.
   -  `blinkingMinIntensity` (float): the minimum intensity of the blinking light.
   -  `blinkingSteps` (integer): the number of steps in the blinking animation.

You can find a light object template under the `public/assets/maps/templates` directory in the
`apps/client` project.

### Npcs

To add an NPC in the game, you can place it in the `Npcs` object layer. Each object in this layer can define the following properties:

-  `id` (string): the id of the NPC (case-sensitive).
-  `direction` (string): the direction the NPC is facing. Can be `up`, `down`, `left`, or `right` (case-sensitive).

### Fights

The fights layer defines a specific layer property (global):

- `timeoutRegenerationInMns` (integer): the time in minutes before the fights will be regenerated on the map.

To add a fight in the game, you can place it in the `Fights` object layer. Each object in this layer can define the following properties:

- `fightIds` (string): the ids of the monster groups (as in `fights.ts`) that can spawn when the map regenerate monster groups. If multiple ids are provided, they should be separated by a comma.
- `name` (string): the name of the monster that will represent the monster group on the map.
- `radius` (integer): the monster's radius of movement on the map.
