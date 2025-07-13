import type { Meta, StoryObj } from '@storybook/react'
import NextButton from './NextButton'

const meta = {
  title: 'Components/NextButton',
  component: NextButton,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['button', 'submit'] },
  },
} satisfies Meta<typeof NextButton>

export default meta
type Story = StoryObj<typeof meta>

export const NextButtonStory: Story = {
  args: {
    text: 'Next Button',
  },
}
