import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { ButtonType } from './button.constant'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    primary: { control: 'boolean' },
    label: { control: 'text' },
    className: { control: 'text' },
    type: {
      control: 'select',
      options: Object.keys(ButtonType),
      mapping: ButtonType,
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Button',
    primary: true,
  },
}

export const Black: Story = {
  args: {
    label: 'Button',
    type: ButtonType.BLACK_LARGE,
  },
}

export const PrimaryOutline: Story = {
  args: {
    label: 'Button',
    type: ButtonType.PRIMARY_LARGE_OUTLINE,
  },
}

export const BlackOutline: Story = {
  args: {
    label: 'Button',
    type: ButtonType.BLACK_LARGE_OUTLINE,
  },
}

export const BlackRounded: Story = {
  args: {
    label: 'Button',
    type: ButtonType.BLACK_SMALL_ROUNDED,
  },
}
