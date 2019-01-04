import QtQuick 2.8
import Material 0.2
import Material.ListItems 0.1 as ListItem

Item {
    width: 120
    height: 120
    property alias value: label.text
    Label {
        id: label
        anchors.centerIn: parent
        text: "0"
        color: "white"
        font.pixelSize: 72
    }
}
