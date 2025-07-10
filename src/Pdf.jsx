import { useEffect, useState } from "react";
import axiosInstance from "./AxiosInstance";

function Pdf() {
    const [pdfUrl, setPdfUrl] = useState(null);
    useEffect(() => {
        const get = async () => {
            try {
                const response = await axiosInstance.get("/api/Export/export", {
                    responseType: "blob",
                });
				const file = new Blob([response.data], { type: "application/pdf" });
                const fileURL = URL.createObjectURL(file);
				setPdfUrl( fileURL)
            } catch (error) {
				console.log(error)
			}
        };
		get()
    }, []);

    return (
        <div>
            {pdfUrl && (
                <iframe
                    src={pdfUrl}
                    width="100%"
                    height="800px"
                    title="PDF Viewer"
                />
            )}
        </div>
    );
}

export default Pdf;
