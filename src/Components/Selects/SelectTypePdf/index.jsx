import { useEffect, useState } from "react";
import Select from "react-select";
import axiosInstance from "../../../AxiosInstance";
import { useDispatch } from "react-redux";
import { getAllPdfs } from "../../../redux/Actions/DataAction";

const options = [
    { value: 1, label: "Option A" },
    { value: 2, label: "Option B" },
];

function SelectTypePdf() {
    const [options, setOptions] = useState([])
    const dispatch = useDispatch()

    const handleChangeOption = async (id) => {
        await dispatch(getAllPdfs(id))
    }

    useEffect(() => {
        const getOptions = async () => {
            try {
                const response = await axiosInstance.get("/api/Pdf")
                const {success, data, message} = response.data
                console.log(data)
                if (success)   setOptions(data)
                console.log(message)
            } catch (error) {
                console.log(error)
            }
        }

        getOptions()
    },[])

    return <Select className=" w-[90%]" onChange={(e) => handleChangeOption(e.value)} options={options.map(item => ({value : item.idMau, label : item.tenMau}))}/>
}

export default SelectTypePdf;
