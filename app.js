/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 1504
canvas.height = 664


let enmy_cars = []
let line = 0
let score = 0
let gameover = false
let speedOfEnemy = 8
let speedOfCar = 4
let sound = new Audio()
sound.src = 'game-start-6104.mp3'
sound.play()
let soundOfCar = new Audio()
soundOfCar.src = 'car.mp3'
class Background {
    constructor(){
        this.width =1504
        this.height =664
        this.x = 0
        this.y = 0
        this.speed = 0
        this.image = document.getElementById("background")
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.drawImage(this.image,this.x ,this.y - this.height,this.width,this.height)
    }
    update(){
        this.y+=this.speed
        if(this.y > this.height){
            this.y = 0
        }
    }
}
class Car {
    constructor (){
        this.x= 250
        this.y = 450
        this.width = 190
        this.height = 190
        this.spritewidth = 300
        this.spriteheight = 340
        this.up = 0
        this.down = 0
        this.left = 0
        this.right = 0
        this.image = document.getElementById("car")
        this.frame = 2

    }
    draw(){
        ctx.drawImage(this.image,this.frame * this.spritewidth , 0 , this.spritewidth , this.spriteheight , this.x , this.y , this.width ,  this.height)
    }
    update(){
        this.x -= this.left
        this.x -= this.right

        enmy_cars.forEach(enemy => {
            const dx = enemy.x - this.x
            const dy = enemy.y - this.y
            const distance =  Math.sqrt(dx * dx + dy * dy)
            if(distance < enemy.width/4 + this.width/2){
                gameover = true
                
            }
        })
    }
}

class Enmy_Car {
    constructor(line){
        this.x= 260 * line
        this.y = -250
        this.width = 190
        this.height = 190
        this.spritewidth = 300
        this.spriteheight = 420
        this.image = document.getElementById('car2')
        this.frame = 1
        this.speed = 0
    }
    draw(){
        ctx.drawImage(this.image,this.frame * this.spritewidth , 0 , this.spritewidth , this.spriteheight , this.x , this.y , this.width ,  this.height)
    }
    update(){
        this.y += this.speed
        if(this.y > 664 ){
            this.y =-20000;
            score +=1                       
        }
    }
}

let timer = 0
const background = new Background()
const car = new Car()

window.addEventListener('keydown' ,(event) => {
    switch(event.key){
        case 'ArrowUp' :
            background.speed = speedOfCar
            enmy_cars.forEach(car =>{
                car.speed = speedOfEnemy
            })
            timer++
            soundOfCar.play()
            break
        case 'ArrowLeft' :
            car.left = speedOfCar
            background.speed = speedOfCar
            enmy_cars.forEach(car =>{
                car.speed = speedOfEnemy
            })
            soundOfCar.play()
            timer++
            break
        case 'ArrowRight' :
            car.right = -speedOfCar
            background.speed = speedOfCar
            enmy_cars.forEach(car =>{
                car.speed = speedOfEnemy
            })
            soundOfCar.play()
            timer++
            break
    
    }
})

window.addEventListener('keyup' ,(event) => {
    switch(event.key){
        case 'ArrowUp' :
            background.speed = 0
            enmy_cars.forEach(car =>{
                car.speed = 0
            })        
            soundOfCar.pause()
            break
        case 'ArrowLeft' :
            car.left = 0
            background.speed = 0
            enmy_cars.forEach(car =>{
                car.speed = 0
            })
            soundOfCar.pause()
            break
        case 'ArrowRight' :
            car.right = 0
            background.speed = 0
            enmy_cars.forEach(car =>{
                car.speed = 0
            })
            soundOfCar.pause()
            break
    }
})

function  animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    background.draw()
    background.update()
    car.draw()
    car.update()
    console.log(timer);
    document.getElementById('score').innerHTML = ('Score:' + score)
    document.getElementById('speed').innerHTML = ('Speed:' + speedOfCar)
    if(timer === 30){
        line = Math.floor(Math.random() * 4 ) + 1
        console.log('line :',line);
        enmy_cars.push(new Enmy_Car(line))
        timer = 0
        if(line === 5){
            line = 0
        }
    }
    enmy_cars.forEach(car => {
        car.draw()
        car.update()
    })

    if(score === 10){
        speedOfEnemy = 10
        speedOfCar = 6
    }
    if(score === 15){
        speedOfEnemy = 14
        speedOfCar = 9
    }
    if(!gameover){

    }
    if(!gameover)requestAnimationFrame(animate)
}
animate()