import { useState } from "react"
import { IfBlock } from "./components"

export const IfDemo = () => {
	const [show, toggleShow] = useState<boolean>(true);
	return (
		<>
			<IfBlock.Statement condition={show}>
				<div>yay</div>
				<IfBlock.Else>
					Else condition
				</IfBlock.Else>
			</IfBlock.Statement>
			<button onClick={() => toggleShow((a) => !a)} >
				{
					show 
						? 'hide'
						: 'show'

				}
			</button>
		</>
	)
}