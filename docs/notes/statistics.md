---
id: isqhux0achjm6voa7hpr1b2
title: Statistics
desc: Specifications for the game statistics
updated: 1710408315497
created: 1709126598150
---

### Main

_Can be increased every level but also through items & talents._

-  Health
   -  +**\#** to maximum health
   -  **\#**% increased maximum health
-  Magic shield
   -  +**\#** to maximum magic shield
   -  **\#**% increased maximum magic shield
-  Strength
   -  +**\#** to strength
   -  **\#**% increased strength
-  Spirit
   -  +**\#** to spirit
   -  **\#**% increased spirit
-  Dexterity
   -  +**\#** to dexterity
   -  **\#**% increased dexterity
-  Luck
   -  +**\#** to luck
   -  **\#**% increased luck
-  _**Based on base statistics**_
   -  +**\#** _**to all attributes**_
   -  **\#**% _**increased attributes**_

#### Notes

-  Strength is linked to earth damages
-  Spirit is linked to fire damages
-  Dexterity is linked to wind damages
-  Luck is linked to ice damages

-  Every 5 strength grants an additional 1 maximum life
-  Every 5 spirit grants an additional 1 maximum magic shield
-  Every 5 dexterity grants an additional 1 maximum evasion
-  Every 5 luck grants an additional 1 prospect

-  Items can have a requirement in strength, spirit, dexterity and/or luck

### Secondary

_Can be increased through items & talents._

#### Offenses

-  Elemental damages (earth, fire, wind, ice) ([formula](#statistics))
   -  **\#**% increased **_element_** damage
   -  **\#**% more **_element_** damage
   -  +**\#** to **_element_** damage
   -  **\#**% increased elemental damages
   -  **\#**% more elemental damages
   -  +**\#** to all elemental damages
-  Weapon-specific damages ([formula](#damages))
   -  **\#**% increased **_weapon_** damage
   -  **\#**% more **_weapon_** damage
   -  +**\#** to **_weapon_** damage
-  Critical strike chance ([formula](#critical-strike-chance))
   -  **\#**% increased critical strike chance
   -  **\#**% to critical strike damage multiplier
-  Life steal ([formula](#life-steal))
   -  +**\#** to life gained on hit
   -  **\#**% increased life steal
-  Thorns damages
   -  reflects **\#**% of physical damages taken
   -  reflects **\#**% of magical damages taken
-  Area of effect damages ([formula](#area-of-effect-damages))
   -  **\#**% increased area damages
-  Precision ([formula](#precision-and-evasion))
   -  +**\#** to precision
   -  **\#**% increased precision

#### Defences

-  Elemental resistances (earth, fire, wind, ice) ([formula](#damages))
   -  **\#**% reduced **_element_** damages taken
   -  **\#**% less **_element_** damages taken
   -  **\#**% **_element_** resistance
   -  +**\#** to **_element_** resistance
   -  **\#**% to all elemental resistances
   -  +**\#** to all elemental resistances
-  Critical resistance
   -  +**\#** to critical strike resistance
   -  +**\#**% to critical strike resistance
-  Evasion ([formula](#precision-and-evasion))
   -  +**\#** to evasion
   -  **\#**% increased evasion

#### Notes

-  Life steal does not affect magic shield

### Misc value

-  Prospect
   -  adds **\#** to prospect
-  Initiative ([formula](#initiative))
   -  adds **\#** to initiative

#### Notes

-  Prospect is influenced by luck
-  Initiative is influenced by strength, spirit, dexterity and luck

### Formulas

#### Statistics

$$
\text{total}_{statistic} = \left( \sum_{i=1}^{a} \text{added\_stat}_i \right) \times \left(1 + \sum_{j=1}^{b} \text{increased\_stat}_j - \sum_{k=1}^{c} \text{reduced\_stat}_k \right) \times \prod_{l=1}^{d} \left( 1 + \text{more\_stat}_l \right) \times \prod_{m=1}^{e} \left( 1 - \text{less\_stat}_m \right)
$$

$$
\begin{align*}
& a \text{ the total amount of added stats} & a &\in \mathbb{N}_0 \\
& b \text{ the total amount of increased stats} & b &\in \mathbb{N}_0 \\
& c \text{ the total amount of reduced stats} & c &\in \mathbb{N}_0 \\
& d \text{ the total amount of more stats} & d &\in \mathbb{N}_0 \\
& e \text{ the total amount of less stats} & e &\in \mathbb{N}_0
\end{align*}
$$

#### Damages

$$
\text{damages}_{base} = \text{damages}_{weapon} + \text{damages}_{weapon} \times \left( \frac{\text{total}_{weapon}}{100} \right)
$$

$$
\text{damages}_{statistic} = \text{damages}_{base} + \text{damages}_{base} \times \left( \frac{\left( \text{attributes}_{all} + \text{total}_{statistic} \right)}{100} \right)
$$

$$
\text{damages}_{final} = \text{damages}_{statistic} - \text{resistance}_{statistic} - \left( \frac{\frac{\text{damages}_{statistic}}{100}}{\text{\%resistance}_{statistic}} \right)
$$

#### Critical strikes

$$
\text{critical}_{chance}=\text{critical}_{base} \times (1+{\text{critical}_{increased}})
$$

$$
\text{critical}_{damages}=\text{damages}_{final} \times (1+{\text{critical}_{multiplier}})
$$

$$
\text{critical}_{final}=\text{critical}_{damages} - \text{resistance}_{critical} - \left( \frac{\frac{\text{critical}_{damages}}{100}}{\text{\%resistance}_{critical}} \right)
$$

#### Area of effect damages

$$
\text{damages}_{area}=\text{damages}_{final} \times (1-\text{distance\_from\_targeted\_enemy} \times 0.25) \times (1+\text{increased\_area\_damages})
$$

#### Initiative

$$
\text{initiative}_{total}=\text{initiative}_{base}+\text{added\_initiative}+(\text{strength}_{total}+\text{spirit}_{total}+\text{dexterity}_{total}) \times 0.5
$$

#### Precision and evasion

$$
\text{hit}_{chance}=min \left( max \left( \frac{1.25 \times \text{attacker}_{accuracy}}{\text{attacker}_{accuracy}+\left( \text{defender}_{evasion} \times \frac{1}{5} \right)^{0.9}}, 0.05 \right), 1 \right)
$$
