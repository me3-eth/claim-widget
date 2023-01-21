import '../assets/demo.css'
import { initialize, mswDecorator } from 'msw-storybook-addon'

initialize()

export const decorators = [mswDecorator]
