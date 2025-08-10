import { arrayMove } from "@dnd-kit/sortable";
import { createSlice } from "@reduxjs/toolkit";
import {
    getAllElementsOfPdf,
    saveAllElements,
    savePdfSize,
} from "../Actions/DataAction";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        pdf: null,
        currentPdfValue: null,
        elements: [],
        currentElementsValue: [],
        tables: [],
        currentTables: [],
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

            const element = state.tables.find((el) => el.idThuocTinh === id);
            if (!element || !over) return;

            const oldIndex = element.cots.findIndex(
                (col) => col.idCot === active.id
            );
            const newIndex = element.cots.findIndex(
                (col) => col.idCot === over.id
            );

            if (oldIndex === -1 || newIndex === -1) return;

            const t = oldIndex + 1
            element.cots[oldIndex].thuTu = newIndex+1
            element.cots[newIndex].thuTu = t

            element.cots = arrayMove(element.cots, oldIndex, newIndex);
        },
        movePositionCol: (state, action) => {
            const { id, idCot, position, child } = action.payload;

            const table = state.tables.find((el) => el.idThuocTinh === id);
            const col = table.cots.find((el) => el.idCot === idCot);

            if (child) {
                const list = JSON.parse(JSON.stringify(col.chilCol));

                const result = list.map((el) => {
                    const match = child.find((c) => c.id == el.idCot);
                    return match
                        ? { ...el, x: match.x, y: match.y, rong: match.rong, cao: match.cao }
                        : el;
                });

                col.chilCol = result
            }

            col.x = position.x;
            col.y = position.y;
            col.rong = position.rong;
            col.cao = position.cao;
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
            console.log(action.payload);
            const { id, snapT } = action.payload;
            state.tables = state.tables.map((item) =>
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
            if (state.pdf) state.pdf.rong = action.payload;
        },
        setHeightPdf: (state, action) => {
            if (state.pdf) state.pdf.dai = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllElementsOfPdf.fulfilled, (state, action) => {
                const { pdf, elements, tables } = action.payload.data;
                state.pdf = pdf;
                state.elements = elements;
                state.currentPdfValue = pdf;
                state.currentElementsValue = elements;
                state.tables = tables;
                state.currentTables = tables;
            })
            .addCase(saveAllElements.fulfilled, (state, action) => {
                state.currentElementsValue = state.elements;
            })
            .addCase(savePdfSize.fulfilled, (state, action) => {
                state.currentPdfValue = state.pdf;
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
    movePositionCol,
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
    setHeightPdf,
} = dataSlice.actions;
export default dataSlice.reducer;
