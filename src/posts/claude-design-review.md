---
title: "Testing Claude Design with an Existing Design System"
date: "2024-06-07"
summary: A look at how Claude Design supports design generation, interface modernisation, and design-system integration
tags:
  - article
  - AI
  - tooling
  - claude
  - workflows
  - prototyping

card: { cardImage: /assets/images/placeholder-hero.svg }
---

Many of the write-ups I’ve seen about design-to-code tools start from a blank slate: “make me a UI”. But that is not really where I think most people will start in their day-to-day work.

I already have access to an established design system. The question I cared about was not whether Claude Design could invent an interface from nothing. It was whether it could plug into a real, maintained system and produce work that stayed faithful to it.

## Setup

Getting started is fairly straightforward. You provide Claude Design with your Figma file, code references, and any other notes you think are relevant.

However, if your documentation is not in your codebase, such as pattern guidance, microcopy rules, principles, or the decisions behind components, there is no easy way to share that with Claude Design. In my opinion, that is a real limitation. A lot of a design system’s value lives outside the components themselves.

This is solvable, but it means more setup and more manual work unless you already have that information ready to go.

## Claude Design copies your system, it does not use your system

This is the most important thing to understand.

Claude Design does not reference your design system directly. It reads your inputs, generates a copy of the system, and then lets you review some of the core components for accuracy.

That distinction underpins most of my commentary for the rest of this post. It is a snapshot of your system. The moment you change the real system, the copy is out of date. A living, actively used design system changes constantly, so the copy goes stale about as quickly as you work.

Claude Design does have a Remix option to update the copy through chat, and you can aim requests at specific components. But it is still AI generation under the hood, so there is no guarantee it will only touch what you asked it to touch.

For prototyping, that is an acceptable trade-off. For that purpose, it is pretty good. But if you are trying to maintain consistency and uphold design quality, I do not believe it is enough.

## Good for prototyping

If we set the design-system concerns aside and treat Claude Design as a prototyping tool, it is genuinely useful. It is quick to get something on screen, iterate on it, and reason about flows and structure.

My workflow involved generating a design from a screenshot and then as a follow up asking it to update the design to follow the new patterns. It was not perfect, but it was enough to explore the flow and test out workflows.

However, unless customer expectations change, I do not think the output is good enough to share externally. In my test, the discrepancies between my input and its output were too large for anything customer-facing. I would put it firmly in the internal exploration bucket, not the polished deliverable one.

There is also a risk here, because Claude Design is not working from real system constraints, it can generate something that goes against your guidelines or fails your standards for performance, accessibility, or feasibility. I would want accurate human review before sharing anything too widely.

Some may argue that the polished deliverable is becoming less relevant, and if expectations change, this may become a great tool for external communication. But for now, I would keep it internal.

## Taking the design to build

When it came to building the design in code and fitting it into a real product with existing systems and patterns, the result was middle of the road. It was not great, but it was not terrible. I got it most of the way there by utilising skills so Claude can build the way I want, it still wasn't great but with more finesse I'd probably be more successful.

If I was to compare it with my previous post about Claude and Figma MCP... the output from Claude Design was not as good, right now at least. I suspect that is because Figma has Code Connect, which provides a real way to tie designs to actual design-system components. Claude Design has no equivalent. It works from its generated copy, not a live link to your components, so the accuracy is naturally lower.

However, Figma is seriously lacking on the prototyping front. In my opinion, Claude Design wins on prototyping flexibility, while Figma wins on faithfulness to the real system.

Knowing which of those you need on a given task tells you which tool to reach for.

What's important to note is that both required additional effort to get some usable output, while the figma skill I made was largely focused on improving performance, the one from Claude Design require more guidance on following Design System. I look forward to seeing how this space changes over time.

## For Funzies...Claude Design to Figma

I also tested sending a Claude Design output into Figma via Claude Code. It was not great, to be honest.

It was nowhere near as good as going from our actual codebase, or even from a screenshot, into Figma with Claude Code. I suspect this is because the package Claude Design generates does not carry real design-system references. By the time it reaches Figma, there is nothing solid to anchor to. I think one way to improve this would be to have Claude Code try to find the appropriate component library replacements before sending to Figma but this just adds more time onto the generation.

It is not quite garbage in, garbage out (I wouldn't go that far), but the further you get from the real system, the more the absence of a proper connection to the system seems to build up. And it will end up costing you more in tokens!

## Overall view

Claude Design was easy to adopt and genuinely useful for prototyping, especially if you lean into its flexibility and treat that as the point rather than a consolation prize.

However, it is important to remember that Claude Design is working from a copy of your design system, not a connection to it. That copy is only as accurate as the last time you regenerated it, and regeneration does not guarantee accuracy.

For exploring workflows and moving quickly internally, I think it is a useful tool. For anything that needs to stay faithful to a maintained design system, such as customer-facing output or a reliable design-to-code pipeline, I do not think it is as strong as the Claude and Figma workflow.

With enough effort, especially if you make good use of skills, you may be able to close some of that gap. However, in my opinion, Claude Design is best when you need speed and momentum, not when you need trustworthy output.

From my experiments so far with Claude Design and Figma MCP, I do not think either approach solves all of the problems yet, however I am interested to see how this space develops.
