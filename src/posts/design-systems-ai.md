---
title: "Design Systems as the Thing That Keeps AI On Track"
date: "2026-06-06"
summary: Now that AI is generating most of your UI your design system is no longer a consistency tool it's now the main source of truth a model can generate against. Whether that stays accurate is now a more consequential question than it used to be.
tags:
  - article
  - AI
  - design systems

card:
  {
    cardImage: /assets/images/placeholder-hero.svg,
    cardAlt: Abstract representation of a design system as a grid of connected components,
  }
---

I've been thinking a lot about where design systems fit now that AI is writing so much of our UI and what their job actually is now that a meaningful share of the work is being generated rather than written by hand.

For a long time design systems (to put it simply) have been sold as a consistency tool and a way to move faster. It has been useful but it was also the kind of thing that companies deprioritised when budgets got tight. The idea being that a button slightly off here or some spacing that did not quite match there didn't matter in the grand scheme of things (a stance I disagree with but I digress).

However I believe treating design systems as some kind of optional consistency work no longer makes sense, and this is what I've been muddling through in my brain.

## What happens now that work is generated

When most of our UI was written by people, the design system lived partly in the codebase and partly in everyone's heads. Engineers and designers absorbed the conventions over a long period of time (hopefully). The system was a shared reference, but it was not the only thing holding the line because people remembered how things were supposed to look.

AI does not remember any of your guidelines, it's not ignorant of design system concepts, it just does not know yours unless you put it in context. Every generation starts fresh, with no sense of your conventions and no loyalty to them. I recently [read an article by Christoph Nakazawa](https://cpojer.net/posts/modern-engineering-values) that made the point: working with coding agents is structurally the same as running a large organisation, because you are constantly dropping new people with no context into the codebase. His conclusion was that the more constraints you put on the code (things like lint rules, automated tests etc) the faster people can actually move, because the guardrails catch mistakes before they spread.

A design system is meant to be the guardrail for the visual and interaction layer of a product, the cost of a weak design system isn't just inconsistency anymore, it's bad automation at scale. You should be constantly assessing whether it is accurate enough to be trusted, because something is now going to generate against it thousands of times a month.

## Managing drift

The thing I worry about most is drift. I’ve seen this happen in a lot of tiny ways like filling a label with empty space to avoid restriction of a required label, using the component but adding its own spacing, or replacing a paragraph with a div so it doesn't have to deal with the margins...and to be fair people do this as well. I often hear "oh I'll just do this for now and ill fix it later" but later never comes. While none of that looks hugely problematic in review it's the exactly why it spreads. The difference now is the speed and volume that AI works at. When the drift came from people, it was slow and constrained by the limits of how much anyone could actually build but AI removes both of those constraints, and now we have the additional risk that its output feeds straight back into the codebase or system that the next generation reads from.

So the concern is not that AI is uniquely bad at following conventions, it's that the consequences of not following them compounds a lot faster than ever before.

The tempting way to put it is if AI can get eighty-five percent fidelity, compounded over five generations, this would be around forty-four percent. But this assumes each pass will corrupt a fresh slice of everything, and that is not how things actually work. A generation that touches a form does not have some random chance of quietly breaking an unrelated button elsewhere. You can't even really claim one perfect number either, colour tokens, spacing, component choice, accessibility, and naming are all different things that do not collapse into a single neat percentage.

So really it's a lot simpler than that, AI generates against the current state of the codebase, not the state you intended. When a model needs to build a new card, it looks at how cards are built right now, including the slightly-off one a previous generation produced that nobody corrected. So now any deviations are no longer a one off mistake it's now part of what the next generation is going to treat as normal. Arguably this was always the case but now it's just magnified by the speed at which AI works.

But this is what I think is actually compounding — it's not necessarily because errors multiply, it's because each uncorrected deviation quietly raises the chance the next model copies it. The system begins to fail toward whatever sloppy local pattern happens to accumulate, and then it accelerates in that direction, because AI is very good at confidently extending any pattern it can see.

The risk is not one bad generation — it's that bad generations become the reference for the good ones.

## Ownership of the Design Systems

Every correction in that loop depends on someone owning the answer to what the system actually is, from both a design and engineering perspective. This is exactly the kind of role companies cut because the impact is delayed. To me this thinking was already short-sighted but with AI in the loop, I think it moves into recklessness. By cutting it in this new landscape it's not just a quality trade-off — you are actively removing the authoritative reference that AI is going to generate against thousands of times a month.

A design system is not a static artifact, it is a continuously maintained claim about what a product should look and behave like. Tokens get added, components get deprecated, patterns diverge and someone has to decide which one is canonical, documentation has to be rewritten when the intent changes. None of this maintains itself.

An unowned design system does not stay frozen in a good state. Tokens drift from what is actually shipping, the docs describe a version that no longer exists, and the gap between the system and the codebase widens until people and models alike stop trusting the system and just copy whatever is nearby. At this point it is no longer an authoritative reference.

This connects to something [Nakazawa describes in his article as strong ownership](https://cpojer.net/posts/modern-engineering-values). Agents amplify ownership, someone who deeply understands the system can now direct an enormous amount of output against it, while an unowned system produces an enormous amount of output against nothing in particular. So without a central team you don't end up with a neglected but stable design system. Instead you end up with an inaccurate reference propagated across your product at machine speed, which I think is genuinely worse than having no system at all.

One thing I want to call out here though is what central ownership actually means. A federated model distributes responsibility across designers or engineers working on features or across feature teams each taking a slice of the system as part of a broader product role. As a result the system gets maintained as a side effect of shipping features. It gives you broad coverage, but this is not the same thing as accountability, because whenever a feature deadline and a system quality decision come into conflict, the feature wins. It wins every time regardless of your good intentions.

Central ownership means someone is paid to say no, it's their job to protect it when the pressure of building features makes the wrong thing look convenient and easy. It's not a support function running alongside the job. A central team's success metric is the accuracy and usability of the system itself, not feature velocity, not a sprint deadline. This separation is intentional. A feature team will make pragmatic trade-offs under pressure. A central team's job is precisely to not make that trade-off, because the health of the system is what they are measured against. That means ensuring consistent output for people and for AI, tracking how much of the surrounding codebase actually uses the system, and stepping in where things deviate. It means holding the line when components get built so generically they stop being usable, or when people reach for the easy implementation rather than the right one. The system does not stay accurate by accident. Someone has to care more about getting it right than about getting it done.

This does not mean slowing feature teams down. A well-run central team works alongside people working on features. Instead the guardrails that the team work on are what let everyone move faster, because the questions about what is correct have already been answered or are being answered by the people focused on it.

To me at least this re-frames the investment question from "can we afford a design systems team" to "can we afford to point AI at a reference that nobody is keeping true or accurate?"

## Constraints and loops

I think the way through this has two parts to it and in my experience teams often focus primarily on the first one.

That is constraints, which make the system legible to the model. This is the part most teams already understand. A real token system, components with tight and well-defined APIs, clear usage documentation. The piece that often gets missed is putting that context where the model actually reads it, which is in the repo, not in a separate documentation site, or in a Figma file or the heads of a few senior people. If each agent session is a new hire without access to your scattered context, then the most useful thing you can do is keep the context next to the work. Usage guidelines, do and do not examples, and the intent behind a component belong alongside the code, because that is the context the model is guaranteed to see.

The part that matters just as much, and gets less attention, is the feedback loop which make the system self-correcting, and this is the part that actually stops drift. Constraints tell the model what good looks like and loops catch it when it misses anyway. In practice that means linting that rejects off-token values, component checks that fail when something escapes the system, and visual regression tests that flag a card that no longer matches the canonical one. The point is to move correction from something a human might notice in review to something the pipeline rejects every time. These tight feedback loops are what let the model finish work quickly rather than slowly.

That being said both extremes here can cause you a world of grief, if you are too loose the model might invent inconsistent patterns because nothing stops it. But if you are too rigid, and the model cannot compose anything genuinely new, so it generates workarounds that escape the system entirely, which is the worst case, because now the drift is invisible to the checks you built. Tuning that boundary to be strict enough to hold the line but flexible enough that the system stays a tool rather than an obstacle is a very important part of the job and it's not something you set once.

## What is left for people

If the pipeline rejects off-system output and the documentation is accurate and in the repo, it is fair to ask what is left for people to do. The answer that is most thrown around is judgement which is a shift from being bottlenecked on producing code to being bottlenecked on exercising judgement. But this feels the same to me? The hard questions haven't disappeared and it was always what Design System teams focused on. However they are way more important now, what is canonical when two good patterns conflict? When a new pattern is worth adding to the system rather than rejected as a one-off? What is the product actually meant to feel like? Is the API is too strict or too flexible?

I've heard people say we should offload the work we don't enjoy to AI, but the problem is that if you are handing off work you don't understand you lose the ability to know whether the output is any good. In his article [Nakazawa puts it pretty plainly](https://cpojer.net/posts/modern-engineering-values): with agents, everyone can generate a lot of bullshit all day long. The thing that separates useful output from noise is whether the person directing the model knows what good looks like. You cannot guide something to the right outcome if you cannot recognise the right outcome. The goal shouldn't be to avoid the parts that feel difficult it should be to know them well enough that you can direct, review, and push back when the model gets it wrong.

Those are decisions, not generations, and they are where the design system team of designers and engineers earns its place. The model executes against the system, the system encodes the team's judgement and a central team keeps that judgement accurate so it can be executed against at scale.

I may be biased, but for me this lands on the same conclusion I keep arriving at from different directions. AI does not remove the need for a strong, well maintained design system. It makes it matter more!

Going fast against a reference that you are unaware is drifting in the background might get you something faster, but it will also get you lost a lot sooner. Keeping the reference accurate and true is what will make the speed you're aiming for consistent.

I wonder if the teams that do well in the long run, will not be the ones that adopted AI the fastest but instead the ones where a central team held the line, so that when they moved fast, they moved in the right direction.
