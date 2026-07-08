---
title: "Frontend is the middle child"
date: "2026-06-19"
summary: Frontend sits between design and backend and gets misread from both directions, downstream to designers, soft to engineers. Both pictures are wrong, and neither sees how much of the actual work happens in the middle where everything has to become something a person can use.
tags:
  - article
  - frontend
  - design systems
  - AI
  - draft

card: { cardImage: /assets/images/placeholder-hero.svg }
---

Frontend has always been a strange discipline to explain. It's not quite design, although it cares deeply about design. It's not quite backend, although it depends heavily on backend systems, API contracts, data models, performance, auth flows and all the invisible machinery that makes software actually work.

Frontend sits in the middle. And like a lot of middle children, it's usually the one expected to adapt. I'm not a middle child myself so I'll be honest, I'm completely stereotyping here, but go with me on it.

Design has a vision. Backend has a system. Product has a goal. Users have needs, preferences, frustrations, devices, browsers, assistive technologies, flaky networks and expectations. Frontend is where all of those things meet, and from either end it can look like "the implementation layer." The place where designs get turned into screens, where API responses get rendered, where someone wires up the form, fetches the data, handles the loading state and makes the button work.

And the adapting never really stops. The middle child gets handed whatever the rest of the system decides. Design reworks a flow, backend reshapes a response, product changes its mind about what the feature even is, and frontend is expected to absorb all of it and still ship something that feels coherent. Then, on top of the moving requirements coming from every direction, the ground itself moves. Browsers ship new APIs and quietly deprecate old ones, a layout technique that was a hack last year is a one-liner this year, viewports and input methods and device capabilities keep multiplying, and something that worked everywhere can break because a browser changed its mind about a default. Backend mostly gets to build on a platform it controls. Frontend builds on one that keeps shifting underneath it, and is still expected to stay flexible enough to keep up with all of it.

I think the "implementation layer" description misses most of the actual job though. Frontend isn't just the layer between design and backend, it's the discipline responsible for translating between them. It has to understand the intent behind a design, not just the pixels. It has to understand the shape and constraints of the backend, not just the endpoint. And it has to care about whether the interface is accessible, whether the interaction makes sense, whether the empty state is useful, whether the error message is humane, whether the loading state is misleading, whether the component scales, and whether the whole thing still works when reality does what reality always does.

That's a lot of responsibility for a layer that's often treated as the less serious one. And the strange thing is it gets misread from both directions at once. To a lot of designers, frontend is downstream, the place their vision gets carried out more or less faithfully. To a lot of engineers, frontend is the soft part, the CSS and the buttons and the bit that isn't quite real systems work. Both of those pictures are wrong, and they're wrong in opposite directions, which is a big part of why frontend is so hard to explain and so easy to undervalue.

## Misread from both sides

Design and backend are both doing serious, difficult work, none of what follows is me suggesting otherwise. But frontend understands both of those worlds more deeply than either side tends to give it credit for, and that's exactly the part that gets missed.

Take the designer's view first, that frontend is downstream. A frontend engineer looks at a design and immediately sees questions that aren't visible in a static mockup. What happens when this text wraps? What happens when the user has a really long name? What happens when there are no results, or partial data, or the request just fails? What happens on a narrow screen, with keyboard navigation, with a screen reader, when the user is impatient and offline and on an old device? That isn't carrying out a vision, it's finishing the design, working out everything the mockup left unanswered, which is most of what an interface actually is.

Now the engineer's view, that frontend is the soft part. The same kind of scrutiny gets pointed at the backend. Does this shape support the interaction we actually need? Are we leaking implementation details into the UI? Are we making the client reconstruct meaning that should already exist in the data? Is this field stable enough to build against? None of that is soft. It's the same systems thinking, applied to state, data flow, caching, error handling and a runtime you don't control, which is arguably a harder environment than one you do.

Frontend is full of these questions, and it's not because frontend engineers are trying to be difficult, it's because frontend is where the gaps become visible. It's where a beautiful design discovers missing data, where a clean API discovers messy human behaviour, where a simple product requirement discovers all its edge cases. It's where assumptions from every part of the system have to become something a person can actually use. Designers see the half that faces them and engineers see the half that faces them, and the whole, the part where all of it has to become one coherent thing, is the part neither side is really looking at.

## Design systems make the middle visible

Design systems make this middle position even more obvious. A design system isn't just a Figma library or a set of React components, it's a shared agreement about how a product should behave, look and change over time, and frontend is usually where that agreement becomes real. Tokens are a good example: a colour token isn't just a colour and a spacing token isn't just a number, they carry decisions about hierarchy, brand, density and consistency so teams aren't rediscovering the same choices over and over.

Component APIs are where it gets interesting, because every one is a quiet trade-off between flexibility and constraint. A very flexible component feels generous at first, add a prop for this, accept any `ReactNode`, let consumers pass whatever they want as `children`. But flexibility is never free. Every escape hatch is another path and every generic slot another place the intended pattern can drift, and that drift becomes inconsistency, accessibility bugs and components that are technically reusable but impossible to reason about. It rarely happens through carelessness, it happens because each request makes sense on its own: one team needs the icon on the left, another on the right, someone needs a one-off layout for a campaign page. Locally reasonable, collectively a mess.

So someone has to keep deciding where the line sits. Should this be a prop, a variant, a token, a separate component, or just not allowed? Loose APIs make variation easy now, strict ones make consistency easier later, and the right answer depends on the organisation: a mature system can hold a tighter line, a younger one needs room to explore before it knows what's worth formalising. That judgement is frontend judgement, and it's where a design system stops being a document and becomes something actually enforceable, through APIs, types, tokens and the everyday calls about what a component makes easy, what it makes hard, and what it makes impossible.

## Why it feels confusing from the inside

I think this is why frontend can feel so confusing to the people who work in it. When you live in the middle you see the importance of everything. You see why design matters, why accessibility matters, why API contracts matter, why performance matters, why state management matters, why semantics and focus states and error handling and forms and caching and browser behaviour all matter. And then you watch people argue as if only one side is the "real" work, which is frustrating.

Frontend people often struggle to explain the breadth of what they do because so much of it is connective tissue. It's judgement, it's translation, it's noticing when two good ideas don't fit together yet. It's understanding enough about design to protect the user experience, enough about backend to protect the system contract, and enough about the browser to know where both of those things are going to break.

## Seeing the seams

This gets clearer to me the more AI generates code, designs and implementation. All of it stays valuable, design judgement and backend correctness don't get cheaper just because a model can produce a first draft of them. But frontend judgement is the piece people are quickest to assume has been automated away, and I think that's exactly backwards. When the raw material is being produced in pieces, someone still has to know whether those pieces actually fit together, and that has always been frontend's job.

Designers can articulate what stays deeply human in their work: taste, systems thinking, patterns, accessibility, brand, research, intent and product judgement. Backend engineers can point to the parts of their work that can't be hand-waved away: security, architecture, scalability, observability, correctness, data modelling and reliability. Frontend is easier to dismiss in that conversation, because it looks like the place where generated code can go the furthest. Generate the component, generate the form, generate the page, generate the CSS, generate the integration.

And sometimes, yes, AI can generate a lot of frontend code. But frontend was never only about producing code. Frontend is about knowing whether the generated thing is right.

Does it match the design intent? Does it use the design system correctly, and respect the constraints of the component API? Does it use tokens meaningfully, or does it hard-code a new exception? Does it preserve accessibility, manage state safely, make the right trade-off between client and server? Does it handle the real API response, not the ideal one? Does it fail gracefully, support the user's actual task, and avoid introducing complexity that makes the next change harder? Or does it quietly break a contract somewhere else?

These aren't only frontend questions, they're design questions and backend questions too. The difference is where they all become visible at the same time, and that tends to be in the interface. Frontend sits across every other discipline rather than beneath any of them, which means it's often the only place you can actually see the seams between everyone's work.

That's the part I find genuinely useful about the position. Frontend engineers are often the first to notice when the product story doesn't line up with the data model, when the happy path is clear but the actual user path isn't, when a component pattern breaks down in a real flow, when an API response is technically valid but awkward for the interface. They're also often the first to see when a design system's ideals meet the reality of product pressure: a pattern that seemed clear in isolation becoming ambiguous in a real feature, a reusable component starting to accumulate exceptions, a token that doesn't cover a new theme or interaction state, a design that looked consistent in Figma falling apart once it has to account for data, permissions, loading states, errors, localisation and responsive behaviour.

That's the view from the middle, and the seams tend to show up there before they show up anywhere else. It's not that the work is more important, it's that it's the work most likely to catch what everyone else missed, and that keeps getting mistaken for "just making it work."

## Overall thoughts

I don't think this is lesser work, I think it's integrative work, and integrative work is easy to undervalue because it looks like compromise. It looks like glue, it looks like "just making it work." But making it work is usually where you find out whether everyone's good intentions actually hold together.

Frontend is the middle child because it's surrounded by disciplines with clearer narratives. Design gets to talk about the user, backend gets to talk about the system, and frontend has to talk about both at once, which can make the discipline feel a bit blurry. But maybe the blur is the point.

This isn't me trying to crown frontend over anything else, the work on every side of it is real and hard and a product falls over without any of it. But frontend is misunderstood in a way the others aren't. Design sees the half that faces them and engineering sees the half that faces them, and both of them, in good faith, end up underestimating the same thing, which is how much judgement it takes to make all of it hold together as one coherent product.

Because that's what the middle actually is. It's where intention meets reality, where systems meet people, where what a product is supposed to do meets what it actually feels like to use. It's not downstream and it's not soft, it's the place all of that becomes real, and it deserves to be understood as that rather than as the layer where other people's decisions get typed up.
