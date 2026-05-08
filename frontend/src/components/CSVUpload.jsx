import Papa from "papaparse";
import { useState } from "react";

import api from "../services/api";

function CSVUpload({
  appId,
  onUploadSuccess,
  fields
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e) => {

    const file = e.target.files[0];

    if (!file) {
      return alert("no file selected");
    }
    
    setUploading(true);

    Papa.parse(file, {

      header: true,

      skipEmptyLines: true,

      complete: async (results) => {

        try {

          const rows = results.data;

          if(rows.length === 0) {
            setUploading(false);

            return alert(
              "csv file is empty"
            );
          }

           const csvHeaders =
            Object.keys(rows[0]);

          const requiredFields =
            fields.map(
              (field) => field.name
            );

          const missingFields =
            requiredFields.filter(
              (field) =>
                !csvHeaders.includes(field)
            );

          if (missingFields.length > 0) {

            setUploading(false);

            return alert(
              `Missing fields: ${missingFields.join(", ")}`
            );
          }

            await api.post(
              `/data/bulk/${appId}`,{
              rows
             }
            );

          alert("CSV uploaded successfully");

          onUploadSuccess();

        } catch (err) {

          console.log(err);

          alert("CSV upload failed");

        } finally {
          setUploading(false);
        }

      },
      error: () => {
        setUploading(false);
        alert("Invalid csv file");
      }

    });

  };

  return (
    <div className="border rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-semibold mb-4">
        CSV Upload
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      
       {
        uploading && (
          <p className="mt-3 text-blue-500">
            Uploading CSV...
          </p>
        )
      }
      
    </div>
  );
}

export default CSVUpload;