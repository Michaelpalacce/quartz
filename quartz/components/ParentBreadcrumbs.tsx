import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";
import { QuartzPluginData } from "../plugins/vfile";
import { classNames } from "../util/lang";
import { resolveRelative, simplifySlug, FullSlug, SimpleSlug } from "../util/path";
import style from "./styles/breadcrumbs.scss";

interface ParentBreadcrumbsOptions {
	spacerSymbol?: string;
	rootName?: string;
	resolveFrontmatterTitle?: boolean;
}

const defaultOptions: ParentBreadcrumbsOptions = {
	spacerSymbol: "❯",
	rootName: "Home",
	resolveFrontmatterTitle: true,
};

export default ((opts?: ParentBreadcrumbsOptions) => {
	const options = { ...defaultOptions, ...opts };

	const ParentBreadcrumbs: QuartzComponent = ({
		fileData,
		allFiles,
		displayClass,
	}: QuartzComponentProps) => {

		const parseWikiLink = (content: string): string => {
			if (!content) return "";
			let clean = content.trim().replace(/^["']|["']$/g, "");
			clean = clean.replace(/^\[\[|\]\]$/g, "");
			return clean.split("|")[0];
		};

		const findFile = (name: string) => {
			const targetSlug = simplifySlug(name as FullSlug);

			return allFiles.find((f: QuartzPluginData) => {
				const fSlug = simplifySlug(f.slug!);
				return fSlug === targetSlug || fSlug.endsWith(targetSlug) || f.frontmatter?.title === name;
			});
		};

		const crumbs: Array<{ displayName: string; path: string; }> = [];
		let current = fileData;
		const visited = new Set<string>();
		if (current.slug) visited.add(current.slug);

		while (current && current.frontmatter?.parent) {
			const parentLink = parseWikiLink(current.frontmatter.parent as string);
			const parentFile = findFile(parentLink);

			if (parentFile && parentFile.slug && !visited.has(parentFile.slug)) {
				visited.add(parentFile.slug);
				crumbs.push({
					displayName: options.resolveFrontmatterTitle
						? parentFile.frontmatter?.title ?? parentFile.slug
						: parentFile.slug,
					path: resolveRelative(fileData.slug!, parentFile.slug!)
				});
				current = parentFile;
			} else {
				break;
			}
		}

		if (current.slug !== "index") {
			crumbs.push({
				displayName: options.rootName!,
				path: resolveRelative(fileData.slug!, "index" as SimpleSlug)
			});
		}

		crumbs.reverse();

		if (crumbs.length === 0 && fileData.slug === "index") {
			return <></>;
		}

		return (
			<nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
				{crumbs.map((crumb, index) => (
					<div class="breadcrumb-element">
						<a href={crumb.path}>{crumb.displayName}</a>
						{index !== crumbs.length && <p>{options.spacerSymbol}</p>}
					</div>
				))}
				<div class="breadcrumb-element">
					<p>{fileData.frontmatter?.title}</p>
				</div>
			</nav>
		);
	};

	ParentBreadcrumbs.css = style;
	return ParentBreadcrumbs;
}) satisfies QuartzComponentConstructor
