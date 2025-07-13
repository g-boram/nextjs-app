import type { Meta, StoryObj } from '@storybook/react'
import { Loader } from './index'

const meta = {
  title: 'Components/Loader/DefaultLoader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const LoaderStory: Story = {}
