import keyboard
import clipboard

boards = ["","","","",""]
ccb = 0

def main():
	def setclipboard(board):
		global boards
		global ccb
		boards[ccb] = clipboard.paste()
		ccb = board
		clipboard.copy(boards[ccb])
	keyboard.add_hotkey("alt+1",setclipboard,args=(0,))
	keyboard.add_hotkey("alt+2",setclipboard,args=(1,))
	keyboard.add_hotkey("alt+3",setclipboard,args=(2,))
	keyboard.add_hotkey("alt+4",setclipboard,args=(3,))
	keyboard.add_hotkey("alt+5",setclipboard,args=(4,))
	keyboard.wait()

if __name__ == "__main__":
	main()