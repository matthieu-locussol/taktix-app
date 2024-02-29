---
id: isqhux0achjm6voa7hpr1b2
title: Statistics
desc: 'Specifications for the game statistics'
updated: 1709127300884
created: 1709126598150
---

$$
\text{stat}_{total} = \left( \sum_{i=1}^{a} \text{added\_stat}_i \right) \times \left(1 + \sum_{j=1}^{b} \text{increased\_stat}_j - \sum_{k=1}^{c} \text{reduced\_stat}_k \right) \times \prod_{l=1}^{d} \left( 1 + \text{more\_stat}_l \right) \times \prod_{m=1}^{e} \left( 1 - \text{less\_stat}_m \right)
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
