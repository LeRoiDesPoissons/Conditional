import { Children, Component } from 'react';
import type { PropsWithChildren, ReactNode, PropsWithoutRef } from "react";

interface IfProps extends PropsWithoutRef<PropsWithChildren> { 
	condition: boolean;
	children: ReactNode
};

interface ElseProps extends PropsWithoutRef<PropsWithChildren> { children: ReactNode };

class Statement extends Component<IfProps> {
	private children: ReactNode[] = [];
	private fallback: ReactNode = null;

	private parseChildren(): void {
		const { children, fallback } = Children
			.toArray(this.props.children)
			.reduce<{ children: ReactNode[], fallback: ReactNode }>(
				(accumulator, current) => {
					if (typeof current === 'object' && String((current as { type: unknown }).type) === String(Else)) {
						accumulator.fallback = current;
					} else {
						accumulator.children.push(current);
					}

					return accumulator;
				}, 
				{
					children: [],
					fallback: null
				}
			);
		
		this.children = children;
		this.fallback = fallback;
	}

	public shouldComponentUpdate(nextProps: Readonly<IfProps>): boolean {
		return nextProps.condition === this.props.condition
			&& String(nextProps.children) === String(this.props.children);
	}

	public render(): ReactNode {
		this.parseChildren();

		if (!this.props.condition) {
			return this.fallback;
		}

		return this.children;
	}
}

class Else extends Component<ElseProps> {
	render(): ReactNode {
		return this.props.children
	}
};

export const IfBlock = {
	Statement,
	Else
}

