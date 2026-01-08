---
title: "Breadcrumbs"
tags:
  - component
---

Breadcrumbs provide a way to navigate a hierarchy of pages within your site using a list of its parent folders.

By default, the element at the very top of your page is the breadcrumb navigation bar (can also be seen at the top on this page!).

## Customization

Most configuration can be done by passing in options to `Component.Breadcrumbs()`.

For example, here's what the default configuration looks like:

```typescript title="quartz.layout.ts"
Component.Breadcrumbs({
  spacerSymbol: "❯", // symbol between crumbs
  rootName: "Home", // name of first/root element
  resolveFrontmatterTitle: true, // whether to resolve folder names through frontmatter titles
  showCurrentPage: true, // whether to display the current page in the breadcrumbs
})
```

When passing in your own options, you can omit any or all of these fields if you'd like to keep the default value for that field.

You can also adjust where the breadcrumbs will be displayed by adjusting the [[layout]] (moving `Component.Breadcrumbs()` up or down)

Want to customize it even more?

- Removing breadcrumbs: delete all usages of `Component.Breadcrumbs()` from `quartz.layout.ts`.
- Component: `quartz/components/Breadcrumbs.tsx`
- Style: `quartz/components/styles/breadcrumbs.scss`
- Script: inline at `quartz/components/Breadcrumbs.tsx`

## Using A Frontmatter Prop

ParentBreadcrumbs` is an alternative breadcrumbs component that derives its hierarchy **entirely from frontmatter-defined parent relationships**, rather than folder structure. This is useful for knowledge-base–style sites, wikis, or any content where pages may belong to multiple logical hierarchies.

Unlike the default `Breadcrumbs` component, `ParentBreadcrumbs` supports:

- Explicit parent chains via frontmatter
- Multiple parents per level
- Wiki-style links (`[[Page Name]]`)
- Customizable frontmatter keys

### How It Works

`ParentBreadcrumbs` walks upward through a parent chain starting from the current page, following a configurable frontmatter field.  
At each level, **all parents are rendered**, while one unvisited parent is chosen to continue the chain upward.

Example frontmatter:

```yaml
---
title: "Advanced Topics"
parent: Basics
---
```

Wiki links are supported:

```yaml
parent: [[Basics]]
```

Multiple parents:

```yaml
parent:
- [[Basics]]
- [[Reference]]
```

### Configuration

You can configure `ParentBreadcrumbs` by passing options into `Component.ParentBreadcrumbs()`.

Default configuration:

```ts
Component.ParentBreadcrumbs({
  spacerSymbol: "❯",            // symbol displayed between breadcrumb levels
  rootName: "Home",             // label for the root (index) page
  resolveFrontmatterTitle: true, // use frontmatter.title instead of slug
  parentKey: "parent",          // frontmatter key used to resolve parents
})
```

All options are optional; omitted values fall back to the defaults.
