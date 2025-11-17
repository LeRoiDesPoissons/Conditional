import { Children, Component, type PropsWithChildren, type PropsWithoutRef, type ReactNode } from "react";

interface StatementProps extends PropsWithoutRef<PropsWithChildren> {
	condition: unknown,
	allowMultiple?: boolean
}

interface CaseProps extends PropsWithoutRef<PropsWithChildren> {
	value: unknown
}

class Statement extends Component<StatementProps> {
	private children: ReactNode[] = [];
	private fallback: ReactNode;

	private parseChildren(): void {
		const { children, fallback } = Children
			.toArray(this.props.children)
			.filter((child) => {
				if (typeof child === 'object'){
					return child;
				}
			})
			.reduce<{ children: ReactNode[], fallback: ReactNode }>(
				(accumulator, current) => {
					switch(String((current as { type: unknown }).type)) {
						case String(Case):
							accumulator.children.push(current);
							break;
						case String(Default):
							accumulator.fallback = current;
					}
					
					return accumulator;
				}, 
				{
					children: [],
					fallback: null
				} 
			);

		this.children = children.filter((child) => (child as unknown as Component<CaseProps>).props.value === this.props.condition);
		this.fallback = fallback;
	}

	public shouldComponentUpdate(nextProps: Readonly<StatementProps>): boolean {
		return this.props.allowMultiple !== nextProps.allowMultiple
		|| this.props.condition !== nextProps.condition
		|| String(this.props.children) !== String(nextProps.children);
	}

	public render(): ReactNode {
		this.parseChildren();

		if (this.children.length) {
			return this.children.slice(0, this.props.allowMultiple ? Children.count(this.children) : 1)
		}

		return this.fallback;
	}
}

class Case extends Component<CaseProps> {
	public accessor: typeof this.props.value;

	constructor(props: CaseProps) {
		super(props);
		this.accessor = props.value;
	}

	public render() {
		return this.props.children
	}
};

class Default extends Component<PropsWithChildren> {
	render(): ReactNode {
		return this.props.children;
	}
}

export const SwitchBlock = {
	Statement,
	Case,
	Default
}