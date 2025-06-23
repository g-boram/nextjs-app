import type { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const ModalStory: Story = {
  args: {
    isOpen: false,
    title: '공지사항 모달',
    children: (
      <div className="mt-4 text-gray-500 text-sm">
        공지사항입니다. 공지사항입니다. 공지사항입니다. 공지사항입니다.
        공지사항입니다. 공지사항입니다. 공지사항입니다. 공지사항입니다.
        공지사항입니다. 공지사항입니다. 공지사항입니다. 공지사항입니다.
        공지사항입니다. 공지사항입니다. 공지사항입니다. 공지사항입니다.
        공지사항입니다. 공지사항입니다. 공지사항입니다. 공지사항입니다.
        공지사항입니다. 공지사항입니다. 공지사항입니다. 공지사항입니다.
        공지사항입니다.
      </div>
    ),
    closeModal: () => {
      console.log('close')
    },
  },
}
