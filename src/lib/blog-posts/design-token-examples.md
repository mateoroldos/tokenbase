---
title: 'Design Token Examples'
date: '2023-10-19'
updated: '2023-10-19'
categories:
  - design
coverImage: '/images/design-token-examples/design-token-examples.png'
coverWidth: 16
coverHeight: 9
excerpt: Find the top design token examples to centralize your design decisions.
---

Product design is not only about aesthetics, it's about creating user experiences that are both visually attractive and functional. Getting to this balance is challenging, especially when working on multiple projects with both designers and developers. This is why design tokens were created.

- [What Are Design Tokens?](#what-are-design-tokens)
- [Design Token Examples](#design-token-examples)
  - [Color](#color)
  - [Dimension](#dimension)
  - [Font](#font)
  - [Duration](#duration)
  - [Cubic Beizer](#cubic-beizer)
  - [Number](#number)
- [Last Words](#last-words)

## What Are Design Tokens?

Design tokens are small, reusable pieces of design information that represent design decisions. These decisions can relate to color, fonts, spacing, and more. Think of them as the building blocks of your design language.

Design tokens are crucial because they centralize design decisions, simplifying their management and distribution. By centralizing these decisions, making changes is super easy, as you only need to change from there and that will update everywhere were it is used.

## Design Token Examples

So, design tokens represent the different building blocks of the product’s elements. But, how can we classify these different elements?

We have created this list with the most common examples of design tokens:

### Color

Color is one of the most critical elements in design. The selection and consistency of colors play a crucial role in creating a cohesive and visually appealing user experience. Design tokens simplify the management of colors by assigning them distinct identifiers that are easy to remember, rather than relying on inconvenient HEX codes.

Color tokens can take on different forms. They can be defined as global colors, such as "main-red," ensuring that this specific shade of red remains consistent across your product. Alternatively, color tokens can be tied to specific components or use cases, like "background-contact-button" used for that specific use case.

![Token color](/images/design-token-examples/color.png)

### Dimension

While dimension may seem like a broader concept compared to color, it just refers to an amount of distance. In practice, this includes aspects like margins, padding, or size of components.

Dimension tokens are essential for establishing and preserving uniform distances within your design system. Importantly, dimension tokens are always tied to specific units of measurement, typically pixels (px) or relative em units (rem).

### Font

Fonts play an essential role in design, not only because they promote legibility, but they also help communicate the message adding tone and personality. Usually brands have in between 1 to 3 fonts they use for different cases.

Font has different aspects to take into consideration, that’s why font tokens can be breakdown into:

**Font Family**

Font family is used to define the collection of related fonts (like bold or italic) of the same font. For example, “Roboto”.

**Font Weight**

Then, in combination with the font family, the font weight token is used to determine the specific characteristics of that text. For example, for the font “Roboto” defined earlier, a font weight token could be “Regular 400”.

![Token font](/images/design-token-examples/font.png)

### Duration

Design extends beyond static elements and also includes transitions and animations, which introduce the crucial element of time. Achieving a harmonious design necessitates precise control over timing. While the duration of transitions may vary based on the size of elements (larger elements typically require longer transitions), maintaining a set duration for different use cases is crucial for ensuring a consistent product.

Duration tokens are used to define these time intervals, and are typically measured in milliseconds (ms). These tokens can be defined based on the size of the element or other specific design specification.

### Cubic Beizer

Cubic beizer is a mathematical tool that allows you to regulate the velocity and fluidity of animations and transitions in your design. You can try [this free tool](https://cubic-bezier.com/) to learn more how cubic beizer works.

A cubic beizer token is defined by an array of four numbers [p1x, p1y, p2x, p2y] and allows to keep a centralized management of the transitions of your design.

### Number

Above, we have mentioned different design tokens that involve numbers, such us dimensions and duration. But, these examples do not include the full range of scenarios where numerical values can be used in design. Number tokens play a crucial role in addressing the broader spectrum of number use cases.

Number tokens allow a flexible way to manage and maintain numerical values across your design. These values can include different properties, such us border radii, line heights, opacity levels, and a large amount of different use cases.

## Last Words

Now that you're familiar with various design token examples and how they contribute to a consistent and coherent design. We hope that these examples helped you grasp the importance of design tokens, and further understand how they can be applied in a real-life scenarios.

If you're eager to start implementing design tokens, [our free tool](https://app.token-base.com/) can simplify the process for you. It allows you to effortlessly create and export design tokens in various programming languages.
