import type { Meta, StoryObj } from '@storybook/react'
import Stepper from './Stepper'

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    count: { control: 'number' },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const StepperStory: Story = {
  args: {
    count: 2,
  },
}
