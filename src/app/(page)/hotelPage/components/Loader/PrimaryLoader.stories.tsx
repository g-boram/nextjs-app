import type { Meta, StoryObj } from '@storybook/react'
import { PrimaryLoader } from './index'

const meta = {
  title: 'Components/Loader/PrimaryLoader',
  component: PrimaryLoader,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof PrimaryLoader>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryLoaderStory: Story = {}
