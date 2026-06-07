module.exports = [
  {
    name: "Claude Code + Figma MCP",
    category: ["Code → Design", "Design → Code"],
    designSystemAdherence: "High",
    adherenceNotes:
      "Reads source code and maps to DS components via Code Connect. Adherence is directly tied to how well Code Connect is set up.",
    usesDSElementsDirectly: true,
    usesDSNotes:
      "Inserts real Figma or code component instances from the DS library (not recreations) when Code Connect is configured.",
    output: ["Figma frames", "Editable components", "HTML/code"],
    integrations: ["Figma MCP", "VS Code", "Claude Code CLI"],
    tokenSupport: "Yes",
    tokenNotes:
      "Uses Code Connect mappings to resolve design tokens and component variants from source code.",
    workflowStage: ["Implementation", "Handoff", "Audit"],
    humanReviewEffort: "Medium",
    reviewNotes:
      "Component gaps or legacy code patterns require manual intervention but a well-mapped DS reduces effort significantly.",
  },
  {
    name: "Claude Design + Claude Code",
    category: ["Prompt → Design", "Design → Code"],
    designSystemAdherence: "Medium",
    adherenceNotes:
      "Generates visually coherent UI but approximates from a one-time read of your design system not a live source of truth. ",
    usesDSElementsDirectly: false,
    usesDSNotes:
      "Generates custom elements that may resemble DS patterns visually, but are not DS component instances.",
    output: ["Interactive prototypes", "Visual mockups"],
    integrations: ["Claude.ai"],
    tokenSupport: "No",
    tokenNotes:
      "Uses its own visual reasoning — no access to your token values or component library.",
    workflowStage: ["Ideation", "Exploration"],
    humanReviewEffort: "High",
    reviewNotes:
      "Useful for rapid exploration and concept validation, but requires significant manual work to bring output into alignment with a design system.",
  },
];
