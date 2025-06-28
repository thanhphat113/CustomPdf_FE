import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pdfName: "demo",
    elements: [
        {
            id: 100,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 80,
            text: "Họ và tên",
            stt: false,
            trangThai: 0,
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
            id: 2,
            width: 180,
            height: 30,
            font: 12,
            type: "text",

            x: 400,
            y: 80,
            text: "Ngày sinh",
            stt: true,
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
            id: 3,
            width: 300,
            type: "text",
            height: 30,
            font: 12,
            x: 50,
            y: 130,
            stt: true,
            text: "Địa chỉ thường trú",
            trangThai: 0,
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
            id: 4,
            width: 100,
            height: 30,
            font: 12,
            type: "text",
            x: 400,
            stt: true,
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
            type: "text",
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
            type: "text",
            font: 12,
            x: 50,
            stt: false,
            y: 230,
            text: "Email",
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
            id: 7,
            width: 150,
            height: 30,
            type: "text",
            font: 12,
            x: 400,
            stt: true,
            y: 230,
            text: "Số điện thoại",
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
            id: 8,
            width: 400,
            height: 30,
            font: 12,
            type: "text",
            x: 50,
            stt: false,
            y: 280,
            text: "Trình độ học vấn",
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
            id: 9,
            width: 300,
            height: 30,
            type: "text",
            font: 12,
            x: 50,
            stt: true,
            y: 330,
            text: "Ngành học",
            trangThai: 0,
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
            id: 11,
            type: "table",
            font: 12,
            x: 400,
            y: 330,
            trangThai: 1,
            columns: ["Tên", "Tuổi", "Họ", "Con mèo"],
        },
        {
            id: 10,
            width: 200,
            type: "text",
            height: 30,
            font: 12,
            x: 400,
            stt: false,
            y: 330,
            text: "Năm tốt nghiệp",
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: true,
                list: [0.7, 1, 1],
            },
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
        toggleStt: (state, action) => {
            const element = state.elements.find(
                (el) => el.id === action.payload
            );
            if (element) {
                element.stt = !element.stt;
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
        setWidthBoxsItem: (state, action) => {
            const { id, width } = action.payload;
            const newList = width.split("-").map(Number);
            const element = state.elements.find((el) => el.id === id);
            if (element) {
                element.box.list = newList;
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

export const {
    toggleElement,
    moveElement,
    toggleStt,
    toggleDot,
    setWidthBoxsItem,
    toggleBox,
    setWidthDotItem,
} = dataSlice.actions;
export default dataSlice.reducer;
