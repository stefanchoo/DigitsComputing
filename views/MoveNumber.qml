import QtQuick 2.8
import Material 0.2
import Material.ListItems 0.1 as ListItem

Item {
    width: 100
    height: 100
    property var value
    property alias name: icon.name

    onValueChanged: {
        switch (value) {
        case "+":
            name = "number/plus"
            break
        case "—":
            name = "number/minus"
            break
        case "×":
            name = "number/multiplication"
            break
        case "÷":
            name = "number/division"
            break
        default:
            name = "number/c" + value
            break
        }
    }

    Icon {
        id: icon
        anchors.centerIn: parent
        name: "number/c0"
        size: 80
        color: "white"
    }
}
