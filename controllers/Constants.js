// data_list: 数据组（1 + 4 = 5）
// size: 随机数范围
// target_index: 第几个为目标点，计算非生成
var operations = ["+", "—", "×", "÷"]

function randomGameData(gameData) {

    if(gameData.target_index === -1) {
        while(gameData.target_index === -1 || gameData.target_index === 3)
            gameData.target_index = Math.round(Math.random() * 4)
    }
    console.info(gameData.target_index)
    var data_list = []

    if (gameData.data_list[1] === -1) {
        data_list[1] = operations[Math.round(Math.random() * (gameData.level > 9 ? 3 : 1) )]
    } else {
        data_list[1] = gameData.data_list[1]
    }
    switch (data_list[1]) {
    case "+":
        if (gameData.data_list[4] === -1) {
            data_list[0] = Math.round(Math.random() * 8) + 1
        }
        if (gameData.data_list[2] === -1) {
            data_list[2] = Math.round(Math.random() * 8) + 1
        }
        data_list[4] = data_list[0] + data_list[2]
        break
    case "—":
        if (gameData.data_list[4] === -1) {
            data_list[4] = Math.round(Math.random() * 8) + 1
        }
        if (gameData.data_list[2] === -1) {
            data_list[2] = Math.round(Math.random() * 8) + 1
        }

        data_list[0] = data_list[2] + data_list[4]
        break
    case "×":
        if (gameData.data_list[0] === -1) {
            data_list[0] = Math.round(Math.random() * 8) + 1
        }

        if (gameData.data_list[2] === -1) {
            data_list[2] = Math.round(Math.random() * 7) + 2
        }
        data_list[4] = data_list[0] * data_list[2]
        break
    case "÷":
        if (gameData.data_list[4] === -1) {
            data_list[4] = Math.round(Math.random() * 8) + 1
        }
        if (gameData.data_list[2] === -1) {
            data_list[2] = Math.round(Math.random() * 7) + 2
        }
        data_list[0] = data_list[2] * data_list[4]
        break
    }
    if (gameData.target_index === 1 && data_list.indexOf(2) !== -1 && data_list.indexOf(4) !== -1 && data_list.indexOf(6) === -1) {
        data_list[0] = 1
        data_list[1] = "+"
        data_list[2] = 1
        data_list[4] = 2
    }
    data_list.forEach(function (item, index) {
        gameData.data_list[index] = item
    })
    gameData.target_point_list = caculateTargetPoints(
                gameData.target_index,
                gameData.data_list[gameData.target_index])
    return gameData
}

// targetIndex 需要填充的位置
// value 该位置上的值

// select      起点 （375， 290）
// operation   起点 （340, 110）
function caculateTargetPoints(targetIndex, value) {
    var target_points = []
    // 符号位 或者 个位数, 只需拖拽一次
    if (targetIndex === 1 || value < 10) {
        target_points.push(selectPosition(value))
        target_points.push(operationsPosition(targetIndex))
    } else {
        // 两位数，需要进行两次拖拽
        var n0 = value % 10
        var n1 = Math.floor(value / 10)
        target_points.push(selectPosition(n1))
        target_points.push(operationsPosition(targetIndex))
        target_points.push(selectPosition(n0))
        target_points.push(operationsPosition(targetIndex))
    }
    return target_points
}

function selectPosition(value) {
    var index
    switch (value) {
    case 0:
        index = 13
        break
    case 1:

    case 2:

    case 3:
        index = value + 7
        break
    case 4:

    case 5:

    case 6:
        index = value
        break
    case 7:

    case 8:

    case 9:
        index = value - 7
        break
    case "÷":
        index = 3
        break
    case "×":
        index = 7
        break
    case "—":
        index = 11
        break
    case "+":
        index = 15
        break
    }
    var x = 375 + (index % 4) * 150
    var y = 290 + Math.floor(index / 4) * 150
    return [x, y]
}

function operationsPosition(index) {
    var x = 340 + (index % 5) * 130
    var y = 110 + Math.floor(index / 5) * 130
    return [x, y]
}
