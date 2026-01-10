import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Stefan Genov",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "garden.sgenov.dev",
    ignorePatterns: ["private", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#1e1e2e", // Background
          lightgray: "#181825", // Borders and '``'
          gray: "#b4befe", // Search, Graph Links, Heavier Borders
          darkgray: "#cdd6f4", // Text
          dark: "#cdd6f4", // Sidebar Links and Bold Text
          secondary: "#fab387", // Links
          tertiary: "#89b4fa", // Selected Sidebar + Hover
          highlight: "#00000000", // links (transparent)
          textHighlight: "#11111b", // no clue
        },
        darkMode: {
          light: "#1e1e2e", // Background
          lightgray: "#181825", // Borders and '``'
          gray: "#b4befe", // Search, Graph Links, Heavier Borders
          darkgray: "#cdd6f4", // Text
          dark: "#cdd6f4", // Sidebar Links and Bold Text
          secondary: "#fab387", // Links
          tertiary: "#89b4fa", // Selected Sidebar + Hover
          highlight: "#00000000", // links (transparent)
          textHighlight: "#11111b", // no clue
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false, disableBrokenWikilinks: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", lazyLoad: true }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        includeEmptyFiles: false,
        rssFullHtml: true,
        rssLimit: 10,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages({
        colorScheme: "darkMode",
      }),
    ],
  },
}

export default config
