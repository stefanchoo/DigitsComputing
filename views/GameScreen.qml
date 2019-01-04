import QtQuick 2.8
import QtQuick.Controls 2.2
import Material 0.2
import Material.ListItems 0.1 as ListItem

Rectangle {
    id: root
    property var gameData: Object
    property var targetPoints: gameData.target_point_list

    property string state: "waitAnswer" // "onAnswer" "finished"

    property var operationList: ["÷", "×", "—", "+"]

    width: 1200
    height: 800
    color: "#666666"

    View {
        id: shapeUpView
        width: 750
        height: 180
        radius: 90
        anchors {
            top: parent.top
            topMargin: 20
            horizontalCenter: parent.horizontalCenter
        }
        backgroundColor: "#444444"

        Flow {
            width: 690
            height: 120
            anchors.left: parent.left
            anchors.leftMargin: 55
            anchors.verticalCenter: parent.verticalCenter
            spacing: 10
            Repeater {
                model: 5
                delegate: Item {
                    id: wrapper
                    width: 120
                    height: width
                    Icon {
                        name: "shape/dashedcircle"
                        size: 120
                        color: "white"
                        visible: gameData.target_index === index
                    }
                    ChooseResult {
                        anchors.bottom: wrapper.bottom
                        anchors.bottomMargin: -8
                        anchors.right: wrapper.right
                        anchors.rightMargin: -8
                        visible: gameData.target_index === index
                                 && root.state === "finished"
                    }
                    Label {
                        anchors.centerIn: parent
                        text: gameData.data_list[index]
                        color: "white"
                        style: "display3"
                        visible: gameData.target_index !== index
                    }
                }
            }
        }
    }

    View {
        id: selectView
        width: 570
        height: 570
        anchors {
            top: shapeUpView.bottom
            topMargin: 30
            horizontalCenter: parent.horizontalCenter
        }

        Flow {
            id: operationFlow
            anchors.right: parent.right
            width: 120
            height: 420
            spacing: 30

            Repeater {
                model: 4
                delegate: Rectangle {
                    width: 120
                    height: width
                    radius: 0.5 * width
                    color: "#FFA726"

                    Label {
                        anchors.centerIn: parent
                        text: operationList[index]
                        color: "white"
                        style: "display3"
                    }
                }
            }
        }

        Flow {
            id: numberFlow
            anchors.left: parent.left
            width: 420
            height: 420
            spacing: 30

            Repeater {
                model: 9
                delegate: Rectangle {
                    width: 120
                    height: width
                    radius: 0.5 * width
                    color: "#555555"

                    Label {
                        anchors.centerIn: parent
                        text: Math.floor(
                                  index / 3) > 1 ? (index - 5) : Math.floor(
                                                       index / 3) > 0 ? (index + 1) : (index + 7)
                        color: "white"
                        style: "display3"
                    }
                }
            }
        }
        Rectangle {
            anchors.top: numberFlow.bottom
            anchors.topMargin: 30
            anchors.left: parent.left
            anchors.leftMargin: 150
            width: 120
            height: width
            radius: 0.5 * width
            color: "#555555"

            Label {
                anchors.centerIn: parent
                text: "0"
                color: "white"
                style: "display3"
            }
        }
    }
}
