import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IfDemo } from './If-demo'
import { SwitchDemo } from './switch-demo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<IfDemo />
	<SwitchDemo />
  </StrictMode>,
)
