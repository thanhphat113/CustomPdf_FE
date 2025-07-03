import { useDispatch } from "react-redux";
import Button from "../Button";
import { acceptAnnouncement } from "../../redux/Slices/AnnoucementSlice";
import CenterLayout from "../Layouts/CenterLayout";

function Announcement({ message, isSuccess }) {
    const dispatch = useDispatch();

    const accept = () => {
        dispatch(acceptAnnouncement());
    };

    return (
        <CenterLayout>
            <div className="w-full h-[3rem] flex justify-center items-center text-xl font-semibold text-white bg-[#1a235b]">
                Thông báo
            </div>

            <div className="min-h-[5rem] flex justify-center items-center">
                <div className="text-2xl p-3 text-center flex flex-col gap-5 items-center">
                    <i
                        className={`${
                            isSuccess
                                ? "fa-solid fa-circle-check text-[#079DD9]"
                                : "fa-solid fa-circle-exclamation text-[#ff0000]"
                        }  me-3 text-5xl`}
                    ></i>
                    <span className=" wrap-break-word">{message}</span>
                </div>
            </div>
            <div className="text-center my-3 ">
                <Button
                    action={accept}
                    className="px-3 bg-[#1a235b] text-white border-black rounded-2xl text-xl"
                    text="Xác nhận"
                />
            </div>
        </CenterLayout>
    );
}

export default Announcement;
