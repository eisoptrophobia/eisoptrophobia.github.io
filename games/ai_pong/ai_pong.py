from tkinter import *
import random

master = Tk()
master.title("Pong")
screen = Canvas(master,width=800,height=600)
screen.pack()
screen.focus_set()

class Paddle():
	def __init__(self,x,y,color,width=25,height=60):
		self.x = x
		self.y = y
		self.color = color
		self.width = width
		self.height = height
	def up(self,e=None):
		self.y -= 8
		if self.y <= 0:
			self.y = 0
	def down(self,e=None):
		self.y += 8
		if self.y + self.height >= 600:
			self.y = 600 - self.height
	def draw(self):
		screen.create_rectangle(self.x,self.y,self.x + self.width,self.y + self.height,fill=self.color)

class Ball():
	def __init__(self,x,y,color,motion=[6,6],width=15,height=15):
		self.x = x
		self.y = y
		self.color = color
		self.motion = motion
		self.width = width
		self.height = height
	def move(self,paddles):
		self.x += self.motion[0]
		self.y += self.motion[1]
		if self.y <= 0 or self.y + self.height >= 600:
			self.motion[1] *= -1
		for paddle in paddles:
			if self.x < paddle.x + paddle.width and self.x + self.width > paddle.x and self.y < paddle.y + paddle.height and self.y + self.height > paddle.y:
				self.motion[0] *= -1
				self.motion[1] += random.randrange(-10,10,1) / 2
				if self.motion[1] >= 8:
					self.motion[1] = 8
				elif self.motion[1] <= -8:
					self.motion[1] = -8
				elif self.motion[1] <= 6 and self.motion[1] > 6:
					self.motion[1] = 6
				elif self.motion[1] >= -6 and self.motion[1] < 6:
					self.motion[1] = -6
		if self.x + self.height >= 800:
			print ("You win!")
			exit()
		elif self.x <= 0:
			print ("You lose!")
			exit()
	def draw(self):
		screen.create_rectangle(self.x,self.y,self.x + self.width,self.y + self.height,fill=self.color)

player = Paddle(20,270,"#ff0000")
enemy = Paddle(755,270,"#0000ff")
ball = Ball(400,300,"#00ff00")

screen.bind("q",exit)

def gameloop():
	global player
	global enemy
	global ball
	
	screen.delete("all")
	
	ball.move([player,enemy])
	
	if ball.y - 10 >= enemy.y and ball.motion[0] > 0:
		enemy.down()
	elif ball.y + ball.height + 10 <= enemy.y + enemy.height and ball.motion[0] > 0:
		enemy.up()
		
	if ball.y - 10 >= player.y and ball.motion[0] < 0:
		player.down()
	elif ball.y + ball.height + 10 <= player.y + player.height and ball.motion[0] < 0:
		player.up()
	
	screen.create_rectangle(-100,-100,900,700,fill="#000000")
	player.draw()
	enemy.draw()
	ball.draw()
		
	screen.after(5,gameloop)

screen.after(5,gameloop)
master.mainloop()