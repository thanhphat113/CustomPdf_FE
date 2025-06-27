import Select from "react-select";

const options = [
    { value: 1, label: "Option A" },
    { value: 2, label: "Option B" },
];

function SelectTypePdf() {
    return <Select className=" w-[90%]" options={options}/>
}

export default SelectTypePdf;
