export enum ButtonType {
  PRIMARY_LARGE = 'PRIMARY_LARGE',
  PRIMARY_SMALL = 'PRIMARY_SMALL',
  PRIMARY_LARGE_OUTLINE = 'PRIMARY_LARGE_OUTLINE',
  PRIMARY_SMALL_OUTLINE = 'PRIMARY_SMALL_OUTLINE',
  BLACK_LARGE = 'BLACK_LARGE',
  BLACK_LARGE_OUTLINE = 'BLACK_LARGE_OUTLINE',
  BLACK_SMALL_ROUNDED = 'BLACK_SMALL_ROUNDED',
}

export const ButtonTypeStyle: { [key in ButtonType]: string } = {
  [ButtonType.PRIMARY_LARGE]:
    'bg-rose-500 hover:bg-rose-600 text-white rounded-md py-2.5 w-full disabled:bg-gray-300',
  [ButtonType.PRIMARY_SMALL]:
    'bg-rose-500 hover:bg-rose-600 text-white rounded-md py-2 px-3 text-sm disabled:bg-gray-300',
  [ButtonType.PRIMARY_LARGE_OUTLINE]:
    'bg-white border-rose-500 border hover:bg-rose-500/5 text-rose-500 rounded-md py-2.5 w-full disabled:bg-gray-300',
  [ButtonType.PRIMARY_SMALL_OUTLINE]:
    'bg-white border border-rose-500 hover:bg-rose-500/5 text-rose-500 rounded-md py-2 px-3 text-sm disabled:bg-gray-300',
  [ButtonType.BLACK_LARGE]:
    'bg-black hover:bg-black/60 text-white rounded-md py-2.5 w-full disabled:bg-gray-300',
  [ButtonType.BLACK_LARGE_OUTLINE]:
    'bg-white border border-black hover:bg-black/5 text-black rounded-md py-2.5 w-full disabled:bg-gray-300',
  [ButtonType.BLACK_SMALL_ROUNDED]:
    'bg-black hover:bg-black/60 text-white rounded-full py-2 px-3 text-sm disabled:bg-gray-300',
}
