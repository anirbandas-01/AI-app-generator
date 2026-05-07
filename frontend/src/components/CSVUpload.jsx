import Papa from "papaparse";

import api from "../services/api";

function CSVUpload({
  appId,
  onUploadSuccess
}) {

  const handleFileUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    Papa.parse(file, {

      header: true,

      skipEmptyLines: true,

      complete: async (results) => {

        try {

          const rows = results.data;

          // upload each row
          for (const row of rows) {

            await api.post(
              `/data/${appId}`,
              row
            );

          }

          alert("CSV uploaded successfully");

          onUploadSuccess();

        } catch (err) {

          console.log(err);

          alert("CSV upload failed");

        }

      },

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

    </div>
  );
}

export default CSVUpload;