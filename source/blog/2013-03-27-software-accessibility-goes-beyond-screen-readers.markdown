---
title: "Software Accessibility Goes Beyond Screen Readers"
date: 2013-03-27 00:00
---

<p>Software accessibility is about more than just making software accessible to people who can't see. Visual impairments are common, so making software accessible to users using screen readers, like VoiceOver on iOS, is key. However, lots of other impairments exist and it's important to take that into consideration when designing your software. </p>

<p>Consider the scrolling indicator colour. When you're designing your mobile web site, Safari uses the background colour of the <code>body</code> tag to infer the colour of the scroll indicator (light or dark). If your <code>body</code> tag is light, but it's covered by a dark <code>div</code>, then the indicator is going to be dark – on top of a dark <code>div</code>.  Users with visual impairments are going to have a hard time seeing the indicator, rendering the scroll indicator completely useless to them Furthermore, users with cognitive impairments aren't going to be able to rely on that visual affordance either, possibly confusing. Don't betray the user's expectations – it will only make them more likely to leave your site. </p>

<p>Part of making good software is making usable software. Software accessibility is just a specific form of usability. Keep that in mind the next time you build something. </p>

<!-- more -->

