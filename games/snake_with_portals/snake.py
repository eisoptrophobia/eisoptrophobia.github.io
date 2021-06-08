from tkinter import *
import random

screensize = (800,600)
speed = 150
done = False

body = [[400,300]]
direction = "right"

head = body[0]

portal1 = [200,100]
portal2 = [550,450]
portal3 = [200,450]
portal4 = [550,100]

apple = [random.randint(0,(screensize[0] - 50) / 50) * 50,random.randint(0,(screensize[1] - 50) / 50) * 50]
while apple == portal1 or apple == portal2 or apple == portal3 or apple == portal4 or apple in body:
	apple = [random.randint(0,(screensize[0] - 50) / 50) * 50,random.randint(0,(screensize[1] - 50) / 50) * 50]
eat_apple = False

def presskey(e):
	global direction
	if e.char == "w":
		if direction != "down": direction = "up"
	elif e.char == "a":
		if direction != "right": direction = "left"
	elif e.char == "s":
		if direction != "up": direction = "down"
	elif e.char == "d":
		if direction != "left": direction = "right"

def up():
	global direction
	if direction != "down": direction = "up"
def down():
	global direction
	if direction != "up": direction = "down"
def left():
	global direction
	if direction != "right": direction = "left"
def right():
	global direction
	if direction != "left": direction = "right"

master = Tk()
master.title("Snake")
master.geometry("%dx%d+%d+%d" %(screensize[0],screensize[1],0,0))
screen = Canvas(master,width=screensize[0],height=screensize[1])
screen.pack()

screen.focus_set()

screen.bind("<Key>",presskey)
screen.bind("<Escape>",exit)
screen.bind("<Up>",lambda e: up())
screen.bind("<Down>",lambda e: down())
screen.bind("<Left>",lambda e: left())
screen.bind("<Right>",lambda e: right())

def move():
	global head
	global body
	global direction
	global apple
	global eat_apple
	global screen
	global done
	global master
	global portal1
	global portal2
	global speed
	global screensize
	
	screen.delete("all")
	
	if direction == "up":
		body.insert(0,[head[0],head[1] - 50])
	elif direction == "down":
		body.insert(0,[head[0],head[1] + 50])
	elif direction == "left":
		body.insert(0,[head[0] - 50,head[1]])
	elif direction == "right":
		body.insert(0,[head[0] + 50,head[1]])
		
	head = body[0]
	tail = list(body)
	tail.pop(0)
	
	for seg in tail:
		if head[0] == seg[0] and head[1] == seg[1]:
			done = True
			print ("----------------------------\n\n\nGAME OVER\n\n\n")
			current_score = len(body) - 1
			print ("SCORE:",current_score,"\n\n\n----------------------------")
			exit()
	
	if head[0] >= screensize[0] or head[0] < 0 or head[1] >= screensize[1] or head[1] < 0:
			done = True
			print ("----------------------------\n\n\nGAME OVER\n\n\n")
			current_score = len(body) - 1
			print ("SCORE:",current_score,"\n\n\n----------------------------")
			exit()

	if head == apple:
		eat_apple = True
		apple = [random.randint(0,15) * 50,random.randint(0,11) * 50]
		while apple == portal1 or apple == portal2 or apple == portal3 or apple == portal4 or apple in body:
			apple = [random.randint(0,(screensize[0] - 50) / 50) * 50,random.randint(0,(screensize[1] - 50) / 50) * 50]
	
	if head == portal1:
		head = portal2
	elif head == portal2:
		head = portal1
	elif head == portal3:
		head = portal4
	elif head == portal4:
		head = portal3
		
	if eat_apple == False:
		body.pop()
	
	eat_apple = False
		
	screen.create_rectangle(0,0,screensize[0],screensize[1],fill="#000000")
	for seg in body:
		screen.create_rectangle(seg[0],seg[1],seg[0] + 50,seg[1] + 50,fill="#ff0000")
		
	screen.create_rectangle(apple[0],apple[1],apple[0] + 50,apple[1] + 50,fill="#00ff00")
	screen.create_rectangle(portal1[0],portal1[1],portal1[0] + 50,portal1[1] + 50,fill="#3afff1")
	screen.create_rectangle(portal2[0],portal2[1],portal2[0] + 50,portal2[1] + 50,fill="#3afff1")
	screen.create_rectangle(portal3[0],portal3[1],portal3[0] + 50,portal3[1] + 50,fill="#a556ff")
	screen.create_rectangle(portal4[0],portal4[1],portal4[0] + 50,portal4[1] + 50,fill="#a556ff")
	
	master.after(speed,move)

master.after(speed,move)
master.mainloop()