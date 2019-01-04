.import "GameScreen.js" as GameScreen
.import "Constants.js" as Constants

var gameCanvas
var endEffectObject

function start() {
    console.debug("游戏开始")
    gameCanvas = GameScreen.createGameScreen(screen, createGameData(screen.level))
}

function levelUp() {
    console.info("level up ...")
    screen.level++
    GameScreen.endEffectObject.destroy()
    GameScreen.gameScreenObject.destroy()
    gameCanvas = new Object
    gameCanvas = GameScreen.createGameScreen(screen, createGameData(screen.level))
}

function updateData() {
    console.info("update data ...")
    screen.updateTimes++
    GameScreen.endEffectObject.destroy()
    GameScreen.gameScreenObject.destroy()
    gameCanvas = new Object
    gameCanvas = GameScreen.createGameScreen(screen, createGameData(screen.level))
}

function updateScene() {
    console.info("update scene ...")
    GameScreen.endEffectObject.destroy()
    GameScreen.gameScreenObject.destroy()
    gameCanvas = new Object
    gameCanvas = GameScreen.createGameScreen(screen, createGameData(screen.level))
}

function handlePress(xPos, yPos) {
    GameScreen.handlePress(xPos, yPos)
}

function handleTargetMatch(xPos, yPos) {
    GameScreen.handleTargetMatch(xPos, yPos)
}

function handleMatchTimeout() {
    switch(GameScreen.gameScreenObject.state) {
          case "waitAnswer":
              GameScreen.handleGrasp()
              break
          case "onAnswer":
              GameScreen.handlePut()
              break
       }
     GameScreen.circleTargetObject.frequency = 500
     screen.twentySecondsTimer.start()
     screen.fifteenSecondsTimer.start()
}

function handleTouchTimeout() {
    switch(GameScreen.gameScreenObject.state) {
          case "waitAnswer":
              GameScreen.handleGraspTimeout()
              break
          case "onAnswer":
              GameScreen.handlePutTimeout()
              break
       }
    GameScreen.circleTargetObject.frequency = 500
    screen.twentySecondsTimer.start()
    screen.fifteenSecondsTimer.start()
}

// 15s 计时到，显示加油标志
function addOil() {
    GameScreen.addOil()
}

// 控制游戏输出的数量
function createGameData(level) {
    var gameData = Object
    switch(level) {
    case 1:
        gameData.target_index = 4
        gameData.data_list = [-1, "+", -1, "=", -1]
        break
    case 2:
        gameData.target_index = 0
        gameData.data_list = [-1, "+", -1, "=", -1]
        break
    case 3:
        gameData.target_index = 4
        gameData.data_list = [-1, "—", -1, "=", -1]
        break
    case 4:
        gameData.target_index = 0
        gameData.data_list = [-1, "—", -1, "=", -1]
        break
    case 5:
        gameData.target_index = -1
        gameData.data_list = [-1, -1, -1, "=", -1]
        break
    case 6:
        gameData.target_index = 4
        gameData.data_list = [-1, "×", -1, "=", -1]
        break
    case 7:
        gameData.target_index = 0
        gameData.data_list = [-1, "×", -1, "=", -1]
        break
    case 8:
        gameData.target_index = 4
        gameData.data_list = [-1, "÷", -1, "=", -1]
        break
    case 9:
        gameData.target_index = 0
        gameData.data_list = [-1, "÷", -1, "=", -1]
        break
    default:
        gameData.target_index = -1
        gameData.data_list = [-1, -1, -1, "=", -1]
        break
    }
    return Constants.randomGameData(gameData)
}


