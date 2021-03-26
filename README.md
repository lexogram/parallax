# Parallax

This is a site built using the [MERN](https://www.educative.io/edpresso/what-is-mern-stack) stack to display side-scrolling interactive stories using scenes with a parallax effect.

The parallax effect is created by adding a `perspective` rule to a parent element and a `transform: translateZ(...)` rule to its child elements.

Different browsers treat the parallax effect in different ways, notably in how the `scrollWidth` value for the parent element is calculated. This project provides guidelines and workarounds so that the display is similar in all major browsers.
