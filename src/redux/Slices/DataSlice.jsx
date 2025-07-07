import { arrayMove } from "@dnd-kit/sortable";
import { createSlice } from "@reduxjs/toolkit";
import { getAllElementsOfPdf, saveAllElements, savePdfSize } from "../Actions/DataAction";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        pdf: null,
        currentPdfValue: null,
        elements: [],
        currentElementsValue: []
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

            const element = state.elements.find((el) => el.idThuocTinh === id);
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
        toggleBold: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.inDam = !element.inDam;
            }
        },
        toggleItalic: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.nghieng = !element.nghieng;
            }
        },
        toggleUnderline: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.gachChan = !element.gachChan;
            }
        },
        toggleUpperCase: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.upperCase = !element.upperCase;
            }
        },
        toggleBoldGiaTri: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.inDamGiaTri = !element.inDamGiaTri;
            }
        },
        toggleItalicGiaTri: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.inNghiengGiaTri = !element.inNghiengGiaTri;
            }
        },
        toggleUnderlineGiaTri: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.gachChanGiaTri = !element.gachChanGiaTri;
            }
        },
        toggleUpperCaseGiaTri: (state, action) => {
            const element = state.elements.find(
                (el) => el.idThuocTinh === action.payload
            );
            if (element) {
                element.upperCaseGiaTri = !element.upperCaseGiaTri;
            }
        },
        setWidthDotItem: (state, action) => {
            const { id, width } = action.payload;
            const element = state.elements.find((el) => el.idThuocTinh === id);
            if (element) {
                element.dot.width = width;
            }
        },
        changeWidth: (state, action) => {
            const { id, width } = action.payload;
            const element = state.elements.find((el) => el.idThuocTinh === id);
            if (element) {
                element.rong = width;
            }
        },
        changeColor: (state, action) => {
            const { id, color } = action.payload;
            const element = state.elements.find((el) => el.idThuocTinh === id);
            if (element) {
                element.mau = color;
            }
        },
        changeColorGiaTri: (state, action) => {
            const { id, color } = action.payload;
            const element = state.elements.find((el) => el.idThuocTinh === id);
            if (element) {
                element.mauGiaTri = color;
            }
        },
        setWidthBoxsItem: (state, action) => {
            const { id, width } = action.payload;
            const newList = width.split("-").map(Number);
            const element = state.elements.find((el) => el.idThuocTinh === id);
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

        changeFontSize: (state, action) => {
            const { id, fontSize } = action.payload;
            const element = state.elements.find((el) => el.idThuocTinh === id);
            if (element) {
                element.fontSize = fontSize;
            }
        },
        changeFontSizeGiaTri: (state, action) => {
            const { id, fontSize } = action.payload;
            const element = state.elements.find((el) => el.idThuocTinh === id);
            if (element) {
                element.fontSizeGiaTri = fontSize;
            }
        },
        setWidthPdf: (state, action) => {
            if (state.pdf) state.pdf.rong = action.payload
        },
        setHeightPdf: (state, action) => {
            if (state.pdf) state.pdf.dai = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllElementsOfPdf.fulfilled, (state, action) => {
                const { data } = action.payload
                state.pdf = data.pdf
                state.elements = data.elements
                state.currentPdfValue = data.pdf
                state.currentElementsValue = data.elements
            })
            .addCase(saveAllElements.fulfilled, (state, action) => {
                state.currentElementsValue = state.elements
            })
            .addCase(savePdfSize.fulfilled, (state, action) => {
                state.currentPdfValue = state.pdf
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
    changeWidth,
    setWidthDotItem,
    moveCol,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleUpperCase,
    changeColor,
    toggleBoldGiaTri,
    toggleItalicGiaTri,
    toggleUnderlineGiaTri,
    toggleUpperCaseGiaTri,
    changeColorGiaTri,
    changeFontSize,
    changeFontSizeGiaTri,
    moveTable,
    setWidthPdf,
    setHeightPdf
} = dataSlice.actions;
export default dataSlice.reducer;
