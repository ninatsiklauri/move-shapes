
import * as PIXI from "pixi.js";

const rectBtn = document.getElementById("rectBtn") as HTMLButtonElement;
const circleBtn = document.getElementById("circleBtn") as HTMLButtonElement;
const selectBtn = document.getElementById("select") as HTMLButtonElement
const icons = document.querySelectorAll("i")



const app = new PIXI.Application<HTMLCanvasElement>({
  width: 600,
  height: 600,
  backgroundColor: "#aaa"
});


document.body.appendChild(app.view);

interface Shape {
  height?: number;
  width?: number;
  y: number;
  x: number;
  color: string;
  shape: PIXI.Graphics;
  radius?:number;
  draw(): void;
  selectShape(): void;
  moveRight():void;
  moveLeft():void;
  moveDown():void;
  moveUp():void;
}


enum ShapeTypes {
  rect = 1,
  circle = 2
}


const shapes: Shape[] = [];
let selectedShape: Shape | null = null


class Rectangle implements Shape {
  shape: PIXI.Graphics;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string,
  ) {
    this.shape = new PIXI.Graphics()
    this.shape.beginFill(this.color)
      .lineStyle(2)
      .drawRect(this.x, this.y, this.width, this.height)
      .endFill()
  }

  draw(): void {
    app.stage.addChild(this.shape);
  }

  selectShape(): void {
    this.shape.interactive = true;
    this.shape.on('click', () => {
      selectedShape = this
    });
  }

  moveUp() {
    this.shape.y -= 10;
  }

  moveDown() {
    this.shape.y += 10;
  }

  moveLeft() {
    this.shape.x -= 10;
  }

  moveRight() {
    this.shape.x += 10;
  }
}



class Circle implements Shape {
  shape: PIXI.Graphics;

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public color: string,
  ){
    this.shape = new PIXI.Graphics()
    this.shape.beginFill(this.color)
      .lineStyle(2)
      .drawCircle(this.x, this.y, this.radius)
      .endFill()
  }

  draw(): void {
    app.stage.addChild(this.shape);
  }

  selectShape(): void {
    this.shape.interactive = true;
    this.shape.on('click', () => {
      selectedShape = this;
    });
  }


  moveUp() {
    this.shape.y -= 10;
  }

  moveDown() {
    this.shape.y += 10;
  }

  moveLeft() {
    this.shape.x -= 10;
  }

  moveRight() {
    this.shape.x += 10;
  }
}




function generateRandomShape (shapeType: ShapeTypes):Shape {
  let shape: Shape;
  const randomX = (Math.floor(Math.random() * 600));
  const randomY =( Math.floor(Math.random() * 600));
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  
  switch(shapeType){
    case ShapeTypes.rect:
        const randomWidth = Math.floor(Math.random() * 50) + 50;
        const randomHeight = Math.floor(Math.random() * 50) + 50;
        shape = new Rectangle(randomX,randomY,randomWidth,randomHeight,randomColor)
      break;
    case ShapeTypes.circle:
        const randomRadius = Math.floor(Math.random() * 50) + 25;
        shape = new Circle(randomX,randomY,randomRadius,randomColor)
      break;
      default:
        throw new Error()
  }
  return shape
}


function drawRandomShape(shapeType: ShapeTypes){
  shapes.push(generateRandomShape(shapeType));
  shapes.forEach(el => {
      el.draw();
  });
}


icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    if (selectedShape !== null) {
      switch (icon.classList[1]) {
        case "fa-arrow-up":
          selectedShape.moveUp();
          break;
        case "fa-arrow-down":
          selectedShape.moveDown();
          break;
        case "fa-arrow-left":
          selectedShape.moveLeft();
          break;
        case "fa-arrow-right":
          selectedShape.moveRight();
          break;
      };
    };
  });
});


selectBtn.addEventListener("click", () => {
  shapes.forEach(item => {
    item.selectShape()
  })
})


rectBtn.addEventListener("click", () => {
  drawRandomShape(ShapeTypes.rect);
})


circleBtn.addEventListener("click", () => {
  drawRandomShape(ShapeTypes.circle);
})