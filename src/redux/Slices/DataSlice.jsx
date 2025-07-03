import { arrayMove } from "@dnd-kit/sortable";
import { createSlice } from "@reduxjs/toolkit";
import { getAllPdfs, saveAllPdfs } from "../Actions/DataAction";

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
            console.log(element)
            if (element) {
                element.rong = width;
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
    changeWidth,
    setWidthDotItem,
    moveCol,
    moveTable,
} = dataSlice.actions;
export default dataSlice.reducer;
