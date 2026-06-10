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

card:
  {
    cardImage: /assets/images/placeholder-hero.svg,
    cardAlt: Generated Figma design workflow using Claude Code and design-system components,
  }
---

# Generating Figma Designs from Code with Claude

I've recently been experimenting with design and code workflows to understand where AI can make our lives easier without compromising the quality we've spent a long time working towards.

The first workflow I explored was using Claude Code to generate Figma designs directly from the source.

The main reason for starting here was that the product I am working on has a lot of older code and legacy components that need to be reviewed, refreshed, and brought closer to our current design-system components and patterns. The surface area is large, and while the goal is not to simply recreate every existing page in Figma, having an accurate starting point still matters.

Some pages will need deeper manual design work to address years of accumulated issues, but even getting them to that point can be a long and repetitive process.

Instead of a designer manually rebuilding what already exists, I wanted to see if I could get Claude to read the source code, understand the page structure, map code components to their Figma design-system equivalents, and generate an editable Figma frame automatically with the Figma MCP.

The short answer is yes, but it took some upfront investment to make the workflow useful.

## The workflow

Where I ended up was a `/page-to-figma` skill that takes a local URL and a Figma file key, reads the page source, and generates an editable Figma frame using published components from our Figma design system library.

```bash
/page-to-figma http://localhost:5000/page [FIGMA_FILE_KEY]
```

The goal was not to create a pixel-perfect version of a screenshot. Claude and the Figma MCP can already get reasonably close to visual recreation. What I wanted was a faithful, editable design file that a designer could immediately inspect, adjust, and build from using our actual components.

This mattered to me because while a visual recreation is useful as a reference I feel like an editable Figma frame made from real design system components has much more long term value. It means the output can become part of the design workflow, rather than just sitting beside it as a comparison.

## What worked well

Out of the box, Claude plus the Figma MCP was able to recreate the page structure fairly well. It could inspect the page, understand the general hierarchy, and generate a Figma frame that resembled the product.

But while the output was editable, it did not initially use the design-system components in Figma. Everything was also absolutely positioned, which made it difficult to work with or swap components later. It could create frames, text, and blocks, but it struggled when I asked it to use the correct design-system components from our Figma component library.

The biggest unlock was being much more explicit about how I wanted the layout to work. I ended up creating a reusable skill that explicitly told Claude to tell Figma to prioritise auto layout and component-based construction using design system components wherever relevant.

Once I made that expectation clear, the generated frames became much more usable and were much closer to the kind of file one of our designers would actually create.

## Collaborating with design

Once area that I still need to address is running the output past a lead designer, at a glance it looks fine, but I think I could refine the skill and make sure the generated frames were being set up in the way we prefer.

This step is important because the value of this workflow is not only whether Claude can generate something that looks right. It is whether the result behaves like a usable design file.

That means sensible layout structure, appropriate component usage, understandable layer organisation, and enough consistency that a designer can pick it up without having to immediately rebuild it.

## The speed problem

Once the layout and component issues were mostly solved, I was happy with the output, but it was still very slow.

Generating a full page could take anywhere from 10 to 20 minutes, depending on complexity. That is acceptable for an experiment, but too slow for a practical day-to-day workflow.

The major change I made was to stop regenerating the full application shell every time.

Most pages shared the same surrounding structure, including navigation, sidebars, and other persistent layout elements. Rather than asking Claude to recreate that shell for every page, which was also a waste of tokens, I generated it once and updated the skill so that it could copy the shell from an existing Figma file into the new frame as a starting point.

This meant Claude only needed to generate the unique page content and place it inside the existing shell.

As a result, generation time dropped significantly. Depending on complexity, it was closer to 3 to 7 minutes rather than 10 to 20.

That change also made the workflow feel more aligned with how the product is actually structured. The application shell is stable; the page content is what changes. Treating those separately made the process faster and more reliable.

## Where Code Connect helped

One of the things I really like about using the Figma MCP is Code Connect. This is something we already had set up so if you do not have this set up already there is some overhead involved to get the full benefits of the Figma MCP.

If you are unfamiliar, Code Connect links design-system components in Figma to their real code implementations. In practice, that means Claude can look at something like this in the source:

```jsx
<Button importance="primary">Save changes</Button>
```

And understand that it should insert the corresponding button component from the Figma design system, with the right variant and properties, rather than drawing a generic rectangle with text.

The same applies to larger patterns and components, such as form sections, alerts, field groups, and layout components.

Because we have mapped most of our design system with Code Connect, Claude has much more context about the relationship between code and design. It can use the source as a guide and then construct the Figma frame using real component instances.

This removes a lot of guesswork from the generation.

I like this because the resulting Figma frame is made from components that designers can actually work with. Variants, properties, and auto layout behave as expected because they come from the library rather than being recreated from scratch.

It also means that if I want to go in the opposite direction and turn the design back into code, Claude has a much clearer path to the correct components in our code component library.

## Where it struggled

The workflow was not perfect however in it's defence most of the issues came from gaps or inconsistencies in the underlying system rather than from the generation itself.

Claude struggled more when:

- a component was not fully mapped through Code Connect
- the legacy code used old or awkward patterns
- the source structure did not clearly reflect the visual structure
- the existing UI was awkward or inconsistently designed
- the Figma component had variants or states that were not obvious from the code

In those cases, the generated frame usually still got close, but it needed manual adjustment. Often that meant changing a component variant, switching a state, or tidying up a custom-generated element.

These issues were relatively minor, but they highlighted an important point: the better your design system, Code Connect mappings, source structure, and UI patterns are, the better this workflow becomes.

I may be biased in my thinking but for me this reinforces the idea that AI does not remove the need for a strong well designed and maintained system it actually benefits from one.

## Using the generated frame for redesign work

After I had the initial workflow working, I decided to take it further.

Once we had created a Figma frame of the existing page, I asked Claude to create a new version using a newer form pattern we had recently introduced.

I did not give it a huge amount of guidance in the first pass. Even so, the result was much better than I expected. It was not perfect, but it was a strong starting point.

After providing additional context and design guidance, Claude and Figma were able to produce a much more accurate version of the page using the newer patterns and components. In fact, it was almost exactly how I would have approached the change manually.

The caveat is that this was a fairly simple form, so I do not want to overstate the result. But as a workflow, it was very promising.

Instead of starting with a blank canvas, the designer starts with a generated representation of the current state and can quickly explore what the page might look like using newer patterns.

That is where I think this approach becomes genuinely useful. It is not about replacing design judgment. It is about reducing the time it takes to get to the point where design judgment can be applied.

## Sending it back to code

The next step was sending the updated design back to Claude and asking it to build the page.

We have a separate skill for design-to-code generation, which I will write about separately, but the early result was encouraging.

Because the Figma design used real design-system components, and because those components were connected to their code implementations through Code Connect, Claude was able to identify and use the correct components when building the page.

It still needed guidance around architectural patterns in the codebase itself, particularly for wiring up forms correctly, but the component selection was strong out of the box.

In practice, we can now take a large migration or redesign effort from source, into design, through revision, and back to code much faster than we could without Claude and the Figma MCP.

It is not fully automated, and I am not convinced it should be treated that way. But it creates a much faster loop between existing product code, design exploration, and implementation.

## Overall thoughts

Overall, I was pretty happy with the result, and I see real value here.

It is not perfect, and there are still areas where it needs human support, but the outcome is solid: a designer can get a faithful, editable representation of an existing page in Figma without manually recreating what already exists.

The most important part is that the generated frame is not just a picture of the page. It is built with real design-system components, which means it can be reviewed, adjusted, and evolved like any other design file.

The combination of source-code reading, Code Connect mappings, auto-layout rules, and a reusable shell template makes this a workflow worth continuing to build on.

For teams with large products, legacy interfaces, and mature design systems, this could become a very useful bridge between what exists in code today and what we want the product experience to become next.

What still feels missing is the ability to create richer, interactive prototypes using real design-system components. If Figma had something closer to Claude Design, but built directly around Figma components, Code Connect, and the MCP, the workflow would be fantastic.

You could move from source code, to an editable design-system-based prototype, to implementation in whichever AI code generation tool you use. This would create a much stronger end-to-end loop while preserving the quality, consistency, and effort already invested in the design system. Instead of AI generated work drifting away from the system, each step would stay grounded in the components, patterns, and implementation decisions the team already relies on.

From my experiments with Claude Design and Figma MCP, I do not think either approach solves all of the problems yet, but I am interested to see how this space develops.
