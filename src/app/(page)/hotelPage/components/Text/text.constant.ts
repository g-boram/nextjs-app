export enum TextType {
  TITLE = 'TITLE',
  SUBTITLE = 'SUBTITLE',
  GRAY_DESC = 'GRAY_DESC',
  DESC = 'DESC',
}

export const TextTypeStyle: { [key in TextType]: string } = {
  [TextType.TITLE]: 'text-xl md:text-2xl font-semibold',
  [TextType.SUBTITLE]: 'text-lg font-semibold md:text-xl',
  [TextType.DESC]: 'text-xs md:text-sm',
  [TextType.GRAY_DESC]: 'text-xs md:text-sm text-gray-500',
}
