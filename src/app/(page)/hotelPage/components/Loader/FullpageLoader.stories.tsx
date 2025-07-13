import type { Meta, StoryObj } from '@storybook/react'
import { FullPageLoader } from './index'

const meta = {
  title: 'Components/Loader/FullPageLoader',
  component: FullPageLoader,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof FullPageLoader>

export default meta
type Story = StoryObj<typeof meta>

export const FullPageLoaderStory: Story = {}
