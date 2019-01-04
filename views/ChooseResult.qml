import QtQuick 2.8
import Material 0.2
import Material.ListItems 0.1 as ListItem

Item {
    width: size
    height: size
    property alias size: icon.size

    Rectangle {
        anchors.centerIn: parent
        width: icon.size - 10
        height: icon.size - 10
        radius: height/2
    }
    Icon {
        id: icon
        anchors.right: parent.right
        anchors.bottom: parent.bottom
        name: "info/right"
        color: "#2196F3"
        size: 48
    }
}
