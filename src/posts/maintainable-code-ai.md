---
title: "Does maintainable code matter anymore?"
date: "2026-06-10"
summary: Maintainable code has always been about making things easier for people, is it even more important for AI?
tags:
  - article
  - AI
  - engineering
  - maintenance

card: { cardImage: /assets/images/placeholder-hero.svg }
---

I've heard something come up in conversations pretty often recently about whether the quality of our code, or the maintainability of our code matters anymore when AI is writing the vast majority of it?

Historically the argument for maintainable code has been about people and making it easy for someone to jump in and understand your codebase, or even just for future you who had to try and understand what you wrote over a year ago. Whether we always succeeded at this is questionable but regardless it was typically understood as being important.

## Every generation is a new hire

I have referenced this article before but I like how [Christoph Nakazawa wrote about it recently](https://cpojer.net/posts/modern-engineering-values), that working with coding agents is structurally the same as running a large organisation, because you are constantly dropping new people into the codebase with no context. Every session starts fresh and the agent reads the code the same way a new hire would, except it does it thousands of times a month.

If you've ever onboarded someone into a messy codebase you already know what this feels like, they eventually figure it out, but the more complex the codebase is the harder that becomes. The same applies to the first production incident, or the first time you have to extend a feature you have no context on.

AI does this too, the difference is it doesn't learn from last week's onboarding and it doesn't build up institutional memory (at least right now). So that cost of having an unmaintained, messy codebase isn't paid just once when the new engineer joins, instead it costs you continuously on every generation and the risk is that it gets worse over time not better.

## AI is great at pattern matching

The thing LLMs are genuinely excellent at is extending a pattern it can see, if you give it a clear example of how forms are wired up in a codebase it will produce another one that looks just like it, it isn't making a judgement about the pattern, it's just matching against whatever is nearby, and "nearby" is whatever the retrieval pulled in for that session.

I think this is why the discrepancies in a codebase matter so much more than they used to. When two parts of the codebase do the same thing differently a person can probably tell which is current and which isn't. Maybe that's because they remember the migration or they remember a conversation with their teammate about moving away from an older style. Whereas with AI the model just sees two valid looking examples and picks one, or it might just split the difference and do something else. That last option would be the worst-case scenario because now we have a third variation ready for the next session. This results inconsistencies multiplying faster than you could ever clean up. And I know people can make these mistakes too, I'm not out here pretending people are perfect but people were also not making thousands of changes a month.

For me at least I've found the cleaner the surrounding code is, the more the model behaves the way I want it to without me having to over-specify. The messier it is, the more I find myself writing constraints into the prompt or the skill or the review process, because the code itself isn't supporting the model by telling it what good looks like.

## What happens when costs increase?

The other reason I keep thinking about is cost and how the cost of tokens keeps increasing not decreasing. As we use AI more to generate more of our work the price of a single change is not just engineering time, it's tokens too. And the tokens scale with how much context the model needs to load and how many times it has to go back and forth to get the right answer.

So in theory wouldn't unclear code make both of those numbers go up?

If the conventions in the file aren't consistent with the conventions elsewhere, the model has to load more examples to figure out which one applies here. This isn't hugely problematic for a single request but if you multiply this across every generation across every engineer across a month this is going to add up right?

It also applies to that back and forth, if the code is clear in the first place, the model would, in theory, produce the right thing on the first pass or so and the correction loop wouldn't even happen or would happen less. So the cost of unclear code isn't just the tokens needed to read it, it's the tokens needed to fix the thing the model produced incorrectly because it couldn't determine the correct answer in the first place.

I personally don't think this is going to get cheaper, at least any time soon. Models will get more efficient and pricing will shift, but the volume of generation per engineer is going up faster than per-token costs are currently coming down, and the codebases we're pointing models at are getting larger, not smaller.

## So what does this mean?

I think code quality and consistency, easily maintainable code and easy to read and understand code still matters. But somehow it's more important now, and not because it wasn't a problem for people, it always was, it's just now there is less human judgement in the mix.

The dead code we left around is now treated as a valid reference. If you leave an old version of a function next to the new one, the model has a reasonable chance of extending the old pattern in the next change. So deleting unused code isn't just tidying up anymore you are literally removing traps that AI might get caught in. The same applies to consistency, if there are two ways to wire up a form in the codebase we're just inviting the model to pick one.

And comments are another one, I think the rule is still that good code mostly explains itself. But a short comment explaining the intent, like why a particular approach was chosen helps the model make better decisions about what to change and what to leave alone.

Same goes for naming things, if you aren't consistent with your naming the model has to figure out the differences every time. There is just no need for that.

Previously if a person was making these calls they'd have more context on where these patterns were coming from, but now that's missing in the steps. So even if a person reviews the output they may not have the appropriate understanding to know that the pattern or convention AI is using isn't the correct one simply because they weren't part of the whole process like before.

I don't think we want to try to anticipate every future need, I'm also not saying you should have an emergency cleanup sprint across every legacy codebase. However, the places where this matters most are the places the model is going to read the most. I think the mentality of "we'll clean it up later" needs to be more carefully considered, because now every time you add something into the core parts of your codebase the more likely you are to spread that across the codebase. And besides, we have AI now so in theory it should be quicker to resolve these problems right?

## Overall thoughts

I thought this recently at a conference I attended, but I think it's ironic that maintainable code was typically something we did for our human colleagues, the same applied to things like accessibility, this was done for people to make it easier for people. But now those same properties that made code easy for a person to work with are what help AI produce good output with less context, fewer round trips, and less drift.

Anyway I think it's not just about quality anymore, and if you treat code clarity as a discipline rather than a preference maybe you'll spend less on tokens, ship faster and end up with codebases that stay easy to read, understand and generate against rather than drifting under the weight of your own output.

It seems to me that AI just keeps highlighting how important the basics were, that actually we were on the right track. They don't suddenly stop being important.
