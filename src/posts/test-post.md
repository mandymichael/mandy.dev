---
title: Generating Figma Designs from Code with Claude
date: "2024-06-01"
summary: Using Claude Code to generate Figma designs directly while mapping components to Design System equivalents and building editable frames automatically.
tags:
  - article
  - featured
  - AI
  - tooling
  - claude
  - workflows
  - figma
  - draft
card:
  {
    cardImage: /assets/images/placeholder-card.svg,
    cardAlt: A generated Figma frame next to the live portal page,
  }
---

I’ve recently been experimenting with design and code workflows to understand where AI can make our lives easier without compromising the quality we’ve spent a long time working towards.

The first workflow I explored was using Claude Code to generate Figma designs directly from the source.

The main reason for starting here was that the product I am working on has a lot of older code and legacy components that need to be reviewed, refreshed, and brought closer to our current design system components and patterns. The surface area is large, and while the goal is not to simply recreate every existing page in Figma, having an accurate starting point still matters. Some pages will need deeper manual design work to address years of accumulated issues, but even getting them to that point can be a long and repetitive process.

So, instead of a designer manually rebuilding what already exists I wanted to see if I could get Claude to read the source code, understand the page structure, map code components to their Figma design-system equivalents, and generate an editable Figma frame automatically with the Figma MCP.

The short answer is yes, but it took some upfront investment to make the workflow useful.

[Image suggestion: side-by-side comparison of the live portal page and the generated Figma frame]

<div class="imageContainer">
  <img src="/assets/images/placeholder-card.svg" alt="Example of a generated Figma frame next to the live portal page" />
</div>

## The workflow

Where I ended up was a `/page-to-figma` skill that takes a local URL and a Figma file key, reads the page source, and generates an editable Figma frame using published components from our Figma design system library.

`/page-to-figma http://localhost:5000/page [FIGMA_FILE_KEY]`

The goal was not to create a pixel-perfect version of a screenshot. Claude and the Figma MCP can already do that out of the box. What I wanted was a faithful, editable design file that a designer could immediately inspect, adjust, and build from using our actual components.

That distinction was important. A visual recreation is useful as a reference, but an editable Figma frame made from real design-system components has much more long-term value. It means the output can become part of the design workflow, rather than just sitting beside it as a comparison or reference.

[Image/video suggestion: short clip of the command running, followed by the generated frame appearing in Figma]

## What worked well

Out of the box, Claude plus the Figma MCP was able to recreate the page pretty well. It could inspect the page, understand the general structure, and generate a Figma frame that visually resembled the product.

But while it was editable it didn't use the design system components in figma, and everything was absolutely positioned making it difficult to swap them out. So it could create frames, text, and blocks, but it struggled when I asked it to use the correct design-system components from our Figma component library.

THis required me to play around with this a little bit and the biggest unlock was being explicit about how i wanted the layout to work. Initially, everything in figma was absolutely positioned, this worked for a visual approximation, but it quickly broke down when inserting real design-system components. From here I decided id create a reusable skill that would explicitly specify i wanted it to prioritise auto layout and component-based construction using design system components where relevant.

From here the generated frames became much more usable, instead of just being a visual reference they were much closer to a file one of our actual designers would generate.

## Collaborating with Design

While this part was done a bit later on in the process, I did take the time to run the output in Figma past the leader designer so I could refine the skill and make sure things were being set up the way we prefer.

[[[TODO]]]

## The speed problem

Once the layout and component issues were mostly solved I was very happy with the output, it was good, but it was very slow.

Generating a full page could take anywhere from 10 to 20 minutes, depending on complexity. That's acceptable for an experiment, but too slow for a practical day-to-day workflow.

The major change I decided to make here was not regenerating the full application shell every time.

Most pages shared the same surrounding structure, including navigation, sidebars, and other persistent layout elements. Rather than asking Claude to recreate that shell for every page (which is also a waste of tokens), I generated it once and update the skill so that you could copy the shell from a file in Figma to your new frame as a starting point.

This meant Claude only needed to generate the unique page content and then place it inside the existing shell.As a result the generation time was significantly reduced now taking around 3 to 7 minutes, depending on complexity.

[Image suggestion: diagram showing “existing app shell” + “generated page content” = “complete Figma frame”]

## Where Code Connect helped

One of the things I really like about Figma and code is Code Connect. This is something we already had setup, if you don't have this then its a bit of an overhead.

If you are unfamiliar Code Connect links design-system components in Figma to their real code implementations. In practice, that means Claude can look at something like this in the source:

```
<Button importance="primary">
  Save changes
</Button>
```

And understand that it should insert the corresponding button component from the Figma design system, with the right variant and properties, rather than drawing a generic rectangle with text.

The same applies to larger patterns and components, such as form sections, alerts, field groups, and layout components.

Because we have mapped most of our design system with Code Connect, Claude has much more context about the relationship between code and design. It can use the source as a guide and then construct the Figma frame using real component instances. This removes a lot of guesswork from the generation.

[Image suggestion: Figma frame showing selected layers that are real design-system component instances rather than custom frames]

I like this because as mentioned the resulting Figma frame is made from components that designers can actually work with. Variants, properties, and auto layout behave as expected because they come from the library rather than being recreated from scratch. It also means if I want to do the opposite and turn the design back into code, it uses the correct components in the code from our code component library.

## Where it struggled

The workflow was not perfect. Most of the issues came from gaps or inconsistencies in the underlying system rather than from the generation itself. For example, Claude struggled more when:

- a component was not fully mapped through Code Connect
- the legacy code used old or awkward patterns
- the source structure did not clearly reflect the visual structure
- awkward or badly designed vintage UI
- the Figma component had variants or states that were not obvious from the code.

In those cases, the generated frame usually still got close, but it needed manual adjustment. Often that meant changing a component variant, switching a state, or tidying up a custom-generated element.

These issues were relatively minor, but they highlighted an important point: the better your design and UI are, the better your design system and Code Connect mappings are then the better this workflow becomes.

## Using the generated frame for redesign work

After I had all this done I decided to take it a bit further, once we had created a Figma frame of the existing page, I asked it to create a new version of the frame using a newer form pattern we had recently introduced.

I did not give it a huge amount of guidance in the first pass. Even so, the result was much better than I expected. It was not perfect, but it was a strong starting point.

After providing additional context and design guidance, Claude and Figma were able to produce a much more accurate version of the page using the newer patterns and components. In fact it was almost exactly how I would have done it if I'd been making the change manually.

The caveat is that this was a fairly simple form, so I do not want to overstate the result, but as a workflow, it was very promising. Instead of starting with a blank canvas, the designer starts with a generated representation of the current state and can quickly explore what the page might look like using newer patterns.

[Image suggestion: before and after frames — current generated page vs updated page using new form pattern]

## Sending it back to Code

The next step was sending the updated design back to Claude and asking it to build the page.

We have a separate skill for design-to-code generation, which I'll write about separately, but the early result was encouraging.

Because the Figma design used real design-system components, and because those components were connected to their code implementations through Code Connect, Claude was able to identify and use the correct components when building the page.

It still needed guidance around architectural patterns in the codebase itself, particularly for wiring up forms correctly, but the component selection was strong out of the box.

In practice we can now take a large migration or redesign effort from Source, into design, revise and back to code much faster than without claude and the Figma MCP.

It is not fully automated, and i'm not convinced it should be treated that way. But it creates a much faster loop between existing product code, design exploration, and implementation.

## Overall thoughts

Overall, I was pretty happy and I see real value here.

It is not perfect, and there are still areas where it needs human support, but the outcome is solid: a designer can get a faithful, editable representation of an existing page in Figma without manually recreating what already exists.

The most important part is that the generated frame is not just a picture of the page. It is built with real design-system components, which means it can be reviewed, adjusted, and evolved like any other design file.

The combination of source-code reading, Code Connect mappings, auto-layout rules, and a reusable shell template makes this a workflow worth continuing to build on.

For teams with large products, legacy interfaces, and mature design systems, this could become a very useful bridge between what exists in code today and what we want the product experience to become next.

What still feels missing is the ability to create richer, interactive prototypes using real design-system components. If Figma had something closer to Claude Design, but built directly around Figma components, Code Connect, and the MCP, the workflow would be fantastic. You could move from source code, to an editable design-system-based prototype, to implementation in whichever AI code generation tool you use. In my case, that would be Claude.

That would create a much stronger end-to-end loop while preserving the quality, consistency, and effort already invested in the design system. Instead of AI-generated work drifting away from the system, each step would stay grounded in the components, patterns, and implementation decisions the team already relies on.
