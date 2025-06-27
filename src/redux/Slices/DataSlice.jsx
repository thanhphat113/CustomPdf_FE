import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pdfName: "demo",
    elements: [
        {
            id: 100,
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 80,
            text: "Họ và tên",
            trangThai: 0,
            dot: {
                visible: true,
                width: 0,
            },
            box: {
                visible: true,
                list:[]
            }
        },
        {
            id: 2,
            width: 180,
            height: 30,
            font: 12,
            x: 400,
            y: 80,
            text: "Ngày sinh",
            trangThai: 1,
            dot: {
                visible: true,
                width: 0,
            },
            box: {
                visible: true,
                list:[]
            }
        },
        {
            id: 3,
            width: 300,
            height: 30,
            font: 12,
            x: 50,
            y: 130,
            text: "Địa chỉ thường trú",
            trangThai: 0,
            dot: {
                visible: true,
                width: 0,
            },
            box: {
                visible: true,
                list:[]
            }
        },
        {
            id: 4,
            width: 100,
            height: 30,
            font: 12,
            x: 400,
            y: 130,
            text: "Giới tính",
            trangThai: 1,
            dot: {
                visible: true,
                width: 0,
            },
            box: {
                visible: true,
                list: [],
            },
        },
        {
            id: 5,
            width: 250,
            height: 30,
            font: 12,
            x: 50,
            y: 180,
            text: "Số CMND/CCCD",
            trangThai: 1,
            dot: {
                visible: true,
                width: 0,
            },
            box: {
                visible: true,
                list: [],
            },
        },
        {
            id: 6,
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 230,
            text: "Email",
            trangThai: 1,
            dot: {
                visible: true,
                width: 0,
            },
            box: {
                visible: true,
                list:[]
            }
        },
        {
            id: 7,
            width: 150,
            height: 30,
            font: 12,
            x: 400,
            y: 230,
            text: "Số điện thoại",
            trangThai: 1,
            dot: {
                visible: true,
                width: 0,
            },
            box: {
                visible: true,
                list:[]
            }
        },
        {
            id: 8,
            width: 400,
            height: 30,
            font: 12,
            x: 50,
            y: 280,
            text: "Trình độ học vấn",
            trangThai: 1,
            dot: {
                visible: true,
                width: 0,
            },
            box: {
                visible: true,
                list:[]
            }
        },
        {
            id: 9,
            width: 300,
            height: 30,
            font: 12,
            x: 50,
            y: 330,
            text: "Ngành học",
            trangThai: 0,
            dot: {
                visible: true,
                width: 0,
            },
            box: {
                visible: true,
                list:[]
            }
        },
        {
            id: 10,
            width: 200,
            height: 30,
            font: 12,
            x: 400,
            y: 330,
            text: "Năm tốt nghiệp",
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: true,
                list:[0.7,1,1]
            }
        },
    ],
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        toggleElement: (state, action) => {
            console.log(action.payload);
            const element = state.elements.find(
                (el) => el.id === action.payload
            );
            if (element) {
                element.trangThai = element.trangThai === 0 ? 1 : 0;
            }
        },
        toggleDot: (state, action) => {
            const element = state.elements.find(
                (el) => el.id === action.payload
            );
            if (element) {
                element.dot.visible = !element.dot.visible;
                if (!element.dot.visible) element.dot.width = 0;
            }
        },
        toggleBox: (state, action) => {
            const element = state.elements.find(
                (el) => el.id === action.payload
            );
            if (element) {
                element.box.visible = !element.box.visible;
                if (!element.box.visible) element.box.list = [];
            }
        },
        setWidthDotItem: (state, action) => {
            console.log(action.payload);
            const { id, width } = action.payload;
            const element = state.elements.find((el) => el.id === id);
            if (element) {
                element.dot.width = width;
            }
        },
        moveElement: (state, action) => {
            const { flatElements, id, snapS, snapT } = action.payload;
            state.elements = flatElements.map((item) =>
                item.id === id ? { ...item, x: snapS, y: snapT } : item
            );
        },
    },
});

export const { toggleElement, moveElement, toggleDot, toggleBox, setWidthDotItem } =
    dataSlice.actions;
export default dataSlice.reducer;
