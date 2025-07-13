import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'
import { TextType } from './text.constant'

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    className: { control: 'text' },
    type: {
      control: 'select',
      options: Object.keys(TextType),
      mapping: TextType,
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const TextStory: Story = {
  args: {
    label: '가나다라바마사 1234567890 ~!@#$%^&*() ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
}
