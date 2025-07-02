import { arrayMove } from "@dnd-kit/sortable";
import { createSlice } from "@reduxjs/toolkit";
import { getAllPdfs } from "../Actions/DataAction";

const initialState = {
    pdfName: "demo",
    elements: [
        {
            id: 1,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 80,
            text: "Họ tên",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 2,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 120,
            text: "Ngày sinh",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 3,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 160,
            text: "Giới tính",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 4,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 200,
            text: "Địa chỉ",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 5,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 240,
            text: "Huyết áp",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 6,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 280,
            text: "Cân nặng",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 7,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 320,
            text: "Lý do vào viện",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 8,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 360,
            text: "Số thứ tự",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 9,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 400,
            text: "Nhiệt độ",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 10,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 440,
            text: "Mã thẻ BHYT",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 11,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 480,
            text: "Điện thoại",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 12,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 520,
            text: "Mạch",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 13,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 560,
            text: "Chẩn đoán",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 14,
            type: "text",
            width: 200,
            height: 30,
            font: 12,
            x: 50,
            y: 600,
            text: "Triệu chứng",
            stt: false,
            trangThai: 1,
            dot: {
                visible: false,
                width: 0,
            },
            box: {
                visible: false,
                list: [],
            },
        },
        {
            id: 15,
            type: "table",
            font: 12,
            x: 0,
            y: 500,
            trangThai: 1,
            columns: [
                {
                    colId: 1,
                    tenCot: "Thông tin cá nhân",
                    columns: [
                        { colId: 11, tenCot: "Họ", parent: 1 },
                        { colId: 12, tenCot: "Tên", parent: 1 },
                        { colId: 13, tenCot: "Tuổi", parent: 1 },
                    ],
                },
                {
                    colId: 2,
                    tenCot: "Liên hệ",
                    columns: [],
                },
                {
                    colId: 3,
                    tenCot: "Thú cưng",
                    columns: [
                        {
                            colId: 31,
                            tenCot: "Con mèo",
                            parent: 3,
                        },
                        {
                            colId: 32,
                            tenCot: "Con chó",
                            parent: 3,
                        },
                    ],
                },
            ],
        },
    ],
};

const dataSlice = createSlice({
    name: "data",
    initialState: {
        pdf: null,
        elements: [],
    },
    reducers: {
        toggleElement: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.trangThai = !element.trangThai;
            }
        },
        toggleDot: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.dot.visible = !element.dot.visible;
                if (!element.dot.visible) element.dot.width = 0;
            }
        },
        toggleBox: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.box.visible = !element.box.visible;
                if (!element.box.visible) element.box.list = [];
            }
        },
        moveCol: (state, action) => {
            const { id, active, over } = action.payload;

            const element = state.elements.find((el) => el.id === id);
            if (!element || !over) return;

            const oldIndex = element.columns.findIndex(
                (col) => col.colId === active.id
            );
            const newIndex = element.columns.findIndex(
                (col) => col.colId === over.id
            );

            if (oldIndex === -1 || newIndex === -1) return;

            element.columns = arrayMove(element.columns, oldIndex, newIndex);
        },
        toggleStt: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
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
                item.idThuocTinh === id ? { ...item, x: snapS, y: snapT } : item
            );
        },
        moveTable: (state, action) => {
            const { id, snapT } = action.payload;
            state.elements = state.elements.map((item) =>
                item.idThuocTinh === id ? { ...item, y: snapT } : item
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPdfs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPdfs.fulfilled, (state, action) => {
                const { data } = action.payload
                state.pdf = data.pdf
                state.elements = data.elements
            })
            .addCase(getAllPdfs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
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
    moveCol,
    moveTable,
} = dataSlice.actions;
export default dataSlice.reducer;
