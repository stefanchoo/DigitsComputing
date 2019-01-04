/* This script file handles the game logic */
.import QtQuick 2.0 as Quick
.import "EndEffect.js" as EndEffect
.import "Circle.js" as Circle

// 定义全局唯一的对象
var screen
var gameScreenObject
// 终端对象
var endEffectObject
// 目标点指示
var circleTargetObject

var targetPoints = [] // 目标点集合
// 被拖动的基本形状
var dynamicObject
var viewObject

var currentTragetIndex = 0 // 当前目标点位

var targetValue
var values = []

function createGameScreen(view, gameData) {
    screen = view // 拿到外部对象
    gameScreenObject = new Object
    var gameScreenComponent = Qt.createComponent("../views/GameScreen.qml")
    if (gameScreenComponent.status === Quick.Component.Ready) {
        gameScreenObject = gameScreenComponent.createObject(view)
        if (gameScreenObject === null) {
            console.log("error creating combine")
            console.log(gameScreenComponent.errorString())
            return null
        }
        //TODO： 初始化传递数据
        gameScreenObject.gameData = gameData
        targetValue = gameData.data_list[gameData.target_index]
        if(gameData.target_index !== 1 && targetValue > 9) {
            values.push(Math.floor(targetValue / 10))
            values.push(targetValue % 10)
        } else {
            values.push(targetValue)
        }
        gameScreenObject.x = (view.width - gameScreenObject.width) / 2
        gameScreenObject.y = (view.height - gameScreenObject.height + 50) / 2
        startNewScene()
    } else {
        console.log("error loading block component")
        console.log(gameScreenComponent.errorString())
        return null
    }
    return gameScreenObject
}

// 创建场景
function startNewScene() {

    // must clear here
    currentTragetIndex = 0 // 当前目标点位
    viewObject = null

    endEffectObject = new Object
    circleTargetObject = new Object

    // 创建终端控件
    var endObject = Object
    endObject.x = -1000
    endObject.y = -1000
    endObject.size = 60
    endObject.bColor = "#03A9F4"
    endEffectObject = EndEffect.createEndEffect(gameScreenObject, endObject)

    for (var i = 0; i < gameScreenObject.targetPoints.length; i++)
        targetPoints.push(gameScreenObject.targetPoints[i])
    //    标记出第一个目标点
    circleTargetObject = Circle.createTargetCircle(gameScreenObject,
                                                   targetPoints[0])
    circleTargetObject.visible = false
    // 场景创建成功，开始游戏
    screen.twentySecondsTimer.start()
    screen.fifteenSecondsTimer.start()
}

function handleTargetMatch(xPos, yPos) {
    if (targetPoints.length === 0)
        return
    if (gameScreenObject.state === "finished")
        return
    if (gameScreenObject.state === "onAnswer" && dynamicObject) {
         dynamicObject.x = endEffectObject.x  - (dynamicObject.width - endEffectObject.width) / 2
         dynamicObject.y = endEffectObject.y  - (dynamicObject.height - endEffectObject.height) / 2
     }
    if (Math.abs(targetPoints[0][0] - xPos) < 25 && Math.abs(
                targetPoints[0][1] - yPos) < 25) {
        console.debug("到达目标点 ", currentTragetIndex)
        circleTargetObject.frequency = 500
        screen.twentySecondsTimer.stop()
        screen.fifteenSecondsTimer.stop()
        if (gameScreenObject.state === "waitAnswer") {
            endEffectObject.state = "graspState"
        } else {
            endEffectObject.visible = true
            endEffectObject.state = "putState"
        }
        screen.twoSecondsTimer.start()
    } else {
        // 脱离目标点，停止
        if (endEffectObject.state !== "moveState") {
            screen.twoSecondsTimer.stop()
            screen.twentySecondsTimer.start()
            circleTargetObject.frequency = 500
            screen.fifteenSecondsTimer.start()
            if (endEffectObject.state === "graspState"){
                endEffectObject.value = 0
            }
            else if (endEffectObject.state === "putState") {
                endEffectObject.value = 100
                endEffectObject.visible = false
            }
            endEffectObject.state = "moveState"
        }
    }
}

function handleGrasp() {
    endEffectObject.value = 100
    endEffectObject.state = "moveState"
    gameScreenObject.state = "onAnswer"

    dynamicObject = createMoveNumber(gameScreenObject, [endEffectObject.x + endEffectObject.width / 2, endEffectObject.y + endEffectObject.height / 2], values[0])
    endEffectObject.visible = false
    // 加分
    screen.totalScore += 10
    nextTargetPoint()
}

function handlePut() {

    endEffectObject.value = 0
    endEffectObject.state = "moveState"

    // 挪到定时后进行
//    dynamicObject.x = targetPoints[0][0] - (dynamicObject.width / 2)
//    dynamicObject.y = targetPoints[0][1] - (dynamicObject.height / 2)
    dynamicObject.destroy()
    if(!viewObject) viewObject = createViewNumber(gameScreenObject, targetPoints[0], values[0])
    else viewObject.value = targetValue
    values.shift()
    gameScreenObject.state = "waitAnswer"
    // 加分
    screen.totalScore += 10
    nextTargetPoint()
}

function handleGraspTimeout() {
    handleGrasp()
    screen.totalScore -= 10
}

function handlePutTimeout() {
    handlePut()
    screen.totalScore -= 10
}

function nextTargetPoint() {
    // 移出首个点
    targetPoints.shift()
    // TODO 动画
    if (targetPoints.length !== 0) {
        currentTragetIndex++
        circleTargetObject.x = targetPoints[0][0] - (circleTargetObject.width / 2)
        circleTargetObject.y = targetPoints[0][1] - (circleTargetObject.height / 2)
        screen.fifteenSecondsTimer.start()
        screen.twentySecondsTimer.start()
//        circleTargetObject.visible = true
    } else {
        gameScreenObject.state = "finished"
        screen.updateData()
    }
}

function handlePress(xPos, yPos) {
    if (!endEffectObject) {
        console.info("target object is null")
        return
    }
    if (xPos < 0)
        xPos = 0
    if (xPos > gameScreenObject.width)
        xPos = gameScreenObject.width
    if (yPos < 0)
        yPos = 0
    if (yPos > gameScreenObject.height)
        yPos = gameScreenObject.height
    endEffectObject.x = xPos - endEffectObject.width / 2
    endEffectObject.y = yPos - endEffectObject.height / 2
}

function addOil() {
    circleTargetObject.frequency = 150
    circleTargetObject.visible = true
}


function createMoveNumber(view, point, number) {
     var numberObject = new Object
     var numberComponent = Qt.createComponent("../views/MoveNumber.qml");
     if (numberComponent.status === Quick.Component.Ready) {
         numberObject = numberComponent.createObject(view);
         if (!numberObject) {
             console.log("error creating moveNumber");
             console.log(numberComponent.errorString());
             return null;
         }
         numberObject.x = point[0] - numberObject.width / 2;
         numberObject.y = point[1] - numberObject.height / 2;
         numberObject.value = number
     } else {
         console.log("error loading moveNumber component");
         console.log(numberComponent.errorString());
         return null;
     }
     return numberObject;
}

function createViewNumber(view, point, number) {
     var numberObject = new Object
     var numberComponent = Qt.createComponent("../views/ViewNumber.qml");
     if (numberComponent.status === Quick.Component.Ready) {
         numberObject = numberComponent.createObject(view);
         if (!numberObject) {
             console.log("error creating moveNumber");
             console.log(numberComponent.errorString());
             return null;
         }
         numberObject.x = point[0] - numberObject.width / 2;
         numberObject.y = point[1] - numberObject.height / 2;
         numberObject.value = number
     } else {
         console.log("error loading moveNumber component");
         console.log(numberComponent.errorString());
         return null;
     }
     return numberObject;
}

function getDevPointlist() {
    var pointlist = []
    for (var i = 0; i < targetPoints.length; i++) {
        var x = xGame2Device(targetPoints[i][0], gameScreenObject.width)
        var y = yGame2Device(targetPoints[i][1], gameScreenObject.height)
        pointlist.push(x, y)
    }
    //console.debug("pointlist:", pointlist);
    return pointlist
}

function xGame2Device(x, width) {
    var w = width * 1.0
    var temp_x = ((x) - (w * 0.5)) / w * (-1)
    return temp_x
}

function yGame2Device(y, height) {
    var h = height * 1.0
    var temp_y = (y) / h - 0.1
    return temp_y
}

