# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.24.6](https://github.com/matthieu-locussol/taktix-app/compare/v1.24.5...v1.24.6) (2024-01-22)


### Bug Fixes

* a disconnected user can reconnect correctly ([260cac0](https://github.com/matthieu-locussol/taktix-app/commit/260cac02781583d596265ff82dec347a54b32afc))
* removed import from Protocol ([48a8a25](https://github.com/matthieu-locussol/taktix-app/commit/48a8a253bdc2dd60a028abd4bb884bd194682f2c))

### [1.24.5](https://github.com/matthieu-locussol/taktix-app/compare/v1.24.4...v1.24.5) (2024-01-22)


### Bug Fixes

* automatically disconnect the client when the websocket closes ([6fa280e](https://github.com/matthieu-locussol/taktix-app/commit/6fa280e972e9b4ac3573329c8396934ad1921544))
* don't disconnect clients when the WS has been closed in a consented way ([0d9d929](https://github.com/matthieu-locussol/taktix-app/commit/0d9d9290c2c8731f9ede2102e150005243dd780b))
* removed deleted files from shared index ([be07285](https://github.com/matthieu-locussol/taktix-app/commit/be072853bb46ae0d386f210fe687d586e57251ba))

### [1.24.4](https://github.com/matthieu-locussol/taktix-app/compare/v1.24.3...v1.24.4) (2024-01-21)

### [1.24.3](https://github.com/matthieu-locussol/taktix-app/compare/v1.24.0...v1.24.3) (2024-01-21)


### Bug Fixes

* eslint issues ([82af451](https://github.com/matthieu-locussol/taktix-app/commit/82af451a9f6f835e8dd63dec439b59d23ceebcef))

### [1.24.2](https://github.com/matthieu-locussol/taktix-app/compare/v1.24.0...v1.24.2) (2024-01-21)


### Bug Fixes

* eslint issues ([82af451](https://github.com/matthieu-locussol/taktix-app/commit/82af451a9f6f835e8dd63dec439b59d23ceebcef))

### [1.24.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.24.0...v1.24.1) (2024-01-21)


### Bug Fixes

* eslint issues ([82af451](https://github.com/matthieu-locussol/taktix-app/commit/82af451a9f6f835e8dd63dec439b59d23ceebcef))

## [1.24.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.23.0...v1.24.0) (2023-10-10)


### Features

* added a NewsStore & moved server online logic to it ([03166cd](https://github.com/matthieu-locussol/taktix-app/commit/03166cd80c2a84a0b30c1e14bcd585ae2887bb95))
* added a ScreenStore & moved mode logic from LoginStore to ScreenStore ([031091f](https://github.com/matthieu-locussol/taktix-app/commit/031091f17ce4e97202662852b2f6f8747f793798))
* disconnect user if already connected ([8f816cf](https://github.com/matthieu-locussol/taktix-app/commit/8f816cff937d774941a9408de08a27461813e0d3))
* GameBackground stays coherent between screens ([e8cc46b](https://github.com/matthieu-locussol/taktix-app/commit/e8cc46bce40a1d9d5a8a6cca4f32b377e4869d8e))

## [1.23.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.22.1...v1.23.0) (2023-10-09)


### Features

* it is now possible to delete a character ([69fbf93](https://github.com/matthieu-locussol/taktix-app/commit/69fbf93fddc36f4e4ab4a88e38b0b59ccde472e8))


### Bug Fixes

* updated turbo config ([f69196f](https://github.com/matthieu-locussol/taktix-app/commit/f69196f3eded0f04405a56c41c2b17d3294643f7))

### [1.22.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.22.0...v1.22.1) (2023-10-08)


### Bug Fixes

* character creation bugs ([eefdf2d](https://github.com/matthieu-locussol/taktix-app/commit/eefdf2d763f9c5eae9d2040118032dd2047a8d2a))

## [1.22.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.21.3...v1.22.0) (2023-10-07)


### Features

* added character selection screen & selectCharacter packets ([34651f1](https://github.com/matthieu-locussol/taktix-app/commit/34651f170baa6549ae45286304ddf645d74462ff))
* added register endpoint ([d1d72b0](https://github.com/matthieu-locussol/taktix-app/commit/d1d72b01cc06cf85ad67c71b382ab83b2eb4700c))
* it is possible to create characters ([bbcfb6b](https://github.com/matthieu-locussol/taktix-app/commit/bbcfb6b20a1bee74061fb121b5e0c193e576ab54))

### [1.21.3](https://github.com/matthieu-locussol/taktix-app/compare/v1.21.2...v1.21.3) (2023-10-05)


### Bug Fixes

* attempt to use dangerous http scheme ([27542c3](https://github.com/matthieu-locussol/taktix-app/commit/27542c3f26cda0f8692e4bec63ee20b91b4894bc))

### [1.21.2](https://github.com/matthieu-locussol/taktix-app/compare/v1.21.1...v1.21.2) (2023-10-05)

### [1.21.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.21.0...v1.21.1) (2023-10-05)


### Bug Fixes

* attempt to fix windows websocket calls ([9385f16](https://github.com/matthieu-locussol/taktix-app/commit/9385f165cb1ff51733490e0de2f22f71fbb26c84))

## [1.21.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.20.1...v1.21.0) (2023-10-05)


### Features

* better loading login screen & handle login server-side ([fd23f50](https://github.com/matthieu-locussol/taktix-app/commit/fd23f50f544b5205bb78a077e65a12472393d9d1))


### Bug Fixes

* better loading on login screen ([7dab860](https://github.com/matthieu-locussol/taktix-app/commit/7dab860b05c45497742a5c192760320089b2fbfb))
* removed useless fontFamily attributes ([1f1751f](https://github.com/matthieu-locussol/taktix-app/commit/1f1751f041a64ca66f5b94ececca05f4f4ae1ba3))
* updated production server url ([7ca6e63](https://github.com/matthieu-locussol/taktix-app/commit/7ca6e63db9569165ba4c608d30f68d7bacace9f9))

### [1.20.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.20.0...v1.20.1) (2023-10-05)

## [1.20.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.19.0...v1.20.0) (2023-10-04)

### Features

-  fix cors issues
   ([5c18c6d](https://github.com/matthieu-locussol/taktix-app/commit/5c18c6d833f2c413b435606e7104a356084413fb))
-  updated server build commands
   ([253ab7f](https://github.com/matthieu-locussol/taktix-app/commit/253ab7fe401013b0b31236fb4f835335fcb4cec5))

## [1.19.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.18.4...v1.19.0) (2023-10-04)

### Features

-  added fastify cors plugin & ServerStatus component
   ([941d4f9](https://github.com/matthieu-locussol/taktix-app/commit/941d4f9256d17bded7b4eb5ed6fdf716d1b02c2c))

### Bug Fixes

-  updated production server address
   ([9627bdb](https://github.com/matthieu-locussol/taktix-app/commit/9627bdb47250dbebe89f443216d7150d295a8eb6))

### [1.18.4](https://github.com/matthieu-locussol/taktix-app/compare/v1.18.3...v1.18.4) (2023-10-04)

### [1.18.3](https://github.com/matthieu-locussol/taktix-app/compare/v1.18.2...v1.18.3) (2023-10-03)

### Bug Fixes

-  external players are also enlighted correctly
   ([3fc6a2c](https://github.com/matthieu-locussol/taktix-app/commit/3fc6a2cf07d405bb84dca8ce42608851ab353b28))

### [1.18.2](https://github.com/matthieu-locussol/taktix-app/compare/v1.18.1...v1.18.2) (2023-05-29)

### [1.18.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.18.0...v1.18.1) (2023-05-29)

## [1.18.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.17.0...v1.18.0) (2023-05-29)

### Features

-  added dynamic lights
   ([c283ff2](https://github.com/matthieu-locussol/taktix-app/commit/c283ff2841dc949c8c0e2142a09474d483306467))

## [1.17.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.16.0...v1.17.0) (2023-02-17)

### Features

-  updated website download urls
   ([e15690b](https://github.com/matthieu-locussol/taktix-app/commit/e15690b7696d07af5dca5a7430ba4a061fd63549))

## [1.16.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.15.0...v1.16.0) (2023-02-17)

### Features

-  added a LoginStore & updated packages
   ([4deb03e](https://github.com/matthieu-locussol/taktix-app/commit/4deb03ea42993025a9fd5bff74318b3659e662b5))
-  added an UpdaterStore
   ([71f06a2](https://github.com/matthieu-locussol/taktix-app/commit/71f06a2305352d4b83466eb3b66b80e6db03c4e8))
-  added Client & State specs
   ([1879dbc](https://github.com/matthieu-locussol/taktix-app/commit/1879dbc581b87d54465d7f3d9076a8028f91bee3))
-  handle login & username check on the backend
   ([98305f7](https://github.com/matthieu-locussol/taktix-app/commit/98305f71b73f2a944f95a8a355fd84c10a81a538))
-  reserved INTERNAL_PLAYER_NAME
   ([b936531](https://github.com/matthieu-locussol/taktix-app/commit/b936531fc545bed1eef639f09a419f7c62c8e0a1))

## [1.15.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.14.0...v1.15.0) (2023-02-15)

### Features

-  added a global State to server
   ([c7e1dd9](https://github.com/matthieu-locussol/taktix-app/commit/c7e1dd9cc02ae5c3d6b5ea7e030e0cb3a680948a))
-  added getOtherPlayers to State
   ([b020de1](https://github.com/matthieu-locussol/taktix-app/commit/b020de12e80f98859c2fdce2a2ada48a0930881d))

## [1.14.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.13.0...v1.14.0) (2023-02-12)

### Features

-  added a SocketStore
   ([76d9ead](https://github.com/matthieu-locussol/taktix-app/commit/76d9ead21b7b729484fa04b9e47168f5fc8cdf54))
-  added React StrictMode
   ([3dc842f](https://github.com/matthieu-locussol/taktix-app/commit/3dc842fd69d8b35a695b9a9e74ee744d6ad0b151))
-  added send method to SocketStore
   ([9162caa](https://github.com/matthieu-locussol/taktix-app/commit/9162caad1a396fffe04c781125023174610e0082))

## [1.13.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.12.0...v1.13.0) (2023-02-09)

### Features

-  added a custom updater
   ([da6b82a](https://github.com/matthieu-locussol/taktix-app/commit/da6b82a4717ab388e5059fb4719f8f1de7781fc9))

## [1.12.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.11.0...v1.12.0) (2023-02-09)

### Features

-  added a moveExternalPlayer method
   ([3a9ac93](https://github.com/matthieu-locussol/taktix-app/commit/3a9ac939f80aad9cf8c90b540a54f19c1cf670f0))
-  added addExternalPlayer method
   ([4acbe4c](https://github.com/matthieu-locussol/taktix-app/commit/4acbe4caadfc3fbd25383de8e196b366f4b07741))
-  added PlayerJoinMap message & response
   ([731823c](https://github.com/matthieu-locussol/taktix-app/commit/731823c808a85a41b47020417eb06209b569eb11))
-  added PlayerLeaveMap message & response
   ([2b032d4](https://github.com/matthieu-locussol/taktix-app/commit/2b032d47a063cf3770e0344f7d9058985464b86d))
-  added PlayerMove message & response
   ([c86d35c](https://github.com/matthieu-locussol/taktix-app/commit/c86d35ce83ff8fff01b78d955cd94def21922e3e))
-  can delete sprite from scene
   ([088f311](https://github.com/matthieu-locussol/taktix-app/commit/088f311e4fee45bbb5be959f291529f539c25ebe))
-  client correctly handles PlayerJoinMap messages
   ([165db7d](https://github.com/matthieu-locussol/taktix-app/commit/165db7dbaf5e37e9ce1ba0e09e1045bafde56933))
-  players can see other players moving
   ([318c3cb](https://github.com/matthieu-locussol/taktix-app/commit/318c3cb4bb9e180e9f73204d179dc7b77d1b6196))
-  users can correctly change map & see other users
   ([9641d80](https://github.com/matthieu-locussol/taktix-app/commit/9641d803b0dc80e0517d94f2f49bdc9be6dd08a7))

### Bug Fixes

-  handleChangeMapResponse error
   ([c045cde](https://github.com/matthieu-locussol/taktix-app/commit/c045cdeaf68c90e34202e550fd6831d196ca4945))
-  musics on Scene
   ([e3bb368](https://github.com/matthieu-locussol/taktix-app/commit/e3bb3687a78c3f8b5f0770f38864df83c16c7a58))
-  removed map from joinMapMessage
   ([9a387f8](https://github.com/matthieu-locussol/taktix-app/commit/9a387f82b4c9c9e73da17f341aa8ae98a6bca38e))

## [1.11.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.10.0...v1.11.0) (2023-02-08)

### Features

-  correctly handles map change
   ([08a6d78](https://github.com/matthieu-locussol/taktix-app/commit/08a6d78c9edaf391d1d837b936ccde2275871457))
-  updated position packets & display user name
   ([47a3c11](https://github.com/matthieu-locussol/taktix-app/commit/47a3c11e01f3dfbb2584a1075ca3623a3b3bc165))

## [1.10.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.9.1...v1.10.0) (2023-02-08)

### Features

-  name input & correct loading
   ([0b34f83](https://github.com/matthieu-locussol/taktix-app/commit/0b34f83a246e67a62c5e4433a6701f5bd87b61c9))

### Bug Fixes

-  scene fade in, chatbox messages input, screen loader
   ([4c4571b](https://github.com/matthieu-locussol/taktix-app/commit/4c4571ba54b05e5021f56a9ab228c3a7ff69fbea))

### [1.9.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.9.0...v1.9.1) (2023-02-08)

### Bug Fixes

-  character store specs
   ([e6d0c05](https://github.com/matthieu-locussol/taktix-app/commit/e6d0c058e9171e2955c2e2521b786bc38a9e57ed))

## [1.9.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.8.0...v1.9.0) (2023-02-07)

### Features

-  added prisma, database & load character position from the database
   ([31e1b3f](https://github.com/matthieu-locussol/taktix-app/commit/31e1b3fb9580d216f953e3c93ed82a74c9cfd467))
-  correctly handles player moves
   ([a99100d](https://github.com/matthieu-locussol/taktix-app/commit/a99100dad7cdc68b315e2974ef82d7b28fec007c))

## [1.8.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.7.3...v1.8.0) (2023-02-06)

### Features

-  added vite public env files
   ([8583c3c](https://github.com/matthieu-locussol/taktix-app/commit/8583c3c98b09507f53f4b3342ab9bc4fd1a325ad))

### [1.7.3](https://github.com/matthieu-locussol/taktix-app/compare/v1.7.2...v1.7.3) (2023-02-06)

### Bug Fixes

-  updated server url
   ([b094d3e](https://github.com/matthieu-locussol/taktix-app/commit/b094d3eba691365608d20fb0a9c85d82ae43f09f))

### [1.7.2](https://github.com/matthieu-locussol/taktix-app/compare/v1.7.1...v1.7.2) (2023-02-06)

### Bug Fixes

-  tests
   ([af1f71b](https://github.com/matthieu-locussol/taktix-app/commit/af1f71b05330070ea62f11e59ae0ab26a274cf91))

### [1.7.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.7.0...v1.7.1) (2023-02-06)

### Bug Fixes

-  correctly handles player logged out
   ([f0f952d](https://github.com/matthieu-locussol/taktix-app/commit/f0f952d8e6d3d5208e2bc49835918de4f3bb6bb8))

## [1.7.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.6.0...v1.7.0) (2023-02-05)

### Features

-  added a super simple chat system
   ([bac7cd2](https://github.com/matthieu-locussol/taktix-app/commit/bac7cd2557eef1bf9ffad1e0dfcb587bc9a06ad8))
-  added mui & a chatbox to the client
   ([a3f0e96](https://github.com/matthieu-locussol/taktix-app/commit/a3f0e968e87649a8732fe972d80e8edf87477f26))
-  added phaser base game & removed splashscreen
   ([6f5b878](https://github.com/matthieu-locussol/taktix-app/commit/6f5b878c76560b3522eebeeb07b29a9baeb2b3b5))

### Bug Fixes

-  console warning
   ([bb89068](https://github.com/matthieu-locussol/taktix-app/commit/bb8906808b05c5e0bfdd822b7232f53752149f39))
-  updated website download buttons
   ([c43447f](https://github.com/matthieu-locussol/taktix-app/commit/c43447ff0abe55b0e46e0fabe4b25fb0f8aecad4))

## [1.6.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.5.0...v1.6.0) (2023-02-05)

### Features

-  updated icons & README
   ([fbfc750](https://github.com/matthieu-locussol/taktix-app/commit/fbfc750a2a05dfe986c4acd4455ecf815b22ac52))
-  updated vite config
   ([4af1960](https://github.com/matthieu-locussol/taktix-app/commit/4af1960ea259f0eb698baee05c992dad9e3ad834))

## [1.5.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.4.1...v1.5.0) (2023-02-04)

### Features

-  updated website
   ([aec8d00](https://github.com/matthieu-locussol/taktix-app/commit/aec8d004a0cabfdf2e5f1fd64ee2f9146dec4265))

### [1.4.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.4.0...v1.4.1) (2023-02-04)

### Bug Fixes

-  updated splashscreen
   ([f670fe7](https://github.com/matthieu-locussol/taktix-app/commit/f670fe72e5862abd4c1fbe38385faa4360c7a307))

## [1.4.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.3.2...v1.4.0) (2023-02-04)

### Features

-  added a splashscreen
   ([6123647](https://github.com/matthieu-locussol/taktix-app/commit/61236478bf0fb1a4dbe1f0237297428a2c2e262d))

### Bug Fixes

-  updated version script to update all packages versions
   ([2e8fdef](https://github.com/matthieu-locussol/taktix-app/commit/2e8fdef5fc1e55a802b257c84378726ee05ae164))

### [1.3.2](https://github.com/matthieu-locussol/taktix-app/compare/v1.3.1...v1.3.2) (2023-02-04)

### [1.3.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.3.0...v1.3.1) (2023-02-04)

## [1.3.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.2.2...v1.3.0) (2023-02-04)

### Features

-  displays version in App
   ([b4cca7d](https://github.com/matthieu-locussol/taktix-app/commit/b4cca7d43b23978cdda2405000c5d23ece2a34ca))

### Bug Fixes

-  no cache for bumpversion
   ([d394701](https://github.com/matthieu-locussol/taktix-app/commit/d394701b1ca6cba3fccbcb2926dc2ce34b142a05))

### [1.2.2](https://github.com/matthieu-locussol/taktix-app/compare/v1.2.1...v1.2.2) (2023-02-04)

### [1.2.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.2.0...v1.2.1) (2023-02-04)

### Bug Fixes

-  updated version endpoint
   ([e6abd5c](https://github.com/matthieu-locussol/taktix-app/commit/e6abd5c7a4c73a600e0a9dab921868d1ee60ef98))

## [1.2.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.18...v1.2.0) (2023-02-04)

### Features

-  updated client
   ([22a8812](https://github.com/matthieu-locussol/taktix-app/commit/22a8812a2e8ba0c83ef14c952a5a2bb48484e06a))

### [1.1.18](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.17...v1.1.18) (2023-02-03)

### [1.1.17](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.16...v1.1.17) (2023-02-03)

### [1.1.16](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.15...v1.1.16) (2023-02-03)

### [1.1.15](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.14...v1.1.15) (2023-02-03)

### [1.1.14](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.13...v1.1.14) (2023-02-03)

### [1.1.13](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.12...v1.1.13) (2023-02-03)

### Features

-  added updated configuration
   ([a56b036](https://github.com/matthieu-locussol/taktix-app/commit/a56b0362c13b6f94b5218b7ba4a2a08dbb0f3d9e))

### [1.1.12](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.11...v1.1.12) (2023-02-03)

### Features

-  added a version page to the website
   ([dd8e654](https://github.com/matthieu-locussol/taktix-app/commit/dd8e65451270beeb96c382a776cae190a9765c60))

### [1.1.11](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.10...v1.1.11) (2023-02-03)

### [1.1.10](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.9...v1.1.10) (2023-02-03)

### Bug Fixes

-  newline
   ([fd76b53](https://github.com/matthieu-locussol/taktix-app/commit/fd76b53c0ff13986c9f653a9db0de42a678383de))

### [1.1.9](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.8...v1.1.9) (2023-02-02)

### [1.1.8](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.7...v1.1.8) (2023-02-02)

### [1.1.7](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.6...v1.1.7) (2023-02-02)

### [1.1.6](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.5...v1.1.6) (2023-02-02)

### [1.1.5](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.4...v1.1.5) (2023-02-02)

### [1.1.4](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.3...v1.1.4) (2023-02-02)

### [1.1.3](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.2...v1.1.3) (2023-02-02)

### [1.1.2](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.1...v1.1.2) (2023-02-02)

### [1.1.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.1.0...v1.1.1) (2023-02-02)

### Features

-  updated ports
   ([4665157](https://github.com/matthieu-locussol/taktix-app/commit/4665157aea23972a48ad08ee16f4784d2f7fcd0a))

## [1.1.0](https://github.com/matthieu-locussol/taktix-app/compare/v1.0.2...v1.1.0) (2023-02-02)

### Features

-  added website app
   ([fca80c7](https://github.com/matthieu-locussol/taktix-app/commit/fca80c7b6de163d462b5f4723eb714c6c227225c))
-  bumped tauri versions
   ([0a3d5fa](https://github.com/matthieu-locussol/taktix-app/commit/0a3d5fad199715a564e72abfeec13827b7d1a978))
-  log visually informations
   ([cc8bcf4](https://github.com/matthieu-locussol/taktix-app/commit/cc8bcf40d5b970b3cf091233b4b64304c2123690))

### 1.0.2 (2023-02-02)

### Features

-  added handleServerResponse
   ([02a0898](https://github.com/matthieu-locussol/taktix-app/commit/02a0898bdff3daf19fccb87e846520623d52c0f4))
-  added Packet abstraction
   ([cfec468](https://github.com/matthieu-locussol/taktix-app/commit/cfec4680229954c7ce60c70984f08152b9b15ac0))
-  added tauri files
   ([f8cb1e5](https://github.com/matthieu-locussol/taktix-app/commit/f8cb1e5e4538655e7a29381afcf0b32e9bc74a9a))
-  changed title
   ([0a5257d](https://github.com/matthieu-locussol/taktix-app/commit/0a5257d1c2531820aadadfe246158880bba75ba4))

### Bug Fixes

-  ci
   ([a64889d](https://github.com/matthieu-locussol/taktix-app/commit/a64889d88f745d4e8868474f2d079d8915b04f53))

### [1.0.1](https://github.com/matthieu-locussol/taktix-app/compare/v1.0.0...v1.0.1) (2023-01-29)

## 1.0.0 (2023-01-29)

### Features

-  added .github files
   ([2ec6a5e](https://github.com/matthieu-locussol/taktix-app/commit/2ec6a5eb97b32e66bbe1422ce73ed4a1a0657e41))
-  added base project structure
   ([b4e8881](https://github.com/matthieu-locussol/taktix-app/commit/b4e88812021ab464df052c7d52be1ec3b2ab5bfe))
-  added pre-commit hooks
   ([b8e08e8](https://github.com/matthieu-locussol/taktix-app/commit/b8e08e8ba7b0d5b98b14e39f07c959e202761411))
-  added Schemas, handlers & client payloads
   ([78b73ff](https://github.com/matthieu-locussol/taktix-app/commit/78b73ff262193737faf74a542eea836cf79f2aa0))
