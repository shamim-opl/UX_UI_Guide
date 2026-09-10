# 08 — Component Inventory

Two distinct inventories. Do not conflate them.

## A. Platform UI components (the app's own interface, spec §50)

Built once, documented, reused everywhere: navigation shell, header, sidebar, breadcrumb, TOC, search bar, search results, filter chips, level card, topic card, progress indicator, article layout (three-pane desktop / stacked mobile), callout/admonition, code block, diagram embed, comparison table, previous/next nav, related-topics block, theme switcher, language toggle.

## B. Reference content: UI components documented AS CONTENT (spec §14)

These are the 36 components the platform *teaches about* — each becomes a `/reference` article, not a coded component in this app (unless reused as a live example):

```text
Button, Input, Textarea, Select, Checkbox, Radio, Switch, Search,
Tabs, Breadcrumb, Pagination, Tooltip, Popover, Dropdown, Modal,
Dialog, Drawer, Card, List, Table, Navigation, Sidebar, Header,
Footer, Toast, Alert, Banner, Progress, Skeleton, Avatar, Badge,
Chip, Calendar, Date Picker, File Upload, Form
```

Each documents: Definition, Anatomy, Purpose, When to use / not, Variants, Sizes, States, Spacing, Typography, Responsive behavior, Accessibility, Mobile/Tablet/Desktop behavior, Examples, Do/Don't, Related components (spec §14).

## Relationship between A and B

Where a platform component (A) and a reference topic (B) share a name (e.g. the platform's own Tabs component and the "Tabs" reference article), the platform component should be built as a **live, inspectable example** embedded in that reference article — this is the "Visual Learning" requirement (spec §40) and avoids describing a component without showing it.

## Priority order for MVP (spec §52 lists Home/Learn/Article/Reference/Search/Glossary/Platform-Guidelines/Theme/Language/Responsive/Accessibility as MVP)

Build only what those MVP surfaces need first: navigation shell, article layout, level/topic cards, search bar + results, TOC, breadcrumb, prev/next, theme switcher, language toggle, callout, code block. Defer: calendar, date picker, file upload, drawer, toast — these appear as reference *content* long before the platform itself needs them as *components*.
