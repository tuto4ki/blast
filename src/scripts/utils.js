export function getRandom(min, max) {
  if (min > max) {
    const temp = min;
    max = min;
    min = temp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function resizePicture(scene, x, y, SCALE_GAME, heightField, widthField, picAngle, picVert, picHoriz, picCenter) {

  const pictureAngle = scene.add
    .image(x, y, picAngle)
    .setScale(SCALE_GAME)
    .setOrigin(0);

  const heightLeft = (heightField - 2 * pictureAngle.height);
  const widthTop = (widthField - 2 * pictureAngle.width);

  const posX = SCALE_GAME * widthField / 2;
  const posY = SCALE_GAME * heightField / 2;
  const posTop = { x: x - posX, y: y - posY };
  const posBottom = { x: x + posX, y: y + posY };
  pictureAngle.x = posTop.x;
  pictureAngle.y = posTop.y;

  scene.add
    .image(posBottom.x, posBottom.y, picAngle)
    .setScale(-SCALE_GAME)
    .setOrigin(0);
  
  scene.add
    .image(posBottom.x, posTop.y, picAngle)
    .setScale(-SCALE_GAME, SCALE_GAME)
    .setOrigin(0);
  
  scene.add
    .image(posTop.x, posBottom.y, picAngle)
    .setScale(SCALE_GAME, -SCALE_GAME)
    .setOrigin(0);

  const pictureLeft =  scene.add
    .image(posTop.x, y, picVert)
    .setOrigin(0, 0.5);
  
  const scaleBgY = (heightLeft / pictureLeft.height) * SCALE_GAME;
  const scaleBgX = (widthTop / pictureLeft.width) * SCALE_GAME;
  pictureLeft.setScale(SCALE_GAME, scaleBgY);

  scene.add
    .image(posBottom.x, y, picVert)
    .setScale(-SCALE_GAME, scaleBgY)
    .setOrigin(0, 0.5);
  
  const pictureTop = scene.add
    .image(x, posTop.y, picHoriz)
    .setOrigin(0.5, 0);
  pictureTop.setScale(scaleBgX, SCALE_GAME);

  scene.add
    .image(x, posBottom.y, picHoriz)
    .setScale(scaleBgX, -SCALE_GAME)
    .setOrigin(0.5, 0);

  scene.add
    .image(x, y, picCenter)
    .setScale(scaleBgX, scaleBgY)
    .setOrigin(0.5);
}
