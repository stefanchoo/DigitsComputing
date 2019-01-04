import QtQuick 2.8
import QtQuick.Controls 2.2
import Material 0.2
import Material.ListItems 0.1 as ListItem

Item {
    id: root
    width: 1200
    height: 800
    z: 200

    focus: screen.state !== "running"

    Keys.onReturnPressed: startBtn.click()

    property alias startButton: startBtn
    property alias finishButton: finishBtn

    property var dataList: [3, "+", 4, "=", 7]
    property var operationList: ["÷", "×", "—", "+"]

    Rectangle {
        anchors.centerIn: parent
        width: 1000
        height: 800
        color: "#444444"
        radius: 400
        opacity: 1
    }

    Label {
        anchors {
            top: parent.top
            topMargin: 50
            horizontalCenter: parent.horizontalCenter
        }
        text: "数字运算"
        color: "white"
        style: "display1"
    }

    Label {
        id: operationInfo
        anchors {
            top: parent.top
            topMargin: 130
            horizontalCenter: parent.horizontalCenter
        }
        text: "1. 观察算式" // 2. 选择对应数量的数字 // 3. 放置到虚线圆圈中 // 4.完成
        color: "white"
        style: "headline"
    }

    EndEffect {
        id: end
        size: 50
        bColor: "#03A9F4"
        x: 600
        y: 245
        state: x === 295 ? "graspState" : x === 520 ? "putState" : "moveState"
    }

    Icon {
        id: target
        size: 36
        name: "number/c7"
        color: "white"
        x: 300
        y: 345
        z: 100
        visible: false
    }

    View {
        id: shapeUpView
        width: 350
        height: 80
        radius: 50
        anchors {
            top: parent.top
            topMargin: 230
            left: parent.left
            leftMargin: 250
        }
        backgroundColor: "#555555"

        Icon {
            name: "shape/dashedcircle"
            size: 60
            color: "white"
            anchors.top: parent.top
            anchors.topMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 25
        }

        ChooseResult {
            id: chooseResult
            size: 24
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 20
            visible: false
        }

        Flow {
            width: 290
            anchors.centerIn: parent
            spacing: 10
            Repeater {
                model: 5
                delegate: Item {
                    width: 50
                    height: 50
                    Label {
                        anchors.centerIn: parent
                        text: dataList[index]
                        color: "white"
                        style: "display1"
                        visible: index !== 4 || chooseResult.visible
                    }
                }
            }
        }
    }

    View {
        id: selectView
        width: 350
        height: 300
        anchors {
            top: shapeUpView.bottom
            topMargin: 30
            horizontalCenter: shapeUpView.horizontalCenter
        }
        Flow {
            id: operationFlow
            anchors.right: parent.right
            anchors.rightMargin: 40
            width: 60
            height: 200
            spacing: 10

            Repeater {
                model: 4
                delegate: Rectangle {
                    width: 60
                    height: width
                    radius: 0.5 * width
                    color: "#FFA726"

                    Label {
                        anchors.centerIn: parent
                        text: operationList[index]
                        color: "white"
                        style: "display1"
                    }
                }
            }
        }
        Flow {
            id: numberFlow
            anchors.left: parent.left
            anchors.leftMargin: 40
            width: 200
            height: 200
            spacing: 10

            Repeater {
                model: 9
                delegate: Rectangle {
                    width: 60
                    height: width
                    radius: 0.5 * width
                    color: "#555555"

                    Label {
                        anchors.centerIn: parent
                        text: Math.floor(
                                  index / 3) > 1 ? (index - 5) : Math.floor(
                                                       index / 3) > 0 ? (index + 1) : (index + 7)
                        color: "white"
                        style: "headline"
                    }
                }
            }
        }
        Rectangle {
            anchors {
                top: numberFlow.bottom
                topMargin: 10
                horizontalCenter: numberFlow.horizontalCenter
            }
            width: 60
            height: width
            radius: 0.5 * width
            color: "#555555"

            Label {
                anchors.centerIn: parent
                text: "0"
                color: "white"
                style: "headline"
            }
        }
    }

    SequentialAnimation {
        running: true
        loops: Animation.Infinite

        NumberAnimation {
            // 暂停作用
            duration: 1000
        }
        PropertyAnimation {
            target: operationInfo
            property: "text"
            to: "2. 选择正确的答案"
        }
        ParallelAnimation {
            NumberAnimation {
                target: end
                property: "x"
                duration: 1000
                to: 295
                easing.type: Easing.InOutQuad
            }
            NumberAnimation {
                target: end
                property: "y"
                duration: 1000
                to: 345
                easing.type: Easing.InOutQuad
            }
        }
        NumberAnimation {
            // 暂停作用
            duration: 2000
        }
        PropertyAnimation {
            target: end
            property: "visible"
            to: "false"
        }
        PropertyAnimation {
            target: target
            property: "visible"
            to: "true"
        }
        PropertyAnimation {
            target: operationInfo
            property: "text"
            to: "3. 放置到虚线圆圈中"
        }
        ParallelAnimation {
            NumberAnimation {
                target: end
                property: "x"
                duration: 1000
                to: 520
                easing.type: Easing.InOutQuad
            }
            NumberAnimation {
                target: end
                property: "y"
                duration: 1000
                to: 245
                easing.type: Easing.InOutQuad
            }
            NumberAnimation {
                target: target
                property: "x"
                duration: 1000
                to: 527
                easing.type: Easing.InOutQuad
            }
            NumberAnimation {
                target: target
                property: "y"
                duration: 1000
                to: 250
                easing.type: Easing.InOutQuad
            }
        }
        PropertyAnimation {
            target: end
            property: "visible"
            to: "true"
        }
        NumberAnimation {
            // 暂停作用
            duration: 2000
        }
        ParallelAnimation {
            PropertyAnimation {
                target: chooseResult
                property: "visible"
                to: "true"
            }
            PropertyAnimation {
                target: end
                property: "visible"
                to: "false"
            }
            PropertyAnimation {
                target: target
                property: "visible"
                to: "false"
            }
            PropertyAnimation {
                target: operationInfo
                property: "text"
                to: "4. 完成"
            }
        }
        NumberAnimation {
            // 暂停作用
            duration: 2000
        }
        ParallelAnimation {
            PropertyAnimation {
                target: operationInfo
                property: "text"
                to: "1. 观察算式"
            }
            PropertyAnimation {
                target: chooseResult
                property: "visible"
                to: "false"
            }
            NumberAnimation {
                target: target
                property: "x"
                to: 300
            }
            NumberAnimation {
                target: target
                property: "y"
                to: 345
            }
            NumberAnimation {
                target: end
                property: "x"
                to: 600
            }
            NumberAnimation {
                target: end
                property: "y"
                to: 245
            }
        }
        PropertyAnimation {
            target: end
            property: "visible"
            to: "true"
        }
    }

    Item {
        width: parent.width * 0.4
        height: parent.height
        anchors.right: parent.right
        anchors.rightMargin: parent.width * 0.15
        GameButton {
            id: startBtn
            text: "开始游戏"
            anchors {
                top: parent.top
                topMargin: 260
                horizontalCenter: parent.horizontalCenter
            }
            onClick: {
                if (screen.state == "pause")
                    screen.continued()
                else
                    screen.started()
            }
        }

        GameButton {
            id: finishBtn
            text: "结束游戏"
            enabled: screen.state === "pause"
            anchors {
                bottom: parent.bottom
                bottomMargin: 260
                horizontalCenter: parent.horizontalCenter
            }
            onClick: screen.finished()
        }
    }
}
