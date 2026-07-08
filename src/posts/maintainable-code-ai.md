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

AI does this too, the difference is it doesn't learn from last week's onboarding and it doesn't build up institutional memory on its own. Even with things like AGENTS.md or CLAUDE.md files those are compensations that you have to write and maintain, whereas clean code speaks for itself. So, that cost of having an unmaintained, messy codebase isn't paid just once when the new engineer joins, instead it costs you continuously on every generation with the added risk of it getting worse over time at speed.

## AI is great at pattern matching

The thing LLMs are genuinely excellent at is extending a pattern it can see, if you give it a clear example of how forms are wired up in a codebase it will produce another one that looks just like it, it isn't making a judgement about the pattern, it defaults to matching what it sees unless something tells it otherwise.

I think this is why the discrepancies in a codebase matter so much more than they used to? When two parts of the codebase do the same thing differently a person can probably tell which is current and which isn't. Maybe that's because they remember the migration or they remember a conversation with their teammate about moving away from an older style. An AI agent can check git log or git blame, but that only tells you which pattern is newer, not which one is correct, sometimes the newer file is the exception someone bolted on under a deadline, not the direction the team is actually moving in. The context that might be able to tell the difference does not always live in the diff itself and as a result the model still ends up picking between two valid looking examples, or splitting the difference and doing something else.

Unfortunately doing something else ends up being the worst-case scenario because now we have a third variation ready for the next session. This results in inconsistencies multiplying faster than you could ever clean up. And I know people can make these mistakes too, I'm not out here pretending people are perfect but people are also not making thousands of changes a month.

For me at least I've found the cleaner the surrounding code is, the more the model behaves the way I want it to without me having to over-specify. The messier it is, the more I find myself writing constraints into the prompt or the skill or the review process, because the code itself isn't supporting the model by telling it what good looks like.

## A thought about costs

The other reason I keep thinking about is cost, because even if per-token prices are coming down, total spend per engineer keeps going up and the volume of generation is rising faster than prices are falling. Additionally the tokens are scaling with how much context the model needs to load and how many times it has to go back and forth to get the right answer.

I don't have numbers on this, it's just my ponderings on how I understand the mechanics to work, but that being said unclear code seems like it would push the numbers up not down?

For example if conventions in the file you are working on aren't consistent with the conventions elsewhere the model might load more examples to figure out which one applies here. This isn't hugely problematic for a single request but if you multiply this across every generation across every engineer across a month, that adds up quickly. If the code is clear in the first place, the model is more likely to produce the right thing on the first pass, and that correction loop should happen less.

I personally don't think this is going to get cheaper, at least any time soon. Models will get more efficient and pricing will shift, but the volume of generation per engineer is going up faster than per-token costs are currently coming down, and the codebases we're pointing models at are getting larger, not smaller.

## It still matters

I think code quality and consistency, easily maintainable code and easy to read and understand code still matters. But I think im leaning towards it being more important than ever, and not because it wasn't a problem for people, it always was, it's just now there is less human judgement in the mix.

The dead code we left around is now treated as a valid reference. If you leave an old version of a function next to the new one, the model has a reasonable chance of extending the old pattern in the next change. This means that deleting unused code isn't only about tidying up, instead you are literally removing traps that AI might get caught in. The same applies to consistency, if there are two ways to wire up a form in the codebase leaving both is just inviting the model to pick one unless you explicitly specify otherwise.

And comments are another one, I think the rule is still that good code mostly explains itself. But a short comment explaining the intent, like why a particular approach was chosen helps the model make better decisions about what to change and what to leave alone.

Previously if a person was making these calls they'd have more context on where these patterns were coming from, or they might reach out to a colleague if they weren't sure. But that's not whats happening with AI, at least from my experience so far.

I don't think we want to try to anticipate every future need, I'm also not saying you should have an emergency cleanup sprint across every legacy codebase. However, the places where this matters most are the places the model is going to read the most. I think the mentality of "we'll clean it up later" needs to be more carefully considered, because now every time you add something into the core parts of your codebase the more likely you are to spread that across the codebase. And besides, we have AI now, so resolving these problems should be quicker.

## Overall thoughts

To wrap up my final thoughts, I think it's ironic that maintainable code was typically something we did for our human colleagues, the same applied to things like accessibility, this was done for people to make it easier, for people. But now those same properties that made code easy for a person to work with are what help AI produce good output with less context, fewer round trips, and less drift.

Anyway I think it's not just about quality anymore, and if you treat code clarity as a discipline rather than a preference maybe you'll spend less on tokens and ship faster because the AI will have a better foundation to generate against rather than drifting under the weight of your own output.

It seems to me that AI just keeps highlighting how important the basics were, that actually we were on the right track and that these foundations haven't suddenly stopped being important. It's the opposite, they are more important than anywhere.
